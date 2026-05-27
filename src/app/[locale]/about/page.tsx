import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import { PillButton } from "@/components/primitives/PillButton";
import { ScrubWords } from "@/components/primitives/ScrubWords";
import { media } from "@/lib/media";
import { getDictionary } from "@/lib/getDictionary";
import { isLocale, type Locale } from "@/lib/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const d = dict.about;

  return (
    <>
      <section className="pt-32 sm:pt-40 pb-24">
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
                <br />
                {d.title[2]}
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
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl">
              <Image
                src={media.aboutHero}
                alt=""
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
              <div className="eyebrow mb-4">{d.storyEyebrow}</div>
              <h2 className="h2 max-w-[14ch]">
                {d.storyTitle[0]}
                <br />
                {d.storyTitle[1]}
              </h2>
            </RevealOnView>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:ps-12 space-y-10">
            {d.storyParagraphs.map((p, i) => (
              <ScrubWords
                key={i}
                className="text-2xl sm:text-3xl tracking-[-0.01em] leading-snug font-medium max-w-[36ch]"
              >
                {p}
              </ScrubWords>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-40 bg-[var(--ink)] text-[var(--bg)]">
        <div className="container-x">
          <RevealOnView>
            <div className="eyebrow mb-4 text-[var(--ink-faint)]">
              {d.principlesEyebrow}
            </div>
            <h2 className="h1 max-w-[18ch]">
              {d.principlesTitle[0]}
              <br />
              <span style={{ color: "var(--ink-faint)" }}>
                {d.principlesTitle[1]}
              </span>
            </h2>
          </RevealOnView>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {d.principles.map((v, i) => (
              <RevealOnView
                key={v.n}
                delay={i * 0.06}
                className="border-t border-white/15 pt-8"
              >
                <div className="text-sm tracking-[0.18em] text-[var(--ink-faint)] uppercase mb-4">
                  {v.n}
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
                <div className="eyebrow mb-4">{d.leadershipEyebrow}</div>
                <h2 className="h1 max-w-[18ch]">
                  {d.leadershipTitle[0]}
                  <br />
                  {d.leadershipTitle[1]}
                </h2>
              </div>
              <PillButton href={`/${locale}/agents`} variant="ghost">
                {d.leadershipCta}
              </PillButton>
            </div>
          </RevealOnView>

          <div className="grid gap-8 md:grid-cols-2">
            {dict.founders.members.map((m, i) => (
              <RevealOnView key={m.slug} delay={i * 0.06}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-16 w-16 rounded-full bg-[var(--accent)] grid place-items-center text-white font-semibold text-2xl shrink-0">
                    {m.name.charAt(0)}
                  </span>
                  <div>
                    <div className="font-medium text-lg">{m.name}</div>
                    <div className="text-sm text-[var(--ink-soft)] mt-1">
                      {m.role}
                    </div>
                  </div>
                </div>
                <p className="text-[var(--ink-soft)] leading-relaxed max-w-[44ch]">
                  {m.bio}
                </p>
              </RevealOnView>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
