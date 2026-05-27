"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n-config";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const other = current === "en" ? "ar" : "en";
  const stripped = pathname.replace(/^\/(en|ar)/, "") || "/";
  const href = `/${other}${stripped === "/" ? "" : stripped}`;
  const label = other === "ar" ? "عربي" : "EN";
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center h-9 px-3 rounded-full border border-[var(--line)] text-sm hover:border-[var(--ink)] transition"
      aria-label={`Switch to ${other === "ar" ? "Arabic" : "English"}`}
    >
      {label}
    </Link>
  );
}
