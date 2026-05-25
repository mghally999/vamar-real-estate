"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { PillButton } from "@/components/primitives/PillButton";
import { media } from "@/lib/media";

export function TalkToHuman() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const section = ref.current;
      if (!section) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const img = section.querySelector(".tth-img") as HTMLElement | null;
      const heading = section.querySelector(".tth-heading") as HTMLElement | null;
      const sub = section.querySelector(".tth-sub") as HTMLElement | null;

      if (reduce || !img || !heading) {
        return;
      }

      gsap.fromTo(
        img,
        { scale: 1.15, yPercent: 8 },
        {
          scale: 1,
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );

      if (sub) {
        gsap.fromTo(
          sub,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 75%" },
          }
        );
      }
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--ink)] text-[var(--bg)]"
      aria-label="Talk to a real human"
    >
      <div className="tth-img absolute inset-0 will-change-transform">
        <Image
          src={media.nycAerial}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-45"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/85 via-[var(--ink)]/55 to-[var(--ink)]/95" />
      </div>

      <div className="container-x relative py-28 sm:py-44 grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-9">
          <div className="tth-heading">
            <div className="eyebrow mb-6 text-[var(--bg)]/65">
              No bots. No forms-into-the-void.
            </div>
            <h2
              className="display display-tight max-w-[18ch]"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              Talk to a<br />
              <span className="text-[var(--bg)]/55">Real Human.</span>
            </h2>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3 lg:pt-8">
          <p className="tth-sub max-w-[36ch] text-[var(--bg)]/65 leading-relaxed mb-8">
            A senior agent picks up — same business day. We&apos;ll listen first,
            send nothing without permission, and tell you when we&apos;re not the
            right fit.
          </p>
          <div className="flex flex-wrap gap-3">
            <PillButton
              href="/apply"
              variant="outline"
              className="!bg-white !text-[var(--ink)] !border-white hover:!bg-transparent hover:!text-white"
            >
              Start a conversation
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
