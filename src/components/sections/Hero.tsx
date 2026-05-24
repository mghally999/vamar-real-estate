"use client";

import { useRef } from "react";
import Image from "next/image";
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

  // Refs are wired now so Phase 2 timeline can target them directly.
  void backRef;
  void houseBg;
  void composite;
  void houseFg;
  void cloudL;
  void cloudR;
  void logo;
  void smokeTop;
  void overlap;
  void content;
  void titleRef;
  void textRef;
  void actionsRef;

  return (
    <section ref={root} className={styles.root}>
      <div className={styles.top}>
        <div className={styles.bg}>
          <div ref={backRef} className={styles.back}>
            <Image
              src="/img/hero/back.f53e9773.webp"
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </div>

          <div ref={houseBg} className={styles.house}>
            <Image
              src="/img/hero/house.8ed9b3db.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 640px) 400px, (max-width: 1640px) 700px, 75vw"
            />
          </div>

          <div ref={composite} className={styles.composite}>
            <div ref={houseFg} className={styles.house}>
              <Image
                src="/img/hero/house.8ed9b3db.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 640px) 400px, (max-width: 1640px) 700px, 75vw"
              />
            </div>
          </div>

          <div className={styles.clouds}>
            <div ref={cloudL} className={styles.cloud}>
              <Image
                src="/img/hero/cloud.c8800fa9.webp"
                alt=""
                fill
                sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div ref={cloudR} className={styles.cloud}>
              <Image
                src="/img/hero/cloud.c8800fa9.webp"
                alt=""
                fill
                sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 33vw"
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
              fill
              priority
              sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 33vw"
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
              fill
              priority
              sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className={styles.overlay} />
        </div>
      </div>
    </section>
  );
}

// Phase 1 placeholder — empty group, correct viewBox. Phase 2 will paste in
// the actual FIND path data from public/img/hero/wordmark_mask_FIND.svg and
// drive the stroke-dasharray scrub.
function FindWordmarkStrokes() {
  return <svg viewBox="0 0 977 423" xmlns="http://www.w3.org/2000/svg" />;
}
