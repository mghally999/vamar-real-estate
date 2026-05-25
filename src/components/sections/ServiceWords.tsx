"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { media } from "@/lib/media";

const SERVICES = [
  {
    word: "Buy",
    img: media.serviceBuy,
    blurb:
      "We learn the version of your life that fits next, then find the home that fits that life.",
    side: "Search",
  },
  {
    word: "Sell",
    img: media.serviceSell,
    blurb:
      "Pricing where the data says, staging where the buyers are. Listings closed 4.3% over comp on average.",
    side: "List",
  },
  {
    word: "Rent",
    img: media.serviceRent,
    blurb:
      "Long-term and short — handled as a project, not a hobby. Most renters become buyers within two years.",
    side: "Lease",
  },
];

export function ServiceWords() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const section = ref.current;
      if (!section) return;

      const layers = section.querySelectorAll<HTMLElement>(".sw-layer");
      if (!layers.length) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      if (reduce || isMobile) {
        gsap.set(layers, { autoAlpha: 1 });
        return;
      }

      gsap.set(layers, { autoAlpha: 0 });
      gsap.set(layers[0], { autoAlpha: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 0.6,
        },
      });

      layers.forEach((layer, i) => {
        if (i === 0) return;
        tl.to(layers[i - 1], { autoAlpha: 0, duration: 0.5 }, i - 0.5);
        tl.to(layer, { autoAlpha: 1, duration: 0.5 }, i - 0.5);
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden bg-[var(--bg)]"
      aria-label="Buy, sell, rent services"
    >
      {SERVICES.map((s, i) => (
        <div key={s.word} className="sw-layer absolute inset-0">
          {/* Background plate — the same image that fills the word cutout */}
          <Image
            src={s.img}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover"
            quality={80}
            priority={i === 0}
          />
          {/* Pale cream wash so the image-clipped word reads with full color */}
          <div className="absolute inset-0 bg-[var(--bg)]/72" />

          <div className="absolute inset-0 grid place-items-center px-6">
            <div className="text-center max-w-3xl">
              <h2
                className="display display-tight select-none leading-[0.85]"
                style={{
                  fontSize: "clamp(5rem, 20vw, 16rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.06em",
                  backgroundImage: `url(${s.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {s.word}.
              </h2>
              <p className="mt-6 text-base sm:text-lg text-[var(--ink-soft)] max-w-[40ch] mx-auto leading-snug">
                <span className="text-[var(--ink)]">
                  {s.blurb.split(".")[0]}.
                </span>
                {s.blurb.slice(s.blurb.indexOf(".") + 1)}
              </p>
            </div>
          </div>

          <div className="absolute bottom-8 left-0 right-0 container-x flex items-end justify-between text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            <span>
              0{i + 1} / 0{SERVICES.length}
            </span>
            <span>{s.side}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
