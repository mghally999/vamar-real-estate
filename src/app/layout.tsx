import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { LenisProvider } from "@/components/shell/LenisProvider";
import { Header } from "@/components/shell/Header";
import { Footer } from "@/components/shell/Footer";
import { PageTransition } from "@/components/shell/PageTransition";
import { getDictionary } from "@/lib/getDictionary";

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vamar.ae"),
  title: { default: "Vamar Real Estate", template: "%s · Vamar Real Estate" },
  description:
    "Vamar Real Estate — a full-service UAE brokerage helping you buy, sell, rent, and invest with expert agents and clear guidance.",
  openGraph: {
    title: "Vamar Real Estate",
    description:
      "Buy, sell, rent, and invest across the UAE with Vamar's expert agents.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dict = await getDictionary();

  return (
    <html
      lang="en"
      dir="ltr"
      data-theme="light"
      className={`${lato.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)]">
        <a href="#main" className="skip-link">
          {dict.a11y.skipToContent}
        </a>
        <LenisProvider>
          <Header dict={dict.nav} />
          <main id="main" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer dict={dict.footer} />
        </LenisProvider>
      </body>
    </html>
  );
}
