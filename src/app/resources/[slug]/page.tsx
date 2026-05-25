import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ARTICLES, getArticleBySlug } from "@/data/resources";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import { PillButton } from "@/components/primitives/PillButton";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/resources/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage(
  props: PageProps<"/resources/[slug]">
) {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article className="pt-32 sm:pt-40 pb-24">
      <div className="container-x">
        <RevealOnView className="max-w-[64ch] mx-auto">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-[var(--ink-soft)] mb-6">
            <Link
              href="/resources"
              className="hover:text-[var(--ink)] transition-colors"
            >
              Resources
            </Link>
            <span aria-hidden>·</span>
            <span>{article.eyebrow}</span>
            <span aria-hidden>·</span>
            <span>{article.readTime}</span>
          </div>

          <h1
            className="display display-tight max-w-[22ch]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            {article.title}
          </h1>

          <p className="mt-6 text-xl text-[var(--ink-soft)] leading-relaxed max-w-[60ch]">
            {article.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-[var(--ink-faint)]">
            <span>{article.date}</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--line)] px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </RevealOnView>

        <RevealOnView className="mt-14 max-w-5xl mx-auto">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[var(--bg-elev)]">
            <Image
              src={article.hero}
              alt={article.title}
              fill
              priority
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover"
              quality={85}
            />
          </div>
        </RevealOnView>

        <div className="mt-16 max-w-[64ch] mx-auto flex flex-col gap-10">
          {article.body.map((section, i) => (
            <RevealOnView key={i}>
              {section.heading && (
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] mb-4">
                  {section.heading}
                </h2>
              )}
              <div className="flex flex-col gap-5">
                {section.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="text-lg leading-[1.65] text-[var(--ink)]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </RevealOnView>
          ))}
        </div>

        <RevealOnView className="mt-20 max-w-[64ch] mx-auto border-t border-[var(--line)] pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="eyebrow mb-2">Want a second opinion?</div>
              <p className="text-lg max-w-[40ch]">
                Talk to a senior Vamar agent. No script, no chatbot — same
                business day.
              </p>
            </div>
            <PillButton href="/apply" variant="dark" arrow="right">
              Start a conversation
            </PillButton>
          </div>
        </RevealOnView>

        {related.length > 0 && (
          <div className="mt-24">
            <RevealOnView>
              <div className="flex items-end justify-between gap-6 mb-10">
                <div>
                  <div className="eyebrow mb-3">Keep reading</div>
                  <h2 className="h2 max-w-[18ch]">More from the desk.</h2>
                </div>
                <Link
                  href="/resources"
                  className="hidden sm:inline text-sm tracking-[-0.01em] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
                >
                  All resources →
                </Link>
              </div>
            </RevealOnView>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {related.map((a, i) => (
                <RevealOnView
                  key={a.slug}
                  from={i === 0 ? "left" : i === 1 ? "up" : "right"}
                  delay={i * 0.05}
                >
                  <Link href={`/resources/${a.slug}`} className="group block">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--bg-elev)]">
                      <Image
                        src={a.hero}
                        alt={a.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        quality={80}
                      />
                    </div>
                    <div className="mt-4 text-xs uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                      {a.eyebrow} · {a.readTime}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight leading-[1.2]">
                      {a.title}
                    </h3>
                  </Link>
                </RevealOnView>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
