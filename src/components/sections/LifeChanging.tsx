"use client";

import Image from "next/image";
import { ScrubWords } from "@/components/primitives/ScrubWords";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import { PillButton } from "@/components/primitives/PillButton";
import { media } from "@/lib/media";
import type { Dictionary } from "@/lib/getDictionary";
import type { Locale } from "@/lib/i18n-config";

type Dict = Dictionary["lifeChanging"];

export function LifeChanging({ dict, locale }: { dict: Dict; locale: Locale }) {
  return (
    <section className="relative z-10 bg-[var(--bg)] py-24 sm:py-40">
      <div className="container-x grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-5">
          <RevealOnView className="sticky top-32">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
              <Image
                src={media.nycSkyline}
                alt="Dubai skyline at twilight, anchored by Burj Khalifa"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                quality={85}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#162842]/70 via-[#162842]/25 to-transparent"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#162842]/35 to-transparent"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
              <span>{dict.imageCaption1}</span>
              <span>{dict.imageCaption2}</span>
            </div>
          </RevealOnView>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:ps-12 flex flex-col gap-12">
          <RevealOnView>
            <div className="eyebrow mb-6">{dict.eyebrow}</div>
            <h2 className="h1 max-w-[18ch]">
              {dict.title[0]}
              <br />
              <span data-faint>{dict.title[1]}</span>
              <br />
              {dict.title[2]}
            </h2>
          </RevealOnView>

          {dict.paragraphs.map((p, i) => (
            <ScrubWords
              key={i}
              className="text-2xl sm:text-3xl leading-[1.25] max-w-[34ch] tracking-[-0.01em] font-medium"
            >
              {p}
            </ScrubWords>
          ))}

          <div className="pt-2">
            <PillButton href={`/${locale}/agents`}>{dict.cta}</PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
