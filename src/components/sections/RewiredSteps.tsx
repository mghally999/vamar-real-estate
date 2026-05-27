"use client";

import { RevealOnView } from "@/components/primitives/RevealOnView";
import type { Dictionary } from "@/lib/getDictionary";

type Dict = Dictionary["rewiredSteps"];

export function RewiredSteps({ dict }: { dict: Dict }) {
  return (
    <section className="py-24 sm:py-40">
      <div className="container-x">
        <RevealOnView>
          <div className="eyebrow mb-4">{dict.eyebrow}</div>
          <h2 className="h1 max-w-[20ch]">
            {dict.title[0]}
            <br />
            <span data-faint>{dict.title[1]}</span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg text-[var(--ink-soft)] leading-relaxed">
            {dict.lead}
          </p>
        </RevealOnView>

        <div className="mt-16 sm:mt-24 grid gap-12 sm:gap-16 lg:grid-cols-3">
          {dict.steps.map((s, i) => (
            <RevealOnView
              key={s.n}
              delay={i * 0.08}
              className="border-t border-[var(--line)] pt-8"
            >
              <div className="text-sm tracking-[0.18em] text-[var(--ink-soft)] uppercase mb-6">
                {s.n}
              </div>
              <h3 className="text-3xl sm:text-4xl tracking-[-0.02em] leading-[1.05] font-medium mb-6 max-w-[18ch]">
                {s.title}
              </h3>
              <p className="text-[var(--ink-soft)] max-w-[32ch] leading-relaxed">
                {s.body}
              </p>
            </RevealOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
