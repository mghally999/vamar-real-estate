"use client";

import Image from "next/image";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import { PillButton } from "@/components/primitives/PillButton";
import { media } from "@/lib/media";

export function AgentsPitch() {
  return (
    <section className="relative overflow-hidden bg-[var(--ink)] text-[var(--bg)]">
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
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/85 to-transparent" />
      </div>

      <div className="container-x relative py-28 sm:py-40 grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-7">
          <RevealOnView>
            <div className="eyebrow mb-6 text-[var(--bg)]/65">For agents</div>
            <h2
              className="display display-tight"
              style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}
            >
              Don&apos;t rent
              <br />
              your career.
            </h2>
            <p className="mt-8 max-w-[44ch] text-lg text-[var(--bg)]/65 leading-relaxed">
              At Vamar, you own the relationships you build. Top-tier splits,
              real coaching, a leadership team that&apos;s closed more deals than
              they&apos;ve given speeches. Bring the work, keep the upside.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <PillButton href="/apply" variant="outline" className="!bg-white !text-[var(--ink)] !border-white hover:!bg-transparent hover:!text-white">
                Join Vamar
              </PillButton>
              <PillButton href="/about" variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-[var(--ink)]">
                Why Vamar
              </PillButton>
            </div>
          </RevealOnView>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:pt-12 grid grid-cols-2 gap-6 self-end">
          {[
            { k: "85/15", v: "Industry-leading splits" },
            { k: "AED 0", v: "Desk & tech fees" },
            { k: "1:1", v: "Coaching, every week" },
            { k: "24h", v: "Lead response SLA" },
          ].map((stat) => (
            <RevealOnView
              key={stat.k}
              className="border-t border-white/15 pt-5"
            >
              <div className="text-3xl sm:text-4xl tracking-[-0.02em] font-semibold">
                {stat.k}
              </div>
              <div className="mt-2 text-sm text-[var(--bg)]/65">{stat.v}</div>
            </RevealOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
