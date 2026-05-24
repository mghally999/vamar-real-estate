"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import styles from "./Hero.module.css";
import { PillButton } from "@/components/primitives/PillButton";

// NB: brief's JSX uses `import back from "/public/img/hero/back...webp"` static
// imports. That syntax is invalid in Next.js — you can't import from /public/.
// Files in public/ are served by string src on <Image />. Using string paths.

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const houseBg = useRef<HTMLDivElement>(null);
  const composite = useRef<HTMLDivElement>(null);
  const houseFg = useRef<HTMLDivElement>(null);
  const cloudL = useRef<HTMLDivElement>(null);
  const cloudR = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const smokeTop = useRef<HTMLDivElement>(null);
  const overlap = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // Phase 2 — scrub timeline ----------------------------------------------
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !root.current) return;

      registerGsap();

      const tl = gsap.timeline();
      tl.to(
        [houseBg.current, houseFg.current],
        { y: "-40%", scale: 1.3, duration: 1, ease: "none" },
        0
      );
      tl.to(smokeTop.current, { y: "0%", duration: 1, ease: "none" }, 0);
      tl.to(cloudL.current, { x: "-15%", duration: 1, ease: "none" }, 0);
      tl.to(cloudR.current, { x: "15%", duration: 1, ease: "none" }, 0);
      tl.to(
        content.current,
        { y: "20%", scale: 0.9, duration: 1, ease: "none" },
        0
      );
      tl.to(content.current, { opacity: 0, duration: 0.2, ease: "none" }, 0);
      tl.to(logo.current, { opacity: 1, duration: 0.01 }, 0.1);
      tl.to(logo.current, { opacity: 0, duration: 0.2, ease: "none" }, 0.28);
      tl.to(
        composite.current,
        { opacity: 1, duration: 0.1, ease: "none" },
        0.3
      );
      tl.to(houseBg.current, { opacity: 0, duration: 0.1, ease: "none" }, 0.3);

      ScrollTrigger.create({
        trigger: root.current,
        animation: tl,
        start: "top top",
        end: "bottom top",
        scrub: 0.1,
        invalidateOnRefresh: true,
      });
    },
    { scope: root }
  );

  // Phase 2 — intro timeline ----------------------------------------------
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !root.current) return;

      const h1 = titleRef.current?.querySelector("h1");
      if (h1 && !h1.dataset.split) {
        const words = (h1.textContent ?? "").trim().split(/\s+/);
        h1.innerHTML = words
          .map(
            (w) =>
              `<span style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word" style="display:inline-block;will-change:transform">${w}</span></span>`
          )
          .join(" ");
        h1.dataset.split = "1";
      }
      const wordEls = h1?.querySelectorAll(".word");

      const intro = gsap.timeline({ paused: true });
      intro.fromTo(
        root.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.6 },
        0
      );
      if (wordEls && wordEls.length) {
        intro.fromTo(
          wordEls,
          { yPercent: 100 },
          { yPercent: 0, duration: 2, stagger: 0.1, ease: "expo.out" },
          0
        );
      }
      intro.fromTo(
        [textRef.current, actionsRef.current],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" },
        0.4
      );
      intro.fromTo(
        backRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 5, ease: "expo.out" },
        0
      );
      intro.fromTo(
        cloudL.current,
        { y: "50%" },
        { y: "0%", duration: 3, ease: "expo.out" },
        0
      );
      intro.fromTo(
        cloudR.current,
        { y: "100%" },
        { y: "0%", duration: 4, ease: "expo.out" },
        0.1
      );

      const houseImgs = [
        houseBg.current?.querySelector("img"),
        houseFg.current?.querySelector("img"),
      ].filter(Boolean);
      intro.fromTo(houseImgs, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.2);
      intro.fromTo(
        houseImgs,
        { y: "10%" },
        { y: "0%", duration: 3, ease: "expo.out" },
        0.2
      );

      const t = setTimeout(
        () => requestAnimationFrame(() => intro.play()),
        200
      );
      return () => clearTimeout(t);
    },
    { scope: root }
  );

  return (
    <section ref={root} className={styles.root}>
      <div className={styles.top}>
        <div className={styles.bg}>
          <div ref={backRef} className={styles.back}>
            <Image
              src="/img/hero/back.f53e9773.webp"
              alt=""
              width={1920}
              height={1080}
              priority
              sizes="100vw"
            />
          </div>

          <div ref={houseBg} className={styles.house}>
            <Image
              src="/img/hero/house.8ed9b3db.webp"
              alt=""
              width={1400}
              height={1245}
              priority
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 900px"
            />
          </div>

          <div ref={composite} className={styles.composite}>
            <div ref={houseFg} className={styles.house}>
              <Image
                src="/img/hero/house.8ed9b3db.webp"
                alt=""
                width={1400}
                height={1245}
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 900px"
              />
            </div>
          </div>

          <div className={styles.clouds}>
            <div ref={cloudL} className={styles.cloud}>
              <Image
                src="/img/hero/cloud.c8800fa9.webp"
                alt=""
                width={768}
                height={326}
                sizes="40vw"
              />
            </div>
            <div ref={cloudR} className={styles.cloud}>
              <Image
                src="/img/hero/cloud.c8800fa9.webp"
                alt=""
                width={768}
                height={326}
                sizes="35vw"
              />
            </div>
          </div>

          <div ref={logo} className={styles.logo}>
            <FindWordmarkStrokes />
          </div>

          <div ref={smokeTop} className={styles.smoke}>
            <Image
              src="/img/hero/smoke.9f683cb4.webp"
              alt=""
              width={768}
              height={248}
              priority
              sizes="100vw"
            />
          </div>
        </div>

        <div ref={content} className={styles.content}>
          <div>
            <div ref={titleRef} className={styles.title}>
              <h1>Find What Moves You</h1>
            </div>
            <div ref={textRef} className={styles.text}>
              <p>
                Expert agents. Real guidance.{" "}
                <span className={styles.em}>
                  A clear path to find what&rsquo;s next.
                </span>
              </p>
            </div>
            <div ref={actionsRef} className={styles.actions}>
              <PillButton href="/search" variant="dark" arrow="right">
                Find Properties
              </PillButton>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div ref={overlap} className={styles.overlap}>
          <div className={styles.smoke}>
            <Image
              src="/img/hero/smoke.9f683cb4.webp"
              alt=""
              width={768}
              height={248}
              priority
              sizes="100vw"
            />
          </div>
          <div className={styles.overlay} />
        </div>
      </div>
    </section>
  );
}

// Vamar Real Estate wordmark — rendered as SVG <text> so we don't need
// custom path outlines for each letterform. Same viewBox as the mask SVG
// (0 0 977 423) so the composite stays aligned.
//
// NB: the Phase 2 scrub timeline queries `path` elements inside .logo and
// drives stroke-dasharray. With <text> there are no <path>s, so that tween
// no-ops harmlessly — the wordmark still fades in/out via the .logo opacity
// tweens. Path-based stroke draw can be re-added later if wanted.
function FindWordmarkStrokes() {
  return (
    <svg viewBox="0 0 977 423" xmlns="http://www.w3.org/2000/svg">
      <g
        fill="transparent"
        stroke="#fff"
        strokeWidth="2"
        fontFamily="'Arial Black','Helvetica Neue',Helvetica,Arial,sans-serif"
      >
        <text
          x="488.5"
          y="250"
          fontSize="280"
          fontWeight="900"
          textAnchor="middle"
          letterSpacing="-12"
        >
          Vamar
        </text>
        <text
          x="488.5"
          y="390"
          fontSize="100"
          fontWeight="700"
          textAnchor="middle"
          fontFamily="'Helvetica Neue',Helvetica,Arial,sans-serif"
        >
          Real Estate
        </text>
      </g>
    </svg>
  );
}
