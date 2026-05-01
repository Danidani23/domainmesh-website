export interface ContactData {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
}

/**
 * Send a verification code email to the user via Mailgun REST API.
 */
export async function sendVerificationEmail(
  apiKey: string,
  domain: string,
  from: string,
  toEmail: string,
  toName: string,
  code: string
): Promise<void> {
  const body = new FormData();
  body.append('from', from);
  body.append('to', `${toName} <${toEmail}>`);
  body.append('subject', 'Your verification code — DomainMesh');
  body.append('text', `Your DomainMesh verification code is: ${code}\n\nThis code expires in 10 minutes.\nIf you didn't request this, you can safely ignore this email.`);
  body.append(
    'html',
    `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; padding: 40px 16px; margin: 0;">
      <div style="max-width: 480px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 18px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #ff6b00;">DomainMesh</span>
        </div>
        <div style="background-color: #ffffff; border-radius: 8px; padding: 32px; text-align: center; border-top: 3px solid #ff6b00;">
          <h2 style="color: #1a1a1a; margin: 0 0 8px; font-size: 18px; font-weight: 600;">Verification Code</h2>
          <p style="color: #666666; font-size: 14px; line-height: 1.5; margin: 0 0 24px;">
            Use the code below to verify your contact form submission.
          </p>
          <div style="background-color: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 20px; margin: 0 0 24px;">
            <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #ea580c;">${code}</span>
          </div>
          <p style="color: #999999; font-size: 12px; line-height: 1.5; margin: 0;">
            This code expires in 10 minutes. If you didn't request this, you can safely ignore this email.
          </p>
        </div>
        <div style="text-align: center; margin-top: 24px;">
          <p style="color: #999999; font-size: 11px; margin: 0;">DomainMesh &middot; domainmesh.io</p>
        </div>
      </div>
    </div>
  `.trim()
  );

  const res = await fetch(
    `https://api.mailgun.net/v3/${domain}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`api:${apiKey}`)}`,
      },
      body,
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Mailgun verification email failed (${res.status}): ${text}`);
  }
}

/**
 * Send the actual contact notification email to the business inbox via Mailgun.
 */
export async function sendContactNotification(
  apiKey: string,
  domain: string,
  from: string,
  to: string,
  data: ContactData
): Promise<void> {
  const salutationLabel = data.salutation === 'mr' ? 'Mr.' : data.salutation === 'mrs' ? 'Mrs.' : data.salutation;

  const body = new FormData();
  body.append('from', from);
  body.append('to', to);
  body.append('subject', `New contact from ${data.firstName} ${data.lastName} — DomainMesh`);
  body.append('h:Reply-To', data.email);
  body.append('text', `Salutation: ${salutationLabel}\nFirst Name: ${data.firstName}\nLast Name: ${data.lastName}\nEmail: ${data.email}\nCompany: ${data.company || '—'}\n\nMessage:\n${data.message}`);
  body.append(
    'html',
    `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; padding: 40px 16px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 18px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #ff6b00;">DomainMesh</span>
        </div>
        <div style="background-color: #ffffff; border-radius: 8px; padding: 32px; border-top: 3px solid #ff6b00;">
          <h2 style="color: #1a1a1a; margin: 0 0 24px; font-size: 18px; font-weight: 600;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; font-weight: 600; color: #888888; vertical-align: top; width: 100px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.03em;">Salutation</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #333333; font-size: 14px;">${escapeHtml(salutationLabel)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; font-weight: 600; color: #888888; vertical-align: top; width: 100px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.03em;">First Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #333333; font-size: 14px;">${escapeHtml(data.firstName)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; font-weight: 600; color: #888888; vertical-align: top; width: 100px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.03em;">Last Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #333333; font-size: 14px;">${escapeHtml(data.lastName)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; font-weight: 600; color: #888888; vertical-align: top; font-size: 13px; text-transform: uppercase; letter-spacing: 0.03em;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #333333; font-size: 14px;"><a href="mailto:${escapeHtml(data.email)}" style="color: #ea580c; text-decoration: none;">${escapeHtml(data.email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; font-weight: 600; color: #888888; vertical-align: top; font-size: 13px; text-transform: uppercase; letter-spacing: 0.03em;">Company</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #333333; font-size: 14px;">${escapeHtml(data.company || '—')}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #888888; vertical-align: top; font-size: 13px; text-transform: uppercase; letter-spacing: 0.03em;">Message</td>
              <td style="padding: 10px 0; color: #333333; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.message)}</td>
            </tr>
          </table>
        </div>
        <div style="text-align: center; margin-top: 24px;">
          <p style="color: #999999; font-size: 11px; margin: 0;">DomainMesh &middot; domainmesh.io</p>
        </div>
      </div>
    </div>
  `.trim()
  );

  const res = await fetch(
    `https://api.mailgun.net/v3/${domain}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`api:${apiKey}`)}`,
      },
      body,
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Mailgun notification email failed (${res.status}): ${text}`);
  }
}

/** Basic HTML escaping to prevent XSS in email content. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
