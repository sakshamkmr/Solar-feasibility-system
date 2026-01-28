import type { Metadata } from "next";

import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs"; // 👈 ADD THIS
import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default: "SolarSurya - Rooftop Solar Calculator",
    template: "%s | SolarSurya"
  },
  description: "Get accurate solar estimates for Indian homes & factories. NASA data + 50+ DISCOM tariffs. TRL 8 prototype.",
  keywords: "solar calculator, rooftop solar, India solar, PM Surya Ghar, GBI subsidy",
  openGraph: {
    title: "SolarSurya - India's Rooftop Solar Calculator",
    description: "Free solar feasibility tool for homes & factories",
    images: "/og-image.jpg", // Add later
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider> {/* 👈 WRAP WITH CLERK */}
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
