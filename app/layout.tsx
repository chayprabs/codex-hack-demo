import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Relaylane",
    template: "%s | Relaylane",
  },
  description:
    "Relaylane is a safe demo SaaS for TrustLayer audits, built with seeded fixtures instead of live vulnerabilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
