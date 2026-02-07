import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import { PWAProvider } from "@/components/pwa";

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
    default: "Farm Waste Recycling Advisor",
    template: "%s | FWRA",
  },
  description:
    "Turn your farm waste into valuable resources. Get personalized recommendations for composting, biogas, mulching, and more.",
  keywords: [
    "farm waste",
    "recycling",
    "composting",
    "biogas",
    "Kenya",
    "agriculture",
    "sustainable farming",
  ],
  authors: [{ name: "FWRA Team" }],
  creator: "FWRA",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FWRA",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#22c55e" },
    { media: "(prefers-color-scheme: dark)", color: "#16a34a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
          <PWAProvider>{children}</PWAProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
