"use client";

import { RevealOnView } from "@/components/primitives/RevealOnView";
import type { Dictionary } from "@/lib/getDictionary";

type Dict = Dictionary["privacy"];

export function Privacy({ dict }: { dict: Dict }) {
  return (
    <section className="py-24 sm:py-40">
      <div className="container-x">
        <RevealOnView>
          <div className="eyebrow mb-4">{dict.eyebrow}</div>
          <h2 className="h1 max-w-[20ch]">
            {dict.title[0]}
            <br />
            {dict.title[1]}
            {dict.title[2] && (
              <>
                <br />
                <span data-faint>{dict.title[2]}</span>
              </>
            )}
          </h2>
        </RevealOnView>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            {dict.paragraphs.map((p, i) => (
              <RevealOnView key={i}>
                <p className="text-lg text-[var(--ink-soft)] leading-relaxed max-w-[44ch]">
                  {p}
                </p>
              </RevealOnView>
            ))}
          </div>

          <div>
            <RevealOnView>
              <div className="text-sm tracking-[0.18em] text-[var(--ink-soft)] uppercase mb-8">
                {dict.pillarHeading}
              </div>
              <div className="space-y-8">
                {dict.pillars.map((pillar, i) => (
                  <div
                    key={i}
                    className="border-t border-[var(--line)] pt-6"
                  >
                    <h3 className="text-xl font-medium tracking-[-0.01em] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-[var(--ink-soft)] leading-relaxed">
                      {pillar.body}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-6 rounded-2xl bg-[var(--feature-bg)] text-[var(--feature-ink)]">
                <p className="text-sm leading-relaxed">{dict.badge}</p>
              </div>
            </RevealOnView>
          </div>
        </div>
      </div>
    </section>
  );
}
