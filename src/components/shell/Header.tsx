"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VamarLogo } from "@/components/primitives/VamarLogo";
import { LanguageSwitcher } from "@/components/shell/LanguageSwitcher";
import { ThemeToggle } from "@/components/shell/ThemeToggle";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/getDictionary";

type Dict = Dictionary["nav"];

function navLinks(locale: Locale, dict: Dict) {
  return [
    { href: `/${locale}/search`, label: dict.search },
    { href: `/${locale}/agents`, label: dict.team },
    { href: `/${locale}/paperwork`, label: dict.paperwork },
    { href: `/${locale}/resources`, label: dict.resources },
    { href: `/${locale}/about`, label: dict.about },
  ];
}

export function Header({ locale, dict }: { locale: Locale; dict: Dict }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = navLinks(locale, dict);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md bg-[var(--bg)]/85 border-b border-[var(--line)]/60"
          : "bg-transparent"
      )}
    >
      <div className="container-x flex h-16 items-center justify-between sm:h-20">
        <Link
          href={`/${locale}`}
          className="flex items-center"
          aria-label="Vamar Real Estate — Home"
        >
          <VamarLogo
            withSubtitle={false}
            className="h-7 sm:h-8 w-auto text-[#151717]"
          />
        </Link>

        <nav
          className="hidden md:flex items-center gap-8"
          aria-label={dict.primary}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm tracking-[-0.01em] text-[var(--ink)] hover:text-[var(--ink)]/60 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher current={locale} />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher current={locale} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)]"
            aria-label={open ? dict.closeMenu : dict.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <motion.line
                x1="0"
                x2="18"
                animate={{
                  y1: open ? 6 : 0,
                  y2: open ? 6 : 0,
                  rotate: open ? 45 : 0,
                }}
                style={{ originX: 0.5, originY: 0.5 }}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <motion.line
                x1="0"
                x2="18"
                y1="6"
                y2="6"
                animate={{ opacity: open ? 0 : 1 }}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <motion.line
                x1="0"
                x2="18"
                y1="12"
                y2="12"
                animate={{
                  y1: open ? 6 : 12,
                  y2: open ? 6 : 12,
                  rotate: open ? -45 : 0,
                }}
                style={{ originX: 0.5, originY: 0.5 }}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-[var(--bg)]"
          >
            <nav
              className="container-x flex flex-col gap-2 pt-8 pb-12"
              aria-label={dict.mobilePrimary}
            >
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-3xl tracking-[-0.02em] font-medium border-b border-[var(--line)]"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
