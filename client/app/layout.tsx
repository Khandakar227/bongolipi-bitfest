import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BongoLipi",
  description: "A community for Banglish to Bangla genZs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-poppins antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
