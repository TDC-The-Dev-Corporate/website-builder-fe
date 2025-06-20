import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ThemeRegistry from "./components/ThemeRegistry";

import { baseMetadata } from "@/lib/metadata";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/Logo.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
