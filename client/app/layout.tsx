import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/common/Navbar";

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
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={`font-poppins antialiased`}>
          <Navbar/>
          {children}</body>
      </html>
    </ClerkProvider>
  );
}
