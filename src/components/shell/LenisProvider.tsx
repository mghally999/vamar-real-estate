"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerGsap } from "@/lib/gsap";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      // No smooth scroll for reduced motion users.
      const refresh = () => ScrollTrigger.refresh();
      if (typeof document !== "undefined" && document.fonts?.ready) {
        document.fonts.ready.then(refresh);
      }
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      // Avoid hijacking touch on mobile; native scroll feels better there.
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after fonts load to recalculate measurements.
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      gsap.ticker.remove(tickerFn);
      window.removeEventListener("load", onLoad);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
