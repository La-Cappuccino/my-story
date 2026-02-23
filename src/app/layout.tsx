import type { Metadata, Viewport } from "next";
import { GeistSans, GeistMono } from "geist/font";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://allankisuule.no"),
  title: {
    default: "Allan Kisuule — Fullstack Developer & AI Engineer",
    template: "%s | Allan Kisuule",
  },
  description:
    "Fullstack developer and AI engineer based in Oslo. I build production software — React, Next.js, TypeScript, Node.js — augmented by a multi-agent AI workflow that ships at the speed of a small team. Founder of Echo Algori Data. Builder of Afrobeats.no, RNB Vault, and more.",
  keywords: [
    "fullstack developer",
    "AI engineer",
    "Oslo",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "Supabase",
    "multi-agent AI",
    "Echo Algori Data",
    "Allan Kisuule",
  ],
  authors: [{ name: "Allan Kisuule", url: "https://allankisuule.no" }],
  creator: "Allan Kisuule",
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "https://allankisuule.no",
    siteName:    "Allan Kisuule",
    title:       "Allan Kisuule — Fullstack Developer & AI Engineer",
    description:
      "Kampala → Berlin → Oslo. I build production software augmented by a multi-agent AI workflow. Founder of Echo Algori Data.",
    images: [
      {
        url:    "/og-image.png",
        width:  1200,
        height: 630,
        alt:    "Allan Kisuule — Fullstack Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Allan Kisuule — Fullstack Developer & AI Engineer",
    description: "Kampala → Berlin → Oslo. I build production software augmented by a multi-agent AI workflow.",
    images:      ["/og-image.png"],
  },
  robots: {
    index:            true,
    follow:           true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },
  icons: {
    icon:    [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple:   [{ url: "/apple-touch-icon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#0C0A09" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
  ],
  width:        "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="noise">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <SmoothScrollProvider>
            <Nav />
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
