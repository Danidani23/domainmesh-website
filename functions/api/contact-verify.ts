import { sendContactNotification, type ContactData } from './_shared/mailgun';

interface Env {
  CONTACT_KV: KVNamespace;
  MAILGUN_API_KEY: string;
  MAILGUN_DOMAIN: string;
  CONTACT_FROM_EMAIL: string;
  CONTACT_TO_EMAIL: string;
}

interface VerifyRequest {
  request_id: string;
  code: string;
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

  // Parse request body
  let body: VerifyRequest;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  if (!body.request_id || !body.code) {
    return jsonResponse({ error: 'request_id and code are required' }, 400);
  }

  // Look up stored entry from KV
  const kvKey = `contact:${body.request_id}`;
  const raw = await env.CONTACT_KV.get(kvKey);

  if (!raw) {
    return jsonResponse({ error: 'Code expired or invalid request' }, 404);
  }

  const entry: StoredEntry = JSON.parse(raw);

  // Constant-time comparison to prevent timing attacks
  if (!timingSafeEqual(body.code, entry.code)) {
    return jsonResponse({ error: 'Invalid code' }, 403);
  }

  // Delete KV entry (one-time use)
  await env.CONTACT_KV.delete(kvKey);

  // Send contact notification to business inbox
  const contactData: ContactData = {
    salutation: entry.salutation,
    firstName: entry.firstName,
    lastName: entry.lastName,
    email: entry.email,
    company: entry.company,
    message: entry.message,
  };

  try {
    await sendContactNotification(
      env.MAILGUN_API_KEY,
      env.MAILGUN_DOMAIN,
      env.CONTACT_FROM_EMAIL,
      env.CONTACT_TO_EMAIL,
      contactData
    );
  } catch (err) {
    console.error('Failed to send contact notification:', err);
    return jsonResponse({ error: 'Failed to send message' }, 500);
  }

  return jsonResponse({ success: true });
};

/**
 * Constant-time string comparison to prevent timing attacks.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  const encoder = new TextEncoder();
  const aBuf = encoder.encode(a);
  const bBuf = encoder.encode(b);

  let result = 0;
  for (let i = 0; i < aBuf.length; i++) {
    result |= aBuf[i] ^ bBuf[i];
  }
  return result === 0;
}

function jsonResponse(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
