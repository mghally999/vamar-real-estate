"use client";

import { useRef, ReactNode, createElement } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type ContainerTag = "div" | "section" | "article" | "li" | "ul" | "ol" | "header" | "footer" | "main" | "aside" | "nav" | "figure";

type RevealDirection = "up" | "down" | "left" | "right";

interface RevealOnViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  /** Horizontal offset used when `from` is "left" or "right". Defaults to 64. */
  x?: number;
  /** Slide-in direction. "up" (default) preserves existing fade-up behavior. */
  from?: RevealDirection;
  as?: ContainerTag;
  /** When true, children are wrapped and staggered as siblings. */
  stagger?: boolean;
  staggerAmount?: number;
}

export function RevealOnView({
  children,
  className,
  delay = 0,
  duration = 0.9,
  y = 32,
  x = 64,
  from = "up",
  as: As = "div",
  stagger = false,
  staggerAmount = 0.08,
}: RevealOnViewProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      registerGsap();

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const target = ref.current;
      const targets = stagger
        ? Array.from(target.children) as HTMLElement[]
        : [target];

      if (reduce) {
        gsap.set(targets, { opacity: 1, x: 0, y: 0 });
        return;
      }

      const fromX = from === "left" ? -x : from === "right" ? x : 0;
      const fromY = from === "up" ? y : from === "down" ? -y : 0;

      gsap.set(targets, {
        opacity: 0,
        x: fromX,
        y: fromY,
        willChange: "transform, opacity",
      });

      gsap.to(targets, {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        stagger: stagger ? staggerAmount : 0,
        scrollTrigger: {
          trigger: target,
          start: "top 85%",
          once: true,
        },
        onComplete: () => {
          targets.forEach((el) => {
            el.style.willChange = "auto";
          });
        },
      });
    },
    { scope: ref }
  );

  return createElement(
    As,
    { ref: ref as React.Ref<HTMLElement>, className: cn(className) },
    children
  );
}
