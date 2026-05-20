import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar, Footer } from "@/components";
import "./globals.css";

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
  other: {
    "msvalidate.01": "1EB34AD0E2ADAA4E6B1496727117C955",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen">
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
