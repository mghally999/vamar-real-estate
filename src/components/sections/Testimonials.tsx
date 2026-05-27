"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/getDictionary";

type Dict = Dictionary["testimonials"];
type Founder = Dictionary["founders"]["members"][number];

export function Testimonials({
  dict,
  founders,
}: {
  dict: Dict;
  founders: Founder[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[i] as HTMLElement | undefined;
    if (!slide) return;
    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
    setActive(i);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / (track.clientWidth * 0.85));
    setActive(Math.max(0, Math.min(founders.length - 1, i)));
  };

  return (
    <section className="py-24 sm:py-40 bg-[var(--bg)]">
      <div className="container-x">
        <RevealOnView>
          <div className="flex items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="eyebrow mb-4">{dict.eyebrow}</div>
              <h2 className="h1 max-w-[18ch]">
                {dict.title[0]}
                <br />
                {dict.title[1]}
                <br />
                <span data-faint>{dict.title[2]}</span>
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollTo(Math.max(0, active - 1))}
                aria-label="Previous"
                className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] hover:border-[var(--ink)] transition"
              >
                &larr;
              </button>
              <button
                type="button"
                onClick={() =>
                  scrollTo(Math.min(founders.length - 1, active + 1))
                }
                aria-label="Next"
                className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] hover:border-[var(--ink)] transition"
              >
                &rarr;
              </button>
            </div>
          </div>
        </RevealOnView>
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="no-scrollbar flex gap-6 sm:gap-10 overflow-x-auto snap-x snap-mandatory scroll-ps-6 sm:scroll-ps-10 ps-6 sm:ps-10 pe-6 sm:pe-10"
      >
        {founders.map((f, i) => (
          <motion.figure
            key={f.slug}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: i === active ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
            className="snap-start shrink-0 w-[88vw] sm:w-[64vw] lg:w-[46vw] xl:w-[40vw] bg-white border border-[var(--line)] rounded-2xl p-8 sm:p-10"
          >
            <blockquote className="text-2xl sm:text-3xl tracking-[-0.015em] leading-[1.2] font-medium">
              &ldquo;{f.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              <span className="relative h-12 w-12 overflow-hidden rounded-full bg-[var(--accent)] shrink-0 grid place-items-center text-white font-semibold text-lg">
                {f.name.charAt(0)}
              </span>
              <span>
                <div className="font-medium">{f.name}</div>
                <div className="text-sm text-[var(--ink-soft)]">{f.role}</div>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="container-x mt-10 flex justify-center gap-2">
        {founders.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === active ? "w-8 bg-[var(--ink)]" : "w-4 bg-[var(--line)]"
            )}
          />
        ))}
      </div>
    </section>
  );
}
