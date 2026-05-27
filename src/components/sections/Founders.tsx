"use client";

import { RevealOnView } from "@/components/primitives/RevealOnView";
import { PillButton } from "@/components/primitives/PillButton";
import type { Dictionary } from "@/lib/getDictionary";
import type { Locale } from "@/lib/i18n-config";

type Dict = Dictionary["founders"];

export function Founders({ dict, locale }: { dict: Dict; locale: Locale }) {
  return (
    <section className="py-24 sm:py-40">
      <div className="container-x">
        <RevealOnView>
          <div className="eyebrow mb-4">{dict.eyebrow}</div>
          <h2 className="h1 max-w-[20ch]">
            {dict.title[0]}
            <br />
            {dict.title[1]}
            <br />
            <span data-faint>{dict.title[2]}</span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg text-[var(--ink-soft)] leading-relaxed">
            {dict.subtitle}
          </p>
        </RevealOnView>

        <div className="mt-16 sm:mt-24 grid gap-12 md:grid-cols-2">
          {dict.members.map((m, i) => (
            <RevealOnView
              key={m.slug}
              delay={i * 0.08}
              className="border-t border-[var(--line)] pt-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="h-14 w-14 rounded-full bg-[var(--accent)] grid place-items-center text-white font-semibold text-xl shrink-0">
                  {m.name.charAt(0)}
                </span>
                <div>
                  <h3 className="text-2xl font-medium tracking-[-0.01em]">
                    {m.name}
                  </h3>
                  <div className="text-sm text-[var(--ink-soft)]">{m.role}</div>
                </div>
              </div>
              <p className="text-[var(--ink-soft)] leading-relaxed max-w-[44ch]">
                {m.bio}
              </p>
              <PillButton
                href={`/${locale}/agents/${m.slug}`}
                variant="ghost"
                className="mt-6"
              >
                {m.name.split(" ")[0]}
              </PillButton>
            </RevealOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
