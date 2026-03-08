import type { Metadata, Viewport } from "next";
import { Sora, Manrope } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import '@/components/os/styles.css';
import '../globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'AllanOS | AI-Powered Portfolio',
  description: "An AI-powered desktop interface showcasing Allan Kisuule's portfolio — built by Echo Algori Data.",
  openGraph: {
    title: 'AllanOS | AI-Powered Portfolio',
    description: "An AI-powered desktop OS interface — proof of concept for intelligent, brand-native UIs.",
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
};

export default function OSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${manrope.variable} ${GeistMono.variable}`}
    >
      <body className="overflow-hidden bg-[#0a0a0a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
