"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { PillButton } from "@/components/primitives/PillButton";
import { media } from "@/lib/media";

export function BigVamarSignoff() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const section = ref.current;
      if (!section) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      const word = section.querySelector(".big-word") as HTMLElement | null;
      const sub = section.querySelector(".big-sub") as HTMLElement | null;
      const sky = section.querySelector(".big-sky") as HTMLElement | null;
      if (!word) return;

      gsap.fromTo(
        word,
        { yPercent: 30 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.6,
          },
        }
      );

      if (sky) {
        gsap.fromTo(
          sky,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      }

      if (sub) {
        gsap.fromTo(
          sub,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 70%" },
          }
        );
      }
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative pt-24 sm:pt-40 pb-12 sm:pb-20 overflow-hidden"
    >
      {/* Soft sky / cloud backdrop — parallax behind the wordmark */}
      <div
        className="big-sky pointer-events-none absolute inset-x-0 top-0 -z-0 will-change-transform"
        style={{ height: "120%" }}
      >
        <Image
          src={media.findClouds}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          quality={70}
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
      </div>

      <div className="container-x relative z-10 flex flex-col items-center text-center">
        <div className="big-sub eyebrow mb-8 sm:mb-12">
          Find what moves you.
        </div>

        <h2
          className="big-word display display-tight select-none leading-[0.85]"
          style={{
            fontSize: "clamp(7rem, 28vw, 26rem)",
            letterSpacing: "-0.06em",
            fontWeight: 800,
            backgroundImage: `url(${media.heroBuilding})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            backgroundRepeat: "no-repeat",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
          aria-label="Vamar"
        >
          vamar.
        </h2>

        <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-3">
          <PillButton href="/apply">Start your search</PillButton>
          <PillButton href="/agents" variant="ghost">
            Meet the agents
          </PillButton>
        </div>
      </div>
    </section>
  );
}
