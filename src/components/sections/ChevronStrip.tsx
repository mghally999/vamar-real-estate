"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { media } from "@/lib/media";
import type { Dictionary } from "@/lib/getDictionary";

type Dict = Dictionary["chevronStrip"];

const PANEL_IMAGES = [media.chev1, media.chev2, media.chev3, media.chev4];

export function ChevronStrip({ dict }: { dict: Dict }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const section = ref.current;
      if (!section) return;

      const track = section.querySelector(".chev-track") as HTMLElement | null;
      if (!track) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (reduce || isMobile) {
        gsap.set(track, { x: 0 });
        return;
      }

      const distance = track.scrollWidth - section.clientWidth;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: ref }
  );

  const panels = dict.panels.map((p, i) => ({
    src: PANEL_IMAGES[i % PANEL_IMAGES.length],
    alt: p.alt,
    tag: p.tag,
  }));

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--bg)] py-20 sm:py-32"
      aria-label={dict.eyebrow}
    >
      <div className="container-x mb-10 sm:mb-14 flex items-end justify-between gap-6">
        <div>
          <div className="eyebrow mb-3">{dict.eyebrow}</div>
          <h2 className="h2 max-w-[18ch]">
            {dict.title[0]}
            <br />
            {dict.title[1]}
          </h2>
        </div>
        <p className="hidden sm:block max-w-[34ch] text-[var(--ink-soft)]">
          {dict.subtitle}
        </p>
      </div>

      <div className="relative w-full">
        <div className="chev-track flex gap-6 sm:gap-10 px-6 sm:px-10 will-change-transform">
          {panels.concat(panels).map((p, i) => (
            <figure
              key={i}
              className="relative shrink-0 w-[78vw] sm:w-[44vw] lg:w-[34vw] aspect-[16/11] chevron overflow-hidden bg-[var(--line)]"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 34vw, 78vw"
                className="object-cover"
                quality={80}
              />
              <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white text-xs uppercase tracking-[0.18em]">
                <span>{p.tag}</span>
                <span className="opacity-80">
                  0{(i % panels.length) + 1}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
