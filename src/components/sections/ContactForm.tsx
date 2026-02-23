"use client";

import { useState, FormEvent, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, MapPin, ExternalLink, Github, Linkedin } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type FormState = "idle" | "submitting" | "success" | "error";

type Subject =
  | ""
  | "Job Opportunity"
  | "Project"
  | "Consulting"
  | "Other";

interface FormData {
  name: string;
  email: string;
  subject: Subject;
  message: string;
}

/* ------------------------------------------------------------------ */
/*  Confetti                                                            */
/* ------------------------------------------------------------------ */

const CONFETTI_COLOURS = [
  "#D97706", "#F59E0B", "#2563EB", "#3B82F6",
  "#059669", "#10B981", "#7C3AED", "#DB2777",
];

function ConfettiPiece({ colour, i }: { colour: string; i: number }) {
  const left = `${5 + (i * 9.3) % 90}%`;
  const delay = `${(i * 0.07).toFixed(2)}s`;
  const size = 6 + (i % 5);
  const duration = `${0.9 + (i % 4) * 0.2}s`;
  const isCircle = i % 3 === 0;

  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        top: "-10px",
        left,
        width: size,
        height: isCircle ? size : size * 0.5,
        borderRadius: isCircle ? "50%" : "2px",
        background: colour,
        animationName: "confetti-fall",
        animationDuration: duration,
        animationDelay: delay,
        animationTimingFunction: "ease-in",
        animationFillMode: "forwards",
        transform: `rotate(${i * 37}deg)`,
        pointerEvents: "none",
      }}
    />
  );
}

function Confetti() {
  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(0) rotate(0deg) scale(1);   opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(220px) rotate(720deg) scale(0.6); opacity: 0; }
        }
      `}</style>
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 0,
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        {Array.from({ length: 32 }).map((_, i) => (
          <ConfettiPiece
            key={i}
            i={i}
            colour={CONFETTI_COLOURS[i % CONFETTI_COLOURS.length]}
          />
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Left column: info                                                   */
/* ------------------------------------------------------------------ */

function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p
          className="mb-3 font-mono text-sm tracking-widest uppercase"
          style={{ color: "var(--color-gold)" }}
        >
          Get in touch
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
          Let&apos;s build
          <br />
          something
        </h1>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-[var(--color-text-muted)]">
          Open to fullstack, AI engineering, and consulting work.
          Available immediately.
        </p>
      </div>

      {/* Availability badge */}
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-3 w-3">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ background: "var(--color-emerald)" }}
          />
          <span
            className="relative inline-flex h-3 w-3 rounded-full"
            style={{ background: "var(--color-emerald-light)" }}
          />
        </span>
        <span
          className="font-mono text-sm font-medium"
          style={{ color: "var(--color-emerald-light)" }}
        >
          Available now
        </span>
      </div>

      {/* Contact details */}
      <ul className="flex flex-col gap-3">
        <li>
          <a
            href="mailto:allan@echoalgoridata.no"
            className="flex items-center gap-3 group"
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--elevated)", border: "1px solid var(--border)" }}
            >
              <Mail size={14} style={{ color: "var(--color-text-muted)" }} />
            </div>
            <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-gold)] transition-colors">
              allan@echoalgoridata.no
            </span>
          </a>
        </li>
        <li>
          <a
            href="tel:+4741217648"
            className="flex items-center gap-3 group"
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--elevated)", border: "1px solid var(--border)" }}
            >
              <Phone size={14} style={{ color: "var(--color-text-muted)" }} />
            </div>
            <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-gold)] transition-colors">
              +47 412 17 648
            </span>
          </a>
        </li>
        <li className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{ background: "var(--elevated)", border: "1px solid var(--border)" }}
          >
            <MapPin size={14} style={{ color: "var(--color-text-muted)" }} />
          </div>
          <span className="text-sm text-[var(--color-text-secondary)]">Oslo, Norway</span>
        </li>
      </ul>

      {/* Social links */}
      <div className="flex items-center gap-3">
        <a
          href="https://linkedin.com/in/allankisuule"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-all hover:border-[var(--color-gold-dim)] hover:text-[var(--color-gold)]"
          style={{ background: "var(--elevated)", border: "1px solid var(--border)" }}
        >
          <Linkedin size={16} />
        </a>
        <a
          href="https://github.com/La-Cappuccino"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-all hover:border-[var(--color-gold-dim)] hover:text-[var(--color-text-primary)]"
          style={{ background: "var(--elevated)", border: "1px solid var(--border)" }}
        >
          <Github size={16} />
        </a>
        <a
          href="https://echoalgoridata.no"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="echoalgoridata.no"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-all hover:border-[var(--color-gold-dim)] hover:text-[var(--color-text-primary)]"
          style={{ background: "var(--elevated)", border: "1px solid var(--border)" }}
        >
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Input helper                                                        */
/* ------------------------------------------------------------------ */

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-mono text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
        {label}
      </label>
      {children}
      {error && (
        <p className="font-mono text-xs" style={{ color: "#F87171" }}>
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase: React.CSSProperties = {
  width: "100%",
  borderRadius: 8,
  padding: "10px 14px",
  background: "var(--elevated)",
  border: "1px solid var(--border)",
  color: "var(--color-text-primary)",
  fontSize: "0.875rem",
  lineHeight: "1.5",
  outline: "none",
  transition: "border-color 0.2s",
};

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export default function ContactForm() {
  const nameId    = useId();
  const emailId   = useId();
  const subjectId = useId();
  const messageId = useId();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  function validate(): boolean {
    const errors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim())    errors.name    = "Name is required.";
    if (!formData.email.trim())   errors.email   = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                                  errors.email   = "Please enter a valid email.";
    if (!formData.message.trim()) errors.message = "Message is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setFormState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setFieldErrors({});
      } else {
        const body = await res.json().catch(() => ({}));
        if (body.fieldErrors) setFieldErrors(body.fieldErrors);
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  const isSubmitting = formState === "submitting";

  return (
    <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
      {/* Left */}
      <ContactInfo />

      {/* Right — form */}
      <div>
        <AnimatePresence mode="wait">
          {formState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center gap-5 rounded-2xl py-16 px-8 text-center"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <Confetti />
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: "rgba(5,150,105,0.15)", border: "1px solid rgba(5,150,105,0.3)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="var(--color-emerald-light)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  Message sent!
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
              </div>
              <button
                onClick={() => setFormState("idle")}
                className="mt-2 font-mono text-sm underline underline-offset-2 transition-colors"
                style={{ color: "var(--color-text-muted)" }}
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" id={nameId} error={fieldErrors.name}>
                  <input
                    id={nameId}
                    type="text"
                    autoComplete="name"
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    style={{
                      ...inputBase,
                      borderColor: fieldErrors.name ? "#F87171" : undefined,
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-gold)")}
                    onBlur={(e)  => (e.currentTarget.style.borderColor = fieldErrors.name ? "#F87171" : "var(--border)")}
                    placeholder="Allan Kisuule"
                  />
                </Field>

                <Field label="Email" id={emailId} error={fieldErrors.email}>
                  <input
                    id={emailId}
                    type="email"
                    autoComplete="email"
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    style={{
                      ...inputBase,
                      borderColor: fieldErrors.email ? "#F87171" : undefined,
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-gold)")}
                    onBlur={(e)  => (e.currentTarget.style.borderColor = fieldErrors.email ? "#F87171" : "var(--border)")}
                    placeholder="you@example.com"
                  />
                </Field>
              </div>

              <Field label="Subject" id={subjectId}>
                <select
                  id={subjectId}
                  disabled={isSubmitting}
                  value={formData.subject}
                  onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value as Subject }))}
                  style={{
                    ...inputBase,
                    appearance: "none",
                    cursor: "pointer",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-gold)")}
                  onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <option value="" disabled>Select a subject…</option>
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Project">Project</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Other">Other</option>
                </select>
              </Field>

              <Field label="Message" id={messageId} error={fieldErrors.message}>
                <textarea
                  id={messageId}
                  rows={5}
                  disabled={isSubmitting}
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  style={{
                    ...inputBase,
                    resize: "vertical",
                    minHeight: 120,
                    borderColor: fieldErrors.message ? "#F87171" : undefined,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-gold)")}
                  onBlur={(e)  => (e.currentTarget.style.borderColor = fieldErrors.message ? "#F87171" : "var(--border)")}
                  placeholder="Tell me about the project, role, or idea…"
                />
              </Field>

              {formState === "error" && (
                <p
                  className="rounded-lg px-4 py-3 font-mono text-sm"
                  style={{ background: "rgba(248,113,113,0.1)", color: "#FCA5A5", border: "1px solid rgba(248,113,113,0.2)" }}
                >
                  Something went wrong. Please try again or email me directly.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 flex items-center justify-center gap-2.5 rounded-xl px-6 py-3 font-semibold transition-all"
                style={{
                  background: isSubmitting ? "var(--color-gold-dim)" : "var(--color-gold)",
                  color: "#0C0A09",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.8 : 1,
                }}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-transparent"
                      style={{ borderTopColor: "#0C0A09" }}
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={15} />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
