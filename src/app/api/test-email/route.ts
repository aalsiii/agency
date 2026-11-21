import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "RESEND_API_KEY environment variable is missing on Vercel." }, { status: 500 });
  }

  const toEmail = process.env.ADMIN_NOTIFY_EMAIL || process.env.ADMIN_EMAIL || "bijalwanakshat@gmail.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "NextCurrent Alerts <onboarding@resend.dev>";

  const resend = new Resend(apiKey);
  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: "⚡ NextCurrent Email Verification Test",
      html: `
        <div style="font-family: sans-serif; padding: 20px; background: #0c0d0e; color: #fff; border-radius: 8px;">
          <h2 style="color: #d4af37;">Resend is Connected!</h2>
          <p>This email confirms that your Vercel deployment is successfully communicating with Resend.</p>
          <p>Delivered to: <strong>${toEmail}</strong></p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      apiKeyConfigured: true,
      apiKeyPrefix: apiKey.substring(0, 6) + "...",
      to: toEmail,
      from: fromEmail,
      resendResponse: data,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || String(err),
      apiKeyPrefix: apiKey.substring(0, 6) + "...",
    }, { status: 500 });
  }
}
