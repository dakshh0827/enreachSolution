import { NextResponse } from "next/server";
import { Resend } from "resend";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const org = String(body?.org || "").trim();
    const message = String(body?.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    if (!apiKey || !toEmail) {
      return NextResponse.json(
        {
          error:
            "Mail service is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL in environment variables.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeOrg = escapeHtml(org || "Not provided");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New contact request from ${name}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Organization: ${org || "Not provided"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Organization:</strong> ${safeOrg}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: "Unable to send email right now. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error while processing your request." },
      { status: 500 }
    );
  }
}