"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

interface ScrubWordsProps {
  children: string;
  className?: string;
  /** trigger viewport position (default "top 80%") */
  start?: string;
  /** end viewport position (default "top 30%") */
  end?: string;
  /** scrub value (default 0.5) */
  scrub?: number | boolean;
}

/**
 * Scroll-driven word-by-word color fade from --ink-faint to --ink.
 * Drop in a paragraph as children (string); it splits and animates.
 */
export function ScrubWords({
  children,
  className,
  start = "top 80%",
  end = "top 30%",
  scrub = 0.5,
}: ScrubWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      registerGsap();

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Build the word spans.
      const words = children.split(/\s+/).filter(Boolean);
      const spans = words.map((w, i) => {
        const span = document.createElement("span");
        span.textContent = w;
        span.style.color = "var(--ink-faint)";
        span.style.transition = "none";
        // Trailing space, not on last word.
        const trailing =
          i < words.length - 1
            ? document.createTextNode(" ")
            : document.createTextNode("");
        return [span, trailing] as const;
      });

      ref.current.replaceChildren(
        ...spans.flatMap(([s, t]) => [s, t]) as Node[]
      );

      const spanEls = spans.map(([s]) => s);

      if (reduce) {
        // One-shot: just set them all to ink.
        spanEls.forEach((s) => (s.style.color = "var(--ink)"));
        return;
      }

      gsap.to(spanEls, {
        color: "var(--ink)",
        stagger: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          scrub,
        },
      });
    },
    { scope: ref, dependencies: [children] }
  );

  return (
    <p
      ref={ref}
      className={cn(
        "text-[var(--t-body)] leading-snug max-w-[44ch]",
        className
      )}
    >
      {children}
    </p>
  );
}
