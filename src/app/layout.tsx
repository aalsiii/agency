import type { Metadata } from "next";
import { Cinzel, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { CurrencyProvider } from "@/lib/currency-context";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextCurrent Media | Performance Acquisition & Web Engineering",
  description: "High-performance client acquisition funnels, Next.js web applications, and search visibility for ambitious brands.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${cinzel.variable} ${manrope.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground selection:bg-primary selection:text-black`}
      >
        <CurrencyProvider>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
          <FloatingWhatsApp />
        </CurrencyProvider>
      </body>
    </html>
  );
}
