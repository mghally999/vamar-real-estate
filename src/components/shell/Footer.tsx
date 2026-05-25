import Link from "next/link";
import { VamarLogo } from "@/components/primitives/VamarLogo";

const COL_1 = [
  { href: "/agents", label: "Agents" },
  { href: "/about", label: "About" },
  { href: "/apply", label: "Apply" },
];

const COL_2 = [
  { href: "/paperwork", label: "Paperwork" },
  { href: "/agents", label: "Find your agent" },
  { href: "/apply", label: "Join Vamar" },
];

const COL_3 = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--bg)] mt-32">
      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <VamarLogo className="h-14 sm:h-16 w-auto text-[var(--bg)] mb-8" />
            <div className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em]">
              find what moves you.
            </div>
            <p className="mt-6 max-w-md text-[var(--bg)]/65 leading-relaxed">
              Real guidance from real agents. Built around your next chapter —
              wherever it takes you.
            </p>
          </div>

          <nav
            className="sm:col-span-2 flex flex-col gap-3 text-sm"
            aria-label="Site"
          >
            <div className="text-[var(--bg)]/55 uppercase tracking-[0.18em] text-[0.7rem] mb-2">
              Site
            </div>
            {COL_1.map((l) => (
              <Link key={l.label} href={l.href} className="hover:opacity-80">
                {l.label}
              </Link>
            ))}
          </nav>

          <nav
            className="sm:col-span-2 flex flex-col gap-3 text-sm"
            aria-label="Resources"
          >
            <div className="text-[var(--bg)]/55 uppercase tracking-[0.18em] text-[0.7rem] mb-2">
              Resources
            </div>
            {COL_2.map((l) => (
              <Link key={l.label} href={l.href} className="hover:opacity-80">
                {l.label}
              </Link>
            ))}
          </nav>

          <nav
            className="sm:col-span-3 flex flex-col gap-3 text-sm"
            aria-label="Social"
          >
            <div className="text-[var(--bg)]/55 uppercase tracking-[0.18em] text-[0.7rem] mb-2">
              Connect
            </div>
            {COL_3.map((l) => (
              <a key={l.label} href={l.href} className="hover:opacity-80">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-[var(--bg)]/12 text-xs text-[var(--bg)]/55">
          <div>© {new Date().getFullYear()} Vamar Real Estate. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:opacity-80">
              Privacy
            </Link>
            <Link href="#" className="hover:opacity-80">
              Terms
            </Link>
            <Link href="#" className="hover:opacity-80">
              Equal Housing
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
