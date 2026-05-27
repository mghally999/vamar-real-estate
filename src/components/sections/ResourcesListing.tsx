"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import { ARTICLES, type Article } from "@/data/resources";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/getDictionary";
import type { Locale } from "@/lib/i18n-config";

type Dict = Dictionary["resources"];

const ALL_TAGS = Array.from(new Set(ARTICLES.flatMap((a) => a.tags))).sort();

export function ResourcesListing({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeTag) return ARTICLES;
    return ARTICLES.filter((a) => a.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <section className="pt-32 sm:pt-40 pb-24">
      <div className="container-x">
        <RevealOnView>
          <div className="eyebrow mb-4">{dict.eyebrow}</div>
          <h1
            className="display display-tight max-w-[20ch]"
            style={{ fontSize: "var(--t-h1)" }}
          >
            {dict.title[0]}
            <br />
            {dict.title[1]}
          </h1>
          <p className="mt-6 max-w-[44ch] text-[var(--ink-soft)] text-lg">
            {dict.intro}
          </p>
        </RevealOnView>

        <RevealOnView className="mt-12">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                activeTag === null
                  ? "bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]"
                  : "border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
              )}
              aria-pressed={activeTag === null}
            >
              {dict.allTagsLabel}
            </button>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm transition-colors",
                  activeTag === tag
                    ? "bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]"
                    : "border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
                )}
                aria-pressed={activeTag === tag}
              >
                {tag}
              </button>
            ))}
          </div>
        </RevealOnView>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
          {filtered.map((article, i) => (
            <RevealOnView
              key={article.slug}
              from={i % 3 === 0 ? "left" : i % 3 === 1 ? "up" : "right"}
              delay={(i % 3) * 0.05}
            >
              <ArticleCard article={article} locale={locale} readMore={dict.readMore} />
            </RevealOnView>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticleCard({
  article,
  locale,
  readMore,
}: {
  article: Article;
  locale: Locale;
  readMore: string;
}) {
  const { hero, title, eyebrow, excerpt, date, readTime, slug } = article;

  return (
    <Link href={`/${locale}/resources/${slug}`} className="group block">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--bg-elev)]">
        <Image
          src={hero}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          quality={82}
        />
      </div>

      <div className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-[var(--ink-soft)]">
        <span>{eyebrow}</span>
        <span aria-hidden>&middot;</span>
        <span>{readTime}</span>
      </div>

      <h3 className="mt-3 text-2xl font-semibold tracking-tight leading-[1.15] max-w-[22ch] group-hover:text-[var(--ink-soft)] transition-colors">
        {title}
      </h3>

      <p className="mt-3 text-[var(--ink-soft)] leading-relaxed max-w-[42ch]">
        {excerpt}
      </p>

      <div className="mt-4 text-xs uppercase tracking-[0.16em] text-[var(--ink-faint)]">
        {date}
      </div>
    </Link>
  );
}
