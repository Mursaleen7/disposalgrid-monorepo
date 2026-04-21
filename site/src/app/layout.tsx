import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar, Footer } from "@/components";
import "./globals.css";

/**
 * Inter — Primary font (Uber uses "UberMove", Inter is the spec'd fallback
 * with identical proportions). Weights: 400, 500, 700 only.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * JetBrains Mono — Monospace font for EPA IDs, codes, etc.
 */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DisposalGrid — Find Legal Disposal for Anything, Anywhere in the US",
    template: "%s | DisposalGrid",
  },
  description:
    "Verified drop-off locations, HHW events, and recycling centers for hazardous waste, electronics, mattresses, and more — updated weekly from EPA and municipal data.",
  keywords: [
    "waste disposal",
    "recycling centers",
    "hazardous waste",
    "electronics recycling",
    "HHW events",
    "disposal locations",
    "EPA verified",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DisposalGrid",
    title: "DisposalGrid — Find Legal Disposal for Anything, Anywhere in the US",
    description:
      "Verified drop-off locations, HHW events, and recycling centers — updated weekly from EPA and municipal data.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DisposalGrid",
    description:
      "Find legal disposal for hazardous waste, electronics, mattresses & more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-white text-uber-black flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-[72px]">
          <div className="animate-page-enter">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
