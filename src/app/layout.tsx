import './globals.css';

// Minimal root layout — route groups have their own layouts
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
