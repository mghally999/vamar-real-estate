"use client";

import { RevealOnView } from "@/components/primitives/RevealOnView";

const STEPS = [
  {
    n: "01",
    title: "We match you with an expert who actually listens.",
    body: "Twenty minutes with a real agent before a single listing. We learn the next chapter — career, family, school, season — and pair you with the specialist who works it every day.",
  },
  {
    n: "02",
    title: "We define what you really need, not just what's available.",
    body: "Vamar runs a private brief and a private shortlist — leveraging coming-soon inventory, off-market relationships, and what the market is actually doing this week.",
  },
  {
    n: "03",
    title: "We find what fits — and make it happen.",
    body: "Negotiation, paperwork, mortgage hand-off and the move itself, owned by one team, end to end. The relationship doesn't stop at the keys.",
  },
];

export function RewiredSteps() {
  return (
    <section className="py-24 sm:py-40">
      <div className="container-x">
        <RevealOnView>
          <div className="eyebrow mb-4">How Vamar works</div>
          <h2 className="h1 max-w-[20ch]">
            Real Estate,
            <br />
            <span data-faint>Rewired.</span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg text-[var(--ink-soft)] leading-relaxed">
            This isn&apos;t just about real estate. It&apos;s about identity, progress, getting unstuck. You&apos;re not just looking for a place — you&apos;re looking for alignment.
          </p>
        </RevealOnView>

        <div className="mt-16 sm:mt-24 grid gap-12 sm:gap-16 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <RevealOnView
              key={s.n}
              delay={i * 0.08}
              className="border-t border-[var(--line)] pt-8"
            >
              <div className="text-sm tracking-[0.18em] text-[var(--ink-soft)] uppercase mb-6">
                Step {s.n}
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
