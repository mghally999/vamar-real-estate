"use client";

import { Accordion } from "@/components/primitives/Accordion";
import { RevealOnView } from "@/components/primitives/RevealOnView";

const ITEMS = [
  {
    id: "1",
    question: "How is Vamar different from a typical brokerage?",
    answer: (
      <p>
        We pair every client with one accountable agent and one in-house team for
        mortgage, paperwork, and the move itself. You won&apos;t be handed off
        between three vendors mid-deal. We also pre-shortlist off-market and
        coming-soon inventory before you ever see a public listing.
      </p>
    ),
  },
  {
    id: "2",
    question: "What do you charge — and how do you get paid?",
    answer: (
      <p>
        Buyers don&apos;t pay us out of pocket; commissions are negotiated into the
        transaction. Sellers see one transparent listing rate with all fees on
        the table on day one. There are no junk fees, retainers, or surprises at
        closing.
      </p>
    ),
  },
  {
    id: "3",
    question: "Do you only handle luxury homes?",
    answer: (
      <p>
        No. About 40% of our 2024 closings were under $1.2M. We work across
        starter homes, family upgrades, executive housing, second homes,
        investment properties, rentals, and commercial. The process is the
        process — at any price point.
      </p>
    ),
  },
  {
    id: "4",
    question: "Can you help if I'm moving to the region for the first time?",
    answer: (
      <p>
        Yes — relocation is one of our deepest specialties. Vamar guides on
        neighborhood selection, schools, visa-aware timelines, mortgage
        eligibility for non-residents, and the practical mechanics of the first
        ninety days. You won&apos;t be on your own.
      </p>
    ),
  },
  {
    id: "5",
    question: "What if I'm not ready to move yet?",
    answer: (
      <p>
        Then we go slow. Many of our best clients started a year (or three) out.
        We&apos;ll set up a private brief, send a quarterly market read, and
        check in when conditions move. There&apos;s no clock.
      </p>
    ),
  },
];

export function WhyAccordion() {
  return (
    <section className="py-24 sm:py-40">
      <div className="container-x grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-4">
          <RevealOnView>
            <div className="eyebrow mb-4">Common questions</div>
            <h2 className="h1 max-w-[14ch]">
              Why Vamar,
              <br />
              <span data-faint>in detail.</span>
            </h2>
            <p className="mt-6 max-w-[36ch] text-[var(--ink-soft)] leading-relaxed">
              The boring questions worth asking before you hire anyone.
            </p>
          </RevealOnView>
        </div>

        <div className="col-span-12 lg:col-span-8 lg:pl-10">
          <RevealOnView>
            <Accordion items={ITEMS} />
          </RevealOnView>
        </div>
      </div>
    </section>
  );
}
