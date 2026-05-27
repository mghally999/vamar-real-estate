import Link from "next/link";
import { VamarLogo } from "@/components/primitives/VamarLogo";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/getDictionary";

type Dict = Dictionary["footer"];

export function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const siteLinks = [
    { href: `/${locale}/agents`, label: dict.siteHeading === "Site" ? "Team" : "الفريق" },
    { href: `/${locale}/about`, label: dict.siteHeading === "Site" ? "About" : "من نحن" },
    { href: `/${locale}/apply`, label: dict.siteHeading === "Site" ? "Contact" : "تواصل" },
  ];

  const resourceLinks = [
    { href: `/${locale}/paperwork`, label: dict.siteHeading === "Site" ? "Paperwork" : "الإجراءات" },
    { href: `/${locale}/resources`, label: dict.siteHeading === "Site" ? "Resources" : "مقالات" },
    { href: `/${locale}/search`, label: dict.siteHeading === "Site" ? "Opportunities" : "الفرص" },
  ];

  return (
    <footer className="bg-[var(--ink)] text-[var(--bg)] mt-32">
      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <VamarLogo className="h-14 sm:h-16 w-auto text-[var(--bg)] mb-8" />
            <div className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em]">
              {dict.tagline}
            </div>
            <p className="mt-6 max-w-md text-[var(--bg)]/65 leading-relaxed">
              {dict.blurb}
            </p>
          </div>

          <nav
            className="sm:col-span-2 flex flex-col gap-3 text-sm"
            aria-label={dict.siteHeading}
          >
            <div className="text-[var(--bg)]/55 uppercase tracking-[0.18em] text-[0.7rem] mb-2">
              {dict.siteHeading}
            </div>
            {siteLinks.map((l) => (
              <Link key={l.label} href={l.href} className="hover:opacity-80">
                {l.label}
              </Link>
            ))}
          </nav>

          <nav
            className="sm:col-span-2 flex flex-col gap-3 text-sm"
            aria-label={dict.resourcesHeading}
          >
            <div className="text-[var(--bg)]/55 uppercase tracking-[0.18em] text-[0.7rem] mb-2">
              {dict.resourcesHeading}
            </div>
            {resourceLinks.map((l) => (
              <Link key={l.label} href={l.href} className="hover:opacity-80">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="sm:col-span-3 flex flex-col gap-3 text-sm">
            <div className="text-[var(--bg)]/55 uppercase tracking-[0.18em] text-[0.7rem] mb-2">
              {dict.contactHeading}
            </div>
            <a href={`tel:${dict.phone.replace(/\s/g, "")}`} className="hover:opacity-80">
              {dict.phone}
            </a>
            <a href={`mailto:${dict.email}`} className="hover:opacity-80">
              {dict.email}
            </a>
            <span className="text-[var(--bg)]/65">{dict.address}</span>
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-[var(--bg)]/12 text-xs text-[var(--bg)]/55">
          <div>
            &copy; {new Date().getFullYear()} Vamar Real Estate. {dict.rights}
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:opacity-80">
              {dict.privacy}
            </Link>
            <Link href="#" className="hover:opacity-80">
              {dict.terms}
            </Link>
            <Link href="#" className="hover:opacity-80">
              {dict.compliance}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
