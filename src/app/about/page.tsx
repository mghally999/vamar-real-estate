import type { Metadata } from "next";
import Image from "next/image";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import { PillButton } from "@/components/primitives/PillButton";
import { ScrubWords } from "@/components/primitives/ScrubWords";
import { media } from "@/lib/media";
import { AGENTS } from "@/data/agents";

export const metadata: Metadata = {
  title: "About",
  description: "The people, principles and practice behind Vamar Real Estate.",
};

const VALUES = [
  {
    n: "01",
    title: "One brief, one team.",
    body:
      "From the first call to the last keys, one team. No baton passes between strangers.",
  },
  {
    n: "02",
    title: "Ask better questions.",
    body:
      "The best deals start with the slowest interviews. We don't show before we listen.",
  },
  {
    n: "03",
    title: "Specialists, by region.",
    body:
      "Every agent owns one neighborhood and one stage of life. Generalists make average outcomes.",
  },
  {
    n: "04",
    title: "Data over theatrics.",
    body:
      "We price where the comps say. We market where the buyers actually are. We don't perform certainty we don't have.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 sm:pt-40 pb-24">
        <div className="container-x grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-7">
            <RevealOnView>
              <div className="eyebrow mb-6">About Vamar</div>
              <h1 className="display display-tight" style={{ fontSize: "var(--t-h1)" }}>
                A different kind of <span data-faint>brokerage</span>,
                <br />
                built from the inside out.
              </h1>
            </RevealOnView>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:pt-6">
            <RevealOnView>
              <p className="text-lg text-[var(--ink-soft)] leading-relaxed max-w-[44ch]">
                Founded in 2014 by three agents who'd spent a decade frustrated
                by the trade-offs every brokerage forced — between agent
                economics and client experience — Vamar was rebuilt to remove
                the trade-off.
              </p>
            </RevealOnView>
          </div>
        </div>
      </section>

      <section>
        <div className="container-x">
          <RevealOnView>
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl">
              <Image
                src={media.aboutHero}
                alt="The Vamar office: high ceilings, working tables, plants"
                fill
                priority
                sizes="100vw"
                className="object-cover"
                quality={85}
              />
            </div>
          </RevealOnView>
        </div>
      </section>

      <section className="py-24 sm:py-40">
        <div className="container-x grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-5">
            <RevealOnView>
              <div className="eyebrow mb-4">The story</div>
              <h2 className="h2 max-w-[14ch]">
                Built around the
                <br />
                people, not the units.
              </h2>
            </RevealOnView>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:pl-12 space-y-10">
            <ScrubWords className="text-2xl sm:text-3xl tracking-[-0.01em] leading-snug font-medium max-w-[36ch]">
              {`Most brokerages are organized around the listing. The listing wins the deal, the listing pays the bill. Vamar is organized around the client and the agent — because long careers and life-changing moves both need the same thing: time, patience, and a brief that gets sharper at every step.`}
            </ScrubWords>
            <ScrubWords className="text-2xl sm:text-3xl tracking-[-0.01em] leading-snug font-medium max-w-[36ch]">
              {`We close roughly four hundred sides a year. We turn down twice that. The discipline isn't in the deals we take — it's in the ones we don't.`}
            </ScrubWords>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-40 bg-[var(--ink)] text-[var(--bg)]">
        <div className="container-x">
          <RevealOnView>
            <div className="eyebrow mb-4 text-[var(--ink-faint)]">Operating principles</div>
            <h2 className="h1 max-w-[18ch]">
              What we believe
              <br />
              <span style={{ color: "var(--ink-faint)" }}>matters here.</span>
            </h2>
          </RevealOnView>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {VALUES.map((v, i) => (
              <RevealOnView
                key={v.n}
                delay={i * 0.06}
                className="border-t border-white/15 pt-8"
              >
                <div className="text-sm tracking-[0.18em] text-[var(--ink-faint)] uppercase mb-4">
                  Principle {v.n}
                </div>
                <h3 className="text-2xl sm:text-3xl tracking-[-0.02em] font-medium mb-4 max-w-[20ch]">
                  {v.title}
                </h3>
                <p className="text-[var(--ink-faint)] max-w-[36ch] leading-relaxed">
                  {v.body}
                </p>
              </RevealOnView>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-40">
        <div className="container-x">
          <RevealOnView>
            <div className="flex items-end justify-between gap-6 mb-12">
              <div>
                <div className="eyebrow mb-4">Leadership</div>
                <h2 className="h1 max-w-[14ch]">A small team that closes more than it speaks.</h2>
              </div>
              <PillButton href="/agents" variant="ghost">
                All agents
              </PillButton>
            </div>
          </RevealOnView>

          <div className="grid gap-8 md:grid-cols-3">
            {AGENTS.slice(0, 3).map((a, i) => (
              <RevealOnView key={a.slug} delay={i * 0.06}>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[var(--line)]">
                  <Image
                    src={a.photo}
                    alt={a.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 90vw"
                    className="object-cover"
                    quality={82}
                  />
                </div>
                <div className="mt-5">
                  <div className="font-medium text-lg">{a.name}</div>
                  <div className="text-sm text-[var(--ink-soft)] mt-1">{a.role}</div>
                </div>
              </RevealOnView>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
