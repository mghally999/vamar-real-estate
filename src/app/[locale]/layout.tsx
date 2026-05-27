import { Lato, IBM_Plex_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { i18n, isLocale, type Locale } from "@/lib/i18n-config";
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

const arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  weight: ["400", "500", "700"],
  subsets: ["arabic"],
  display: "swap",
});

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

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${lato.variable} ${arabic.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)]">
        <a href="#main" className="skip-link">
          {dict.a11y.skipToContent}
        </a>
        <LenisProvider>
          <Header locale={locale as Locale} dict={dict.nav} />
          <main id="main" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer locale={locale as Locale} dict={dict.footer} />
        </LenisProvider>
      </body>
    </html>
  );
}
