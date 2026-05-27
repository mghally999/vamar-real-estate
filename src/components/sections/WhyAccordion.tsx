"use client";

import { Accordion } from "@/components/primitives/Accordion";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import type { Dictionary } from "@/lib/getDictionary";

type Dict = Dictionary["whyAccordion"];

export function WhyAccordion({ dict }: { dict: Dict }) {
  const items = dict.items.map((item, i) => ({
    id: String(i + 1),
    question: item.q,
    answer: <p>{item.a}</p>,
  }));

  return (
    <section className="py-24 sm:py-40">
      <div className="container-x grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-4">
          <RevealOnView>
            <div className="eyebrow mb-4">{dict.eyebrow}</div>
            <h2 className="h1 max-w-[14ch]">
              {dict.title[0]}
              <br />
              <span data-faint>{dict.title[1]}</span>
            </h2>
            <p className="mt-6 max-w-[36ch] text-[var(--ink-soft)] leading-relaxed">
              {dict.subtitle}
            </p>
          </RevealOnView>
        </div>

        <div className="col-span-12 lg:col-span-8 lg:ps-10">
          <RevealOnView>
            <Accordion items={items} />
          </RevealOnView>
        </div>
      </div>
    </section>
  );
}
