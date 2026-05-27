import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import { PillButton } from "@/components/primitives/PillButton";
import { media } from "@/lib/media";
import { getDictionary } from "@/lib/getDictionary";
import { isLocale } from "@/lib/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.paperwork.metaTitle,
    description: dict.paperwork.metaDescription,
  };
}

export default async function PaperworkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const d = dict.paperwork;

  return (
    <>
      <section className="pt-32 sm:pt-40 pb-16">
        <div className="container-x grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-7">
            <RevealOnView>
              <div className="eyebrow mb-6">{d.eyebrow}</div>
              <h1
                className="display display-tight"
                style={{ fontSize: "var(--t-h1)" }}
              >
                {d.title[0]}
                <br />
                <span data-faint>{d.title[1]}</span>
              </h1>
            </RevealOnView>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:pt-6">
            <RevealOnView>
              <p className="text-lg text-[var(--ink-soft)] leading-relaxed max-w-[44ch]">
                {d.intro}
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
                alt={d.imageAlt}
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
            {d.sections.map((section, sIdx) => (
              <RevealOnView key={section.title} delay={sIdx * 0.05}>
                <div className="flex items-end justify-between mb-6">
                  <h2 className="h2">{section.title}</h2>
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                    {section.docs.length}
                  </span>
                </div>
                <ul className="divide-y divide-[var(--line)] border-t border-[var(--line)]">
                  {section.docs.map((doc) => (
                    <li key={doc.label} className="py-5">
                      <div className="text-lg sm:text-xl tracking-[-0.01em]">
                        {doc.label}
                      </div>
                      <div className="mt-1 text-sm text-[var(--ink-soft)]">
                        {doc.note}
                      </div>
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
              <div className="eyebrow mb-4 text-[var(--ink-faint)]">
                {d.ctaEyebrow}
              </div>
              <h2
                className="display display-tight"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                {d.ctaTitle[0]}
                <br />
                <span style={{ color: "var(--ink-faint)" }}>
                  {d.ctaTitle[1]}
                </span>
              </h2>
            </RevealOnView>
          </div>
          <div className="col-span-12 lg:col-span-5 self-end">
            <RevealOnView>
              <p className="text-[var(--ink-faint)] mb-8 max-w-[36ch]">
                {d.ctaBody}
              </p>
              <PillButton
                href={`/${locale}/apply`}
                variant="outline"
                className="!bg-white !text-[var(--ink)] !border-white hover:!bg-transparent hover:!text-white"
              >
                {d.ctaButton}
              </PillButton>
            </RevealOnView>
          </div>
        </div>
      </section>
    </>
  );
}
