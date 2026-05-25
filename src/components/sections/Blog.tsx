"use client";

import Image from "next/image";
import Link from "next/link";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import { PillButton } from "@/components/primitives/PillButton";
import { media } from "@/lib/media";

const POSTS = [
  {
    slug: "q1-2026-nyc-market-report",
    title: "Q1 2026 NYC Market Report",
    eyebrow: "Market read",
    img: media.blog1,
    date: "May 2026",
    readTime: "8 min",
    excerpt:
      "Strong rental demand, active sales, and shifting pricing — what it means heading into spring.",
  },
  {
    slug: "what-1m-buys-across-nyc",
    title: "What $1M Buys in Different NYC Neighborhoods",
    eyebrow: "Buyer guide",
    img: media.blog2,
    date: "Apr 2026",
    readTime: "5 min",
    excerpt:
      "A snapshot of available listings across Manhattan, and the surprising range at this price point.",
  },
  {
    slug: "philly-real-estate-winter-or-spring",
    title: "Philly Real Estate: A Winter Chill or a Spring Opportunity?",
    eyebrow: "Regional",
    img: media.blog3,
    date: "Mar 2026",
    readTime: "6 min",
    excerpt:
      "Record-low listings and steady price growth define a unique February for the Philadelphia metro.",
  },
];

export function Blog() {
  return (
    <section className="py-24 sm:py-40">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6 mb-12 sm:mb-16">
          <RevealOnView>
            <div className="eyebrow mb-4">From the desk</div>
            <h2 className="h1 max-w-[18ch]">
              Quiet reading,
              <br />
              smarter moves.
            </h2>
          </RevealOnView>
          <RevealOnView className="hidden sm:block">
            <PillButton href="#" variant="ghost">
              All writing
            </PillButton>
          </RevealOnView>
        </div>

        <div className="grid gap-8 sm:gap-12 md:grid-cols-3">
          {POSTS.map((p, i) => (
            <RevealOnView key={p.slug} delay={i * 0.06}>
              <Link href={`#${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--line)]">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={80}
                  />
                </div>
                <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                  <span>{p.eyebrow}</span>
                  <span>·</span>
                  <span>{p.date}</span>
                  <span>·</span>
                  <span>{p.readTime}</span>
                </div>
                <h3 className="mt-3 text-2xl tracking-[-0.015em] leading-snug font-medium max-w-[26ch] group-hover:text-[var(--ink-soft)] transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-[var(--ink-soft)] max-w-[36ch] text-[var(--t-body)] leading-relaxed">
                  {p.excerpt}
                </p>
              </Link>
            </RevealOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
