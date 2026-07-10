import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "MyDocDay",
  description: "Next.js with TypeScript, Tailwind CSS, and Storybook",
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
