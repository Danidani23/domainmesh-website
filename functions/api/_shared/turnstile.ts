export interface TurnstileResult {
  success: boolean;
  'error-codes'?: string[];
}

/**
 * Verify a Cloudflare Turnstile token via the siteverify API.
 */
export async function verifyTurnstile(
  secret: string,
  token: string,
  ip: string
): Promise<boolean> {
  const res = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        response: token,
        remoteip: ip,
      }),
    }
  );

  const outcome: TurnstileResult = await res.json();
  return outcome.success;
}
