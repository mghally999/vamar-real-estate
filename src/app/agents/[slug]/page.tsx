import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary } from "@/lib/getDictionary";
import { PillButton } from "@/components/primitives/PillButton";
import { RevealOnView } from "@/components/primitives/RevealOnView";

export function generateStaticParams() {
  return [
    { slug: "abdullah-al-naqbi" },
    { slug: "salem-bin-touq" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dict = await getDictionary();
  const member = dict.founders.members.find((m) => m.slug === slug);
  if (!member) return { title: "Team" };
  return {
    title: member.name,
    description: member.bio.slice(0, 160),
  };
}

export default async function FounderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dict = await getDictionary();
  const member = dict.founders.members.find((m) => m.slug === slug);
  if (!member) notFound();

  const other = dict.founders.members.find((m) => m.slug !== slug);

  return (
    <section className="pt-28 sm:pt-32 pb-24">
      <div className="container-x">
        <Link
          href={`/agents`}
          className="text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] inline-flex items-center gap-2"
        >
          &larr; {dict.team.back}
        </Link>

        <div className="mt-10 grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-5">
            <RevealOnView>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[var(--accent)]/20 grid place-items-center">
                <span className="text-[8rem] font-bold text-[var(--accent)]">
                  {member.name.charAt(0)}
                </span>
              </div>
            </RevealOnView>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:ps-8">
            <RevealOnView>
              <div className="eyebrow mb-4">{member.role}</div>
              <h1
                className="display display-tight max-w-[14ch]"
                style={{ fontSize: "var(--t-h1)" }}
              >
                {member.name}
              </h1>
              <p className="mt-8 text-xl text-[var(--ink-soft)] max-w-[44ch] leading-relaxed">
                {member.bio}
              </p>

              <blockquote className="mt-10 border-s-4 border-[var(--accent)] ps-6 text-lg italic text-[var(--ink-soft)] max-w-[44ch] leading-relaxed">
                &ldquo;{member.quote}&rdquo;
              </blockquote>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <PillButton href={`/apply`}>
                  {dict.signoff.ctaPrimary}
                </PillButton>
              </div>
            </RevealOnView>
          </div>
        </div>

        {other && (
          <div className="mt-28 sm:mt-40">
            <RevealOnView>
              <div className="mb-10">
                <div className="eyebrow mb-3">{dict.founders.eyebrow}</div>
                <h2 className="h2 max-w-[18ch]">{other.name}</h2>
              </div>
            </RevealOnView>

            <RevealOnView>
              <Link
                href={`/agents/${other.slug}`}
                className="group block border-t border-[var(--line)] pt-8"
              >
                <div className="flex items-center gap-4">
                  <span className="h-14 w-14 rounded-full bg-[var(--accent)] grid place-items-center text-white font-semibold text-xl shrink-0">
                    {other.name.charAt(0)}
                  </span>
                  <div>
                    <div className="font-medium text-lg">{other.name}</div>
                    <div className="text-sm text-[var(--ink-soft)]">
                      {other.role}
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="ms-auto text-[var(--ink-soft)] group-hover:text-[var(--ink)] transition"
                  >
                    &rarr;
                  </span>
                </div>
              </Link>
            </RevealOnView>
          </div>
        )}
      </div>
    </section>
  );
}
