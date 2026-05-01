import { sendVerificationEmail } from './_shared/mailgun';

interface Env {
  CONTACT_KV: KVNamespace;
  MAILGUN_API_KEY: string;
  MAILGUN_DOMAIN: string;
  CONTACT_FROM_EMAIL: string;
}

interface ResendRequest {
  request_id: string;
}

interface StoredEntry {
  code: string;
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: ResendRequest;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  if (!body.request_id) {
    return jsonResponse({ error: 'request_id is required' }, 400);
  }

  // Look up existing entry
  const oldKey = `contact:${body.request_id}`;
  const raw = await env.CONTACT_KV.get(oldKey);

  if (!raw) {
    return jsonResponse({ error: 'Original request expired. Please submit the form again.' }, 404);
  }

  const entry: StoredEntry = JSON.parse(raw);

  // Delete old entry
  await env.CONTACT_KV.delete(oldKey);

  // Generate new code and request ID
  const newCode = String(Math.floor(100000 + Math.random() * 900000));
  const newRequestId = crypto.randomUUID();

  // Store new entry with fresh 10-minute TTL
  const kvValue = JSON.stringify({
    ...entry,
    code: newCode,
  });

  await env.CONTACT_KV.put(`contact:${newRequestId}`, kvValue, {
    expirationTtl: 600,
  });

  // Send new verification email
  try {
    await sendVerificationEmail(
      env.MAILGUN_API_KEY,
      env.MAILGUN_DOMAIN,
      env.CONTACT_FROM_EMAIL,
      entry.email,
      `${entry.firstName} ${entry.lastName}`,
      newCode
    );
  } catch (err) {
    console.error('Failed to resend verification email:', err);
    await env.CONTACT_KV.delete(`contact:${newRequestId}`);
    return jsonResponse({ error: 'Failed to send verification email' }, 500);
  }

  return jsonResponse({ request_id: newRequestId });
};

function jsonResponse(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
