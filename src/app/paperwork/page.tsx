import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import { PillButton } from "@/components/primitives/PillButton";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Paperwork",
  description:
    "Common forms and documents for clients and agents — buyers, sellers, renters and team.",
};

const SECTIONS = [
  {
    title: "Buyers",
    items: [
      { label: "Buyer Representation Agreement", time: "8 min" },
      { label: "Pre-Approval Authorization", time: "3 min" },
      { label: "Offer to Purchase — Template", time: "—" },
      { label: "Disclosures Acknowledgment", time: "5 min" },
    ],
  },
  {
    title: "Sellers",
    items: [
      { label: "Listing Agreement", time: "10 min" },
      { label: "Seller's Disclosure", time: "12 min" },
      { label: "Photography & Staging Brief", time: "—" },
      { label: "Counter-Offer Form", time: "5 min" },
    ],
  },
  {
    title: "Renters & Landlords",
    items: [
      { label: "Rental Application", time: "6 min" },
      { label: "Standard Lease — UAE", time: "12 min" },
      { label: "Move-In Condition Report", time: "—" },
      { label: "Property Management Authorization", time: "8 min" },
    ],
  },
  {
    title: "Agents",
    items: [
      { label: "Independent Contractor Agreement", time: "15 min" },
      { label: "Commission Split Schedule", time: "—" },
      { label: "Lead Distribution Policy", time: "—" },
      { label: "Onboarding Checklist", time: "—" },
    ],
  },
];

export default function PaperworkPage() {
  return (
    <>
      <section className="pt-32 sm:pt-40 pb-16">
        <div className="container-x grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-7">
            <RevealOnView>
              <div className="eyebrow mb-6">Paperwork</div>
              <h1 className="display display-tight" style={{ fontSize: "var(--t-h1)" }}>
                Everything,
                <br />
                <span data-faint>signed and clear.</span>
              </h1>
            </RevealOnView>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:pt-6">
            <RevealOnView>
              <p className="text-lg text-[var(--ink-soft)] leading-relaxed max-w-[44ch]">
                The forms you&apos;ll see at every stage. Click for a preview,
                ask your agent for a personalized copy. We keep paperwork legible
                — short sentences, no surprises at closing.
              </p>
            </RevealOnView>
          </div>
        </div>
      </section>

      <section>
        <div className="container-x">
          <RevealOnView>
            <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl">
              <Image
                src={media.paperHero}
                alt="Clean desktop with a laptop and a glass of water"
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

      <section className="py-24 sm:py-32">
        <div className="container-x">
          <div className="grid gap-12 md:grid-cols-2">
            {SECTIONS.map((section, sIdx) => (
              <RevealOnView key={section.title} delay={sIdx * 0.05}>
                <div className="flex items-end justify-between mb-6">
                  <h2 className="h2">{section.title}</h2>
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                    {section.items.length} docs
                  </span>
                </div>
                <ul className="divide-y divide-[var(--line)] border-t border-[var(--line)]">
                  {section.items.map((it) => (
                    <li key={it.label}>
                      <Link
                        href="#"
                        className="group flex items-center justify-between gap-4 py-5"
                      >
                        <span className="text-lg sm:text-xl tracking-[-0.01em]">
                          {it.label}
                        </span>
                        <span className="flex items-center gap-4 text-sm text-[var(--ink-soft)]">
                          <span>{it.time}</span>
                          <span
                            aria-hidden
                            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] group-hover:border-[var(--ink)] transition"
                          >
                            ↗
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </RevealOnView>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-[var(--ink)] text-[var(--bg)]">
        <div className="container-x grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-7">
            <RevealOnView>
              <div className="eyebrow mb-4 text-[var(--ink-faint)]">Don&apos;t see it?</div>
              <h2 className="display display-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                Ask your agent.
                <br />
                <span style={{ color: "var(--ink-faint)" }}>They&apos;ll send it.</span>
              </h2>
            </RevealOnView>
          </div>
          <div className="col-span-12 lg:col-span-5 self-end">
            <RevealOnView>
              <p className="text-[var(--ink-faint)] mb-8 max-w-[36ch]">
                We have a longer library of jurisdiction-specific forms internally —
                drop a note and your agent will send what fits your move.
              </p>
              <PillButton
                href="/apply"
                variant="outline"
                className="!bg-white !text-[var(--ink)] !border-white hover:!bg-transparent hover:!text-white"
              >
                Request a form
              </PillButton>
            </RevealOnView>
          </div>
        </div>
      </section>
    </>
  );
}
