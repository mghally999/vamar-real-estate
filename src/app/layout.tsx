import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/shell/LenisProvider";
import { Header } from "@/components/shell/Header";
import { Footer } from "@/components/shell/Footer";
import { PageTransition } from "@/components/shell/PageTransition";

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Pre-paint theme bootstrap — reads saved preference, defaults to dark
// (matches the root-project Vamar identity: slate #272F36). Runs before
// React hydration to avoid a light→dark flash on load.
const THEME_INIT = `
(function(){
  try {
    var s = localStorage.getItem('vamar-theme');
    var t = s === 'light' || s === 'dark' ? s : 'light';
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export const metadata: Metadata = {
  title: {
    default: "Vamar — Find What Moves You",
    template: "%s · Vamar Real Estate",
  },
  description:
    "Real guidance from real agents. A clear path to find what's next — across buying, selling and renting.",
  metadataBase: new URL("https://vamar.ae"),
  openGraph: {
    title: "Vamar — Find What Moves You",
    description:
      "Real guidance from real agents. A clear path to find what's next.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)]">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <LenisProvider>
          <Header />
          <main id="main" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
