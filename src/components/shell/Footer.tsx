import Link from "next/link";
import { VamarLogo } from "@/components/primitives/VamarLogo";
import type { Dictionary } from "@/lib/getDictionary";

type Dict = Dictionary["footer"];

export function Footer({ dict }: { dict: Dict }) {
  const siteLinks = [
    { href: `/agents`, label: "Agents" },
    { href: `/about`, label: "About" },
    { href: `/apply`, label: "Contact" },
  ];

  const resourceLinks = [
    { href: `/search`, label: "Buy" },
    { href: `/paperwork`, label: "Paperwork" },
    { href: `/resources`, label: "Resources" },
  ];

  return (
    <footer className="bg-[var(--feature-bg)] text-[var(--feature-ink)] mt-32">
      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <VamarLogo className="text-[40px] sm:text-[48px] text-[var(--feature-ink)] mb-8" />
            <div className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em]">
              {dict.tagline}
            </div>
            <p className="mt-6 max-w-md text-[var(--feature-ink)]/65 leading-relaxed">
              {dict.blurb}
            </p>
          </div>

          <nav
            className="sm:col-span-2 flex flex-col gap-3 text-sm"
            aria-label={dict.siteHeading}
          >
            <div className="text-[var(--feature-ink)]/55 uppercase tracking-[0.18em] text-[0.7rem] mb-2">
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
            <div className="text-[var(--feature-ink)]/55 uppercase tracking-[0.18em] text-[0.7rem] mb-2">
              {dict.resourcesHeading}
            </div>
            {resourceLinks.map((l) => (
              <Link key={l.label} href={l.href} className="hover:opacity-80">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="sm:col-span-3 flex flex-col gap-3 text-sm">
            <div className="text-[var(--feature-ink)]/55 uppercase tracking-[0.18em] text-[0.7rem] mb-2">
              {dict.contactHeading}
            </div>
            <a href={`tel:${dict.phone.replace(/\s/g, "")}`} className="hover:opacity-80">
              {dict.phone}
            </a>
            <a href={`mailto:${dict.email}`} className="hover:opacity-80">
              {dict.email}
            </a>
            <span className="text-[var(--feature-ink)]/65">{dict.address}</span>
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-[var(--feature-ink)]/12 text-xs text-[var(--feature-ink)]/55">
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
