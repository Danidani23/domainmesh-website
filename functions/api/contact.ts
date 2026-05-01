import { verifyTurnstile } from './_shared/turnstile';
import { sendVerificationEmail } from './_shared/mailgun';

interface Env {
  CONTACT_KV: KVNamespace;
  TURNSTILE_SECRET_KEY: string;
  MAILGUN_API_KEY: string;
  MAILGUN_DOMAIN: string;
  CONTACT_FROM_EMAIL: string;
}

interface ContactRequest {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
  'cf-turnstile-response': string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Parse request body
  let body: ContactRequest;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  // Validate required fields
  if (!body.firstName || !body.lastName || !body.email || !body.message) {
    return jsonResponse({ error: 'First name, last name, email, and message are required' }, 400);
  }

  if (!body['cf-turnstile-response']) {
    return jsonResponse({ error: 'Turnstile token is required' }, 400);
  }

  // Verify Turnstile token
  const ip = request.headers.get('CF-Connecting-IP') || '';
  const turnstileValid = await verifyTurnstile(
    env.TURNSTILE_SECRET_KEY,
    body['cf-turnstile-response'],
    ip
  );

  if (!turnstileValid) {
    return jsonResponse({ error: 'Bot verification failed' }, 403);
  }

  // Generate 6-digit code and request ID
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const requestId = crypto.randomUUID();

  // Store in KV with 10-minute TTL
  const kvValue = JSON.stringify({
    code,
    salutation: body.salutation || '',
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    company: body.company || '',
    message: body.message,
  });

  await env.CONTACT_KV.put(`contact:${requestId}`, kvValue, {
    expirationTtl: 600,
  });

  // Send verification email
  try {
    await sendVerificationEmail(
      env.MAILGUN_API_KEY,
      env.MAILGUN_DOMAIN,
      env.CONTACT_FROM_EMAIL,
      body.email,
      `${body.firstName} ${body.lastName}`,
      code
    );
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error('Failed to send verification email:', errMsg);
    // Clean up KV entry on email failure
    await env.CONTACT_KV.delete(`contact:${requestId}`);
    return jsonResponse({ error: 'Failed to send verification email' /*, detail: errMsg */ }, 500);
  }

  return jsonResponse({ request_id: requestId });
};

function jsonResponse(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
