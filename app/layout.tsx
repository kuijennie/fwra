import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import { PWAProvider } from "@/components/pwa";
import { ThemeProvider } from "@/components/providers/theme-provider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
    { media: "(prefers-color-scheme: light)", color: "#06402B" },
    { media: "(prefers-color-scheme: dark)", color: "#06402B" },
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
        className={`${playfair.variable} ${dmSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ClerkProvider>
            <ConvexClientProvider>
              <PWAProvider>{children}</PWAProvider>
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
