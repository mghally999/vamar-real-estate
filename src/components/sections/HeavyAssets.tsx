"use client";

import { RevealOnView } from "@/components/primitives/RevealOnView";
import type { Dictionary } from "@/lib/getDictionary";

type Dict = Dictionary["heavyAssets"];

export function HeavyAssets({ dict }: { dict: Dict }) {
  return (
    <section className="py-24 sm:py-40 bg-[var(--feature-bg)] text-[var(--feature-ink)]">
      <div className="container-x">
        <RevealOnView>
          <div className="eyebrow mb-4 text-[var(--feature-ink)]/55">
            {dict.eyebrow}
          </div>
          <h2 className="h1 max-w-[20ch]">
            {dict.title[0]}
            <br />
            <span className="text-[var(--feature-ink)]/55">{dict.title[1]}</span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg text-[var(--feature-ink)]/65 leading-relaxed">
            {dict.intro}
          </p>
        </RevealOnView>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <RevealOnView>
            <div className="text-sm tracking-[0.18em] text-[var(--feature-ink)]/55 uppercase mb-6">
              {dict.categoriesHeading}
            </div>
            <ul className="space-y-4">
              {dict.categories.map((cat, i) => (
                <li
                  key={i}
                  className="text-xl sm:text-2xl font-medium tracking-[-0.01em] border-b border-white/10 pb-4"
                >
                  {cat}
                </li>
              ))}
            </ul>
          </RevealOnView>

          <RevealOnView delay={0.1} className="self-end">
            <p className="text-[var(--feature-ink)]/65 leading-relaxed max-w-[44ch]">
              {dict.note}
            </p>
          </RevealOnView>
        </div>
      </div>
    </section>
  );
}
