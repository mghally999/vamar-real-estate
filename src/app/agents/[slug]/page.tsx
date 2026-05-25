import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AGENTS, getAgentBySlug } from "@/data/agents";
import { PillButton } from "@/components/primitives/PillButton";
import { RevealOnView } from "@/components/primitives/RevealOnView";

export function generateStaticParams() {
  return AGENTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/agents/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const agent = getAgentBySlug(slug);
  if (!agent) return { title: "Agent" };
  return {
    title: agent.name,
    description: `${agent.name} — ${agent.role} at Vamar Real Estate, specializing in ${agent.specialty} (${agent.region}).`,
  };
}

export default async function AgentPage(props: PageProps<"/agents/[slug]">) {
  const { slug } = await props.params;
  const agent = getAgentBySlug(slug);
  if (!agent) notFound();

  const others = AGENTS.filter((a) => a.slug !== agent.slug).slice(0, 3);

  return (
    <section className="pt-28 sm:pt-32 pb-24">
      <div className="container-x">
        <Link
          href="/agents"
          className="text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] inline-flex items-center gap-2"
        >
          ← All agents
        </Link>

        <div className="mt-10 grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-5">
            <RevealOnView>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[var(--line)]">
                <Image
                  src={agent.photo}
                  alt={agent.name}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                  priority
                  quality={86}
                />
              </div>
            </RevealOnView>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:pl-8">
            <RevealOnView>
              <div className="eyebrow mb-4">
                {agent.role} · {agent.region}
              </div>
              <h1 className="display display-tight max-w-[14ch]" style={{ fontSize: "var(--t-h1)" }}>
                {agent.name}
              </h1>
              <p className="mt-8 text-xl text-[var(--ink-soft)] max-w-[44ch] leading-relaxed">
                {agent.bio}
              </p>

              <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-[var(--line)] pt-8">
                <div>
                  <dt className="eyebrow mb-2">Specialty</dt>
                  <dd className="text-lg">{agent.specialty}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2">Experience</dt>
                  <dd className="text-lg">{agent.yearsExperience}y</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2">Closed</dt>
                  <dd className="text-lg">{agent.closedDeals}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2">Languages</dt>
                  <dd className="text-lg">{agent.languages.join(", ")}</dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <PillButton href={`mailto:${agent.email}`}>Email {agent.name.split(" ")[0]}</PillButton>
                <PillButton href={`tel:${agent.phone.replace(/\s/g, "")}`} variant="ghost">
                  {agent.phone}
                </PillButton>
                {agent.socials.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    className="text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] underline-offset-4 hover:underline"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </RevealOnView>
          </div>
        </div>

        <div className="mt-28 sm:mt-40">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <div className="eyebrow mb-3">Other agents</div>
              <h2 className="h2 max-w-[18ch]">Specialists, one region each.</h2>
            </div>
            <PillButton href="/agents" variant="ghost">All agents</PillButton>
          </div>

          <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
            {others.map((a) => (
              <Link key={a.slug} href={`/agents/${a.slug}`} className="group">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[var(--line)]">
                  <Image
                    src={a.photo}
                    alt={a.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={80}
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-sm text-[var(--ink-soft)]">
                      {a.role} · {a.region}
                    </div>
                  </div>
                  <span aria-hidden className="text-[var(--ink-soft)] group-hover:text-[var(--ink)] transition">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
