"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import type { Dictionary } from "@/lib/getDictionary";
import type { Locale } from "@/lib/i18n-config";

type Dict = Dictionary["team"];
type FoundersDict = Dictionary["founders"];

export function AgentsListing({
  dict,
  founders,
  locale,
}: {
  dict: Dict;
  founders: FoundersDict;
  locale: Locale;
}) {
  const [q, setQ] = useState("");
  const members = founders.members;

  const filtered = q.trim()
    ? members.filter((m) =>
        [m.name, m.role].join(" ").toLowerCase().includes(q.trim().toLowerCase())
      )
    : members;

  return (
    <section className="pt-32 sm:pt-40 pb-24">
      <div className="container-x">
        <RevealOnView>
          <div className="eyebrow mb-4">{dict.eyebrow}</div>
          <h1
            className="display display-tight max-w-[18ch]"
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

        <div className="mt-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="relative w-full sm:max-w-md">
            <label htmlFor="agent-search" className="eyebrow mb-2 block">
              {dict.searchLabel}
            </label>
            <input
              id="agent-search"
              type="search"
              placeholder={dict.searchPlaceholder}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full border-b border-[var(--ink)] bg-transparent py-3 text-lg outline-none focus:border-[var(--ink)] placeholder:text-[var(--ink-faint)]"
            />
          </div>
          <div className="text-sm text-[var(--ink-soft)]">
            {filtered.length}{" "}
            {filtered.length === 1
              ? dict.memberCountSingle
              : dict.memberCountPlural}
          </div>
        </div>

        <div className="mt-16 grid gap-10 sm:gap-12 md:grid-cols-2">
          {filtered.map((m, i) => (
            <motion.article
              key={m.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/${locale}/agents/${m.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[var(--accent)]/20 grid place-items-center">
                  <span className="text-[6rem] font-bold text-[var(--accent)] group-hover:scale-110 transition-transform duration-700">
                    {m.name.charAt(0)}
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-medium tracking-[-0.01em]">
                      {m.name}
                    </h2>
                    <div className="text-sm text-[var(--ink-soft)] mt-1">
                      {m.role}
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] group-hover:border-[var(--ink)] transition"
                  >
                    &rarr;
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-[var(--ink-soft)]">
            &mdash;
          </div>
        )}

        <RevealOnView className="mt-20 text-center">
          <p className="text-[var(--ink-soft)] text-lg">{dict.more}</p>
        </RevealOnView>
      </div>
    </section>
  );
}
