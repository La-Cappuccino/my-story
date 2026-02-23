import { NextRequest, NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

interface ValidationError {
  field: keyof ContactPayload;
  message: string;
}

/* ------------------------------------------------------------------ */
/*  Validation                                                          */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: Partial<ContactPayload>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name?.trim()) {
    errors.push({ field: "name", message: "Name is required." });
  } else if (data.name.trim().length > 200) {
    errors.push({ field: "name", message: "Name must be 200 characters or fewer." });
  }

  if (!data.email?.trim()) {
    errors.push({ field: "email", message: "Email is required." });
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.push({ field: "email", message: "Please provide a valid email address." });
  }

  if (!data.message?.trim()) {
    errors.push({ field: "message", message: "Message is required." });
  } else if (data.message.trim().length < 10) {
    errors.push({ field: "message", message: "Message must be at least 10 characters." });
  } else if (data.message.trim().length > 5000) {
    errors.push({ field: "message", message: "Message must be 5000 characters or fewer." });
  }

  return errors;
}

/* ------------------------------------------------------------------ */
/*  Route handler                                                       */
/* ------------------------------------------------------------------ */

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: Partial<ContactPayload>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const errors = validate(body);

  if (errors.length > 0) {
    const fieldErrors = Object.fromEntries(
      errors.map(({ field, message }) => [field, message]),
    ) as Record<keyof ContactPayload, string>;

    return NextResponse.json(
      { error: "Validation failed.", fieldErrors },
      { status: 400 },
    );
  }

  const payload: ContactPayload = {
    name:    body.name!.trim(),
    email:   body.email!.trim().toLowerCase(),
    subject: body.subject?.trim() || "No subject",
    message: body.message!.trim(),
  };

  // Send email via Resend
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from:    "onboarding@resend.dev",
  //   to:      "allan@echoalgoridata.no",
  //   subject: `[allankisuule.no] ${payload.subject}`,
  //   text:    `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
  // });

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("[contact] New message:", {
      name:    payload.name,
      email:   payload.email,
      subject: payload.subject,
      preview: payload.message.slice(0, 80),
    });
  }

  return NextResponse.json(
    {
      success: true,
      message: "Message received. Allan will be in touch within 24 hours.",
    },
    { status: 200 },
  );
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed." },
    { status: 405 },
  );
}
