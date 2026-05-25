"use client";

import Image from "next/image";
import { ScrubWords } from "@/components/primitives/ScrubWords";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import { PillButton } from "@/components/primitives/PillButton";
import { media } from "@/lib/media";

export function LifeChanging() {
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
              {/* Vamar brand veil — navy gradient bottom-up, plus brass top accent */}
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
              <span>Where you live</span>
              <span>changes everything</span>
            </div>
          </RevealOnView>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:pl-12 flex flex-col gap-12">
          <RevealOnView>
            <div className="eyebrow mb-6">A bigger search</div>
            <h2 className="h1 max-w-[18ch]">
              Life-changing
              <br />
              <span data-faint>doesn&apos;t come</span> from
              <br />
              the listing.
            </h2>
          </RevealOnView>

          <ScrubWords className="text-2xl sm:text-3xl leading-[1.25] max-w-[34ch] tracking-[-0.01em] font-medium">
            {`You don't find a home by walking through houses. You find one by understanding what you're walking toward — the morning routine, the school run, the dinner on Sunday, the version of yourself that gets to live there next.`}
          </ScrubWords>

          <ScrubWords className="text-2xl sm:text-3xl leading-[1.25] max-w-[34ch] tracking-[-0.01em] font-medium">
            {`Vamar pairs you with an agent who asks the right questions before they show you a single property. That changes everything that comes after.`}
          </ScrubWords>

          <div className="pt-2">
            <PillButton href="/agents">Meet the agents</PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
