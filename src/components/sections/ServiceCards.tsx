"use client";

import Image from "next/image";
import Link from "next/link";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import { media } from "@/lib/media";

const CARDS = [
  {
    title: "Mortgage",
    body: "In-house brokers who shop nine lenders in parallel. Pre-approval in 48 hours; close in 17 to 21 days.",
    img: media.cardMortgage,
    href: "#",
  },
  {
    title: "Property Management",
    body: "Owners' upside, residents' standard of care. Leasing, maintenance, accounting under one roof.",
    img: media.cardPM,
    href: "#",
  },
  {
    title: "Construction & Reno",
    body: "From the small renovation that makes a listing sell to the build that becomes the family seat.",
    img: media.cardConstruction,
    href: "#",
  },
];

export function ServiceCards() {
  return (
    <section className="py-24 sm:py-40">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <RevealOnView>
            <div className="eyebrow mb-4">Beyond the agent</div>
            <h2 className="h1 max-w-[18ch]">
              One team for every part
              <br />
              of the move.
            </h2>
          </RevealOnView>
          <RevealOnView className="max-w-md text-[var(--ink-soft)]">
            Vamar runs end-to-end so you don&apos;t hand your relationship off to
            three vendors halfway through.
          </RevealOnView>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <RevealOnView
              key={c.title}
              delay={i * 0.08}
              className="group flex flex-col"
            >
              <Link
                href={c.href}
                className="block overflow-hidden rounded-2xl bg-[var(--line)]"
              >
                <div className="relative aspect-[5/4] w-full overflow-hidden">
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={80}
                  />
                </div>
              </Link>
              <div className="mt-6 flex items-start justify-between gap-4">
                <h3 className="text-2xl tracking-[-0.01em] font-medium">
                  {c.title}
                </h3>
                <Link
                  href={c.href}
                  aria-label={`Learn about ${c.title}`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] group-hover:border-[var(--ink)] transition"
                >
                  →
                </Link>
              </div>
              <p className="mt-3 text-[var(--ink-soft)] max-w-[36ch] leading-relaxed">
                {c.body}
              </p>
            </RevealOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
