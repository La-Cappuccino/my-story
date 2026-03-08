import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Allan Kisuule — available for fullstack development, AI engineering, and consulting work. Based in Oslo, available immediately.",
  openGraph: {
    title: "Contact | Allan Kisuule",
    description:
      "Available for fullstack, AI engineering, and consulting work. Based in Oslo.",
    url: "https://allankisuule.no/contact",
  },
  twitter: {
    title: "Contact | Allan Kisuule",
    description:
      "Available for fullstack, AI engineering, and consulting work. Based in Oslo.",
  },
};

export default function ContactPage() {
  return (
    <section className="section-container">
      <ContactForm />
    </section>
  );
}
