"use client";

import Image from "next/image";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import { PillButton } from "@/components/primitives/PillButton";
import { media } from "@/lib/media";
import type { Dictionary } from "@/lib/getDictionary";

type Dict = Dictionary["ownersPitch"];

export function AgentsPitch({
  dict,
}: {
  dict: Dict;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--feature-bg)] text-[var(--feature-ink)]">
      <div className="absolute inset-0">
        <Image
          src={media.agentsPitch}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/85 to-transparent rtl:bg-gradient-to-l" />
      </div>

      <div className="container-x relative py-28 sm:py-40 grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-7">
          <RevealOnView>
            <div className="eyebrow mb-6 text-[var(--feature-ink)]/65">
              {dict.eyebrow}
            </div>
            <h2
              className="display display-tight"
              style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}
            >
              {dict.title[0]}
              <br />
              {dict.title[1]}
            </h2>
            <p className="mt-8 max-w-[44ch] text-lg text-[var(--feature-ink)]/65 leading-relaxed">
              {dict.body}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <PillButton
                href={`/apply`}
                variant="outline"
                className="!bg-white !text-[var(--feature-bg)] !border-white hover:!bg-transparent hover:!text-white"
              >
                {dict.ctaPrimary}
              </PillButton>
              <PillButton
                href={`/about`}
                variant="outline"
                className="!border-white !text-white hover:!bg-white hover:!text-[var(--feature-bg)]"
              >
                {dict.ctaSecondary}
              </PillButton>
            </div>
          </RevealOnView>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:pt-12 grid grid-cols-2 gap-6 self-end">
          {dict.stats.map((stat) => (
            <RevealOnView
              key={stat.k}
              className="border-t border-white/15 pt-5"
            >
              <div className="text-3xl sm:text-4xl tracking-[-0.02em] font-semibold">
                {stat.k}
              </div>
              <div className="mt-2 text-sm text-[var(--feature-ink)]/65">{stat.v}</div>
            </RevealOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
