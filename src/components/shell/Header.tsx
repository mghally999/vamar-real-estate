"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PillButton } from "@/components/primitives/PillButton";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/search", label: "Search" },
  { href: "/agents", label: "Agents" },
  { href: "/join", label: "Join" },
  { href: "/paperwork", label: "Paperwork" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          href="/"
          className="flex items-center"
          aria-label="Vamar Real Estate — Home"
        >
          <span className="font-bold tracking-tight text-2xl sm:text-3xl text-[var(--ink)]">
            Vamar<span className="text-[var(--ink-soft)]">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm tracking-[-0.01em] text-[var(--ink)] hover:text-[var(--ink-soft)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <PillButton
            href="/sign-in"
            variant="dark"
            arrow={false}
            className="!py-2.5 !px-6 text-sm"
          >
            Sign In
          </PillButton>
        </div>

        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)]"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <motion.line
                x1="0"
                x2="18"
                animate={{ y1: open ? 6 : 0, y2: open ? 6 : 0, rotate: open ? 45 : 0 }}
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
                animate={{ y1: open ? 6 : 12, y2: open ? 6 : 12, rotate: open ? -45 : 0 }}
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
              aria-label="Mobile primary"
            >
              {NAV_LINKS.map((l, i) => (
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
              <div className="pt-8">
                <PillButton
                  href="/sign-in"
                  variant="dark"
                  arrow={false}
                  className="w-full !justify-center"
                >
                  Sign In
                </PillButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
