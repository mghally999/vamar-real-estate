"use client";

import { RevealOnView } from "@/components/primitives/RevealOnView";
import type { Dictionary } from "@/lib/getDictionary";

type Dict = Dictionary["contact"];

export function Contact({ dict }: { dict: Dict }) {
  const items = [
    {
      label: dict.phoneLabel,
      value: dict.phoneValue,
      href: `tel:${dict.phoneValue.replace(/\s/g, "")}`,
    },
    {
      label: dict.emailLabel,
      value: dict.emailValue,
      href: `mailto:${dict.emailValue}`,
    },
    {
      label: dict.websiteLabel,
      value: dict.websiteValue,
      href: undefined,
    },
    {
      label: dict.addressLabel,
      value: dict.addressValue,
      href: undefined,
    },
  ];

  return (
    <section className="py-24 sm:py-40 bg-[var(--feature-bg)] text-[var(--feature-ink)]">
      <div className="container-x">
        <RevealOnView>
          <div className="eyebrow mb-4 text-[var(--feature-ink)]/55">
            {dict.eyebrow}
          </div>
          <h2 className="h1 max-w-[18ch]">{dict.title[0]}</h2>
          <p className="mt-6 max-w-[52ch] text-lg text-[var(--feature-ink)]/65 leading-relaxed">
            {dict.subtitle}
          </p>
        </RevealOnView>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <RevealOnView
              key={i}
              delay={i * 0.06}
              className="border-t border-white/15 pt-6"
            >
              <div className="text-sm tracking-[0.18em] text-[var(--feature-ink)]/55 uppercase mb-3">
                {item.label}
              </div>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-xl font-medium hover:text-[var(--accent)] transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <div className="text-xl font-medium">{item.value}</div>
              )}
            </RevealOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
