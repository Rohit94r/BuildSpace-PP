import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Buildspace - Learn bu building projects",
  description: "Gamified Learning platform for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
      lang="en"
      suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
    
  );
}
