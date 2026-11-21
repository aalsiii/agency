import { Resend } from "resend";

export interface LeadEmailPayload {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  website?: string | null;
  serviceInterested?: string | null;
  budget?: string | null;
  currency?: string;
  timeline?: string | null;
  message?: string | null;
  source?: string;
}

export async function sendLeadNotification(lead: LeadEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ RESEND_API_KEY not configured. Skipping email notification.");
    return null;
  }

  const resend = new Resend(apiKey);
  const toEmail = process.env.ADMIN_NOTIFY_EMAIL || process.env.ADMIN_EMAIL || "bijalwanakshat@gmail.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "NextCurrent Alerts <onboarding@resend.dev>";

  try {
    const subject = `🔥 New Lead: ${lead.name} (${lead.company || lead.serviceInterested || "General Inquiry"})`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0c0d0e; color: #f4f4f5; margin: 0; padding: 24px; }
          .card { background-color: #141518; border: 1px solid #27272a; border-radius: 12px; padding: 28px; max-width: 600px; margin: 0 auto; }
          .badge { display: inline-block; background-color: #27272a; color: #d4af37; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 10px; border-radius: 9999px; border: 1px solid rgba(212, 175, 55, 0.3); margin-bottom: 16px; }
          h2 { color: #ffffff; margin-top: 0; font-size: 22px; font-weight: 700; }
          .row { margin-bottom: 14px; border-bottom: 1px solid #1f2024; padding-bottom: 12px; }
          .label { font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
          .value { font-size: 15px; color: #e4e4e7; font-weight: 500; }
          .value a { color: #d4af37; text-decoration: none; }
          .message-box { background-color: #1a1b1e; border-left: 3px solid #d4af37; padding: 14px; border-radius: 4px; margin-top: 16px; font-size: 14px; line-height: 1.6; color: #d4d4d8; }
          .btn { display: inline-block; background: #ffffff; color: #000000; font-weight: 600; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-top: 20px; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="card">
          <span class="badge">NextCurrent Inbound Lead</span>
          <h2>New Client Inquiry Received</h2>
          
          <div class="row">
            <div class="label">Client Name</div>
            <div class="value">${lead.name}</div>
          </div>
          
          <div class="row">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${lead.email}">${lead.email}</a></div>
          </div>

          ${lead.phone ? `
          <div class="row">
            <div class="label">Phone / WhatsApp</div>
            <div class="value"><a href="tel:${lead.phone}">${lead.phone}</a> | <a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}">Chat on WhatsApp</a></div>
          </div>` : ''}

          ${lead.company ? `
          <div class="row">
            <div class="label">Company / Brand</div>
            <div class="value">${lead.company}</div>
          </div>` : ''}

          ${lead.website ? `
          <div class="row">
            <div class="label">Website</div>
            <div class="value"><a href="${lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}">${lead.website}</a></div>
          </div>` : ''}

          ${lead.serviceInterested ? `
          <div class="row">
            <div class="label">Service of Interest</div>
            <div class="value">${lead.serviceInterested}</div>
          </div>` : ''}

          ${lead.budget ? `
          <div class="row">
            <div class="label">Estimated Budget</div>
            <div class="value">${lead.currency || 'INR'} ${lead.budget}</div>
          </div>` : ''}

          ${lead.timeline ? `
          <div class="row">
            <div class="label">Timeline Target</div>
            <div class="value">${lead.timeline}</div>
          </div>` : ''}

          ${lead.message ? `
          <div class="label">Project Brief / Message</div>
          <div class="message-box">${lead.message}</div>
          ` : ''}

          <div style="text-align: center;">
            <a href="https://agency-iota-wine.vercel.app/admin" class="btn">Open Admin CRM</a>
          </div>
        </div>
      </body>
      </html>
    `;

    const res = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: lead.email,
      subject,
      html,
    });

    console.log("✅ Resend lead alert sent:", res);
    return res;
  } catch (error) {
    console.error("❌ Resend lead notification failed:", error);
    return null;
  }
}

export interface AuditEmailPayload {
  businessName: string;
  websiteUrl: string;
  instagramHandle?: string | null;
  industry: string;
  primaryGoal: string;
  monthlySpend?: string | null;
  name: string;
  email: string;
  phone: string;
  auditScore: number;
}

export async function sendAuditNotification(audit: AuditEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ RESEND_API_KEY not configured. Skipping email notification.");
    return null;
  }

  const resend = new Resend(apiKey);
  const toEmail = process.env.ADMIN_NOTIFY_EMAIL || process.env.ADMIN_EMAIL || "bijalwanakshat@gmail.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "NextCurrent Alerts <onboarding@resend.dev>";

  try {
    const subject = `⚡ Free Audit Request: ${audit.businessName} (${audit.name}) — Score: ${audit.auditScore}/100`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0c0d0e; color: #f4f4f5; margin: 0; padding: 24px; }
          .card { background-color: #141518; border: 1px solid #27272a; border-radius: 12px; padding: 28px; max-width: 600px; margin: 0 auto; }
          .badge { display: inline-block; background-color: #27272a; color: #60a5fa; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 10px; border-radius: 9999px; border: 1px solid rgba(96, 165, 250, 0.3); margin-bottom: 16px; }
          h2 { color: #ffffff; margin-top: 0; font-size: 22px; font-weight: 700; }
          .score-banner { background: linear-gradient(135deg, #18191c, #22242a); border: 1px solid #3f3f46; border-radius: 8px; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
          .score-label { font-size: 12px; color: #a1a1aa; text-transform: uppercase; }
          .score-val { font-size: 24px; font-weight: 800; color: #60a5fa; }
          .row { margin-bottom: 14px; border-bottom: 1px solid #1f2024; padding-bottom: 12px; }
          .label { font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
          .value { font-size: 15px; color: #e4e4e7; font-weight: 500; }
          .value a { color: #60a5fa; text-decoration: none; }
          .btn { display: inline-block; background: #ffffff; color: #000000; font-weight: 600; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-top: 20px; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="card">
          <span class="badge">Growth & Funnel Audit Request</span>
          <h2>${audit.businessName}</h2>

          <div class="score-banner">
            <div>
              <div class="score-label">Algorithmic Readiness Score</div>
              <div style="font-size: 13px; color: #e4e4e7;">Preliminary Diagnostic Baseline</div>
            </div>
            <div class="score-val">${audit.auditScore}/100</div>
          </div>
          
          <div class="row">
            <div class="label">Contact Person</div>
            <div class="value">${audit.name}</div>
          </div>

          <div class="row">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${audit.email}">${audit.email}</a></div>
          </div>

          <div class="row">
            <div class="label">Phone / WhatsApp</div>
            <div class="value"><a href="tel:${audit.phone}">${audit.phone}</a> | <a href="https://wa.me/${audit.phone.replace(/[^0-9]/g, '')}">Chat on WhatsApp</a></div>
          </div>

          <div class="row">
            <div class="label">Website</div>
            <div class="value"><a href="${audit.websiteUrl.startsWith('http') ? audit.websiteUrl : `https://${audit.websiteUrl}`}">${audit.websiteUrl}</a></div>
          </div>

          ${audit.instagramHandle ? `
          <div class="row">
            <div class="label">Instagram Profile</div>
            <div class="value"><a href="https://instagram.com/${audit.instagramHandle.replace('@', '')}">${audit.instagramHandle}</a></div>
          </div>` : ''}

          <div class="row">
            <div class="label">Industry & Primary Growth Goal</div>
            <div class="value">${audit.industry} — ${audit.primaryGoal}</div>
          </div>

          <div class="row">
            <div class="label">Current Monthly Marketing Spend</div>
            <div class="value">${audit.monthlySpend || 'Not specified'}</div>
          </div>

          <div style="text-align: center;">
            <a href="https://agency-iota-wine.vercel.app/admin" class="btn">View in Admin Portal</a>
          </div>
        </div>
      </body>
      </html>
    `;

    const res = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: audit.email,
      subject,
      html,
    });

    console.log("✅ Resend audit alert sent:", res);
    return res;
  } catch (error) {
    console.error("❌ Resend audit notification failed:", error);
    return null;
  }
}
