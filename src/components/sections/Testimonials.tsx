"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import { TESTIMONIALS } from "@/data/testimonials";
import { cn } from "@/lib/cn";

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[i] as HTMLElement | undefined;
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActive(i);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / (track.clientWidth * 0.85));
    setActive(Math.max(0, Math.min(TESTIMONIALS.length - 1, i)));
  };

  return (
    <section className="py-24 sm:py-40 bg-[var(--bg)]">
      <div className="container-x">
        <RevealOnView>
          <div className="flex items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="eyebrow mb-4">In their words</div>
              <h2 className="h1 max-w-[18ch]">
                Don&apos;t take<br />our word <span data-faint>for it.</span>
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollTo(Math.max(0, active - 1))}
                aria-label="Previous testimonial"
                className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] hover:border-[var(--ink)] transition"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() =>
                  scrollTo(Math.min(TESTIMONIALS.length - 1, active + 1))
                }
                aria-label="Next testimonial"
                className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] hover:border-[var(--ink)] transition"
              >
                →
              </button>
            </div>
          </div>
        </RevealOnView>
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="no-scrollbar flex gap-6 sm:gap-10 overflow-x-auto snap-x snap-mandatory scroll-pl-6 sm:scroll-pl-10 pl-6 sm:pl-10 pr-6 sm:pr-10"
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.id}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: i === active ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
            className="snap-start shrink-0 w-[88vw] sm:w-[64vw] lg:w-[46vw] xl:w-[40vw] bg-white border border-[var(--line)] rounded-2xl p-8 sm:p-10"
          >
            <blockquote className="text-2xl sm:text-3xl tracking-[-0.015em] leading-[1.2] font-medium">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              <span className="relative h-12 w-12 overflow-hidden rounded-full bg-[var(--line)] shrink-0">
                <Image
                  src={t.photo}
                  alt={t.author}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span>
                <div className="font-medium">{t.author}</div>
                <div className="text-sm text-[var(--ink-soft)]">{t.meta}</div>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="container-x mt-10 flex justify-center gap-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
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
