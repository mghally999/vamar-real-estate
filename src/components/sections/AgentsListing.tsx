"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AGENTS } from "@/data/agents";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import { cn } from "@/lib/cn";

const PAGE_SIZE = 6;

export function AgentsListing() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return AGENTS;
    return AGENTS.filter((a) =>
      [a.name, a.role, a.region, a.specialty]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [q]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages - 1);
  const slice = filtered.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE
  );

  return (
    <section className="pt-32 sm:pt-40 pb-24">
      <div className="container-x">
        <RevealOnView>
          <div className="eyebrow mb-4">The agents</div>
          <h1
            className="display display-tight max-w-[18ch]"
            style={{ fontSize: "var(--t-h1)" }}
          >
            Specialists, not
            <br />
            generalists.
          </h1>
          <p className="mt-6 max-w-[44ch] text-[var(--ink-soft)] text-lg">
            Every Vamar agent works one region and one stage of life. Search by
            neighborhood, language or specialty.
          </p>
        </RevealOnView>

        <div className="mt-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="relative w-full sm:max-w-md">
            <label htmlFor="agent-search" className="eyebrow mb-2 block">
              Search
            </label>
            <input
              id="agent-search"
              type="search"
              placeholder="Try 'Marina' or 'investment'"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(0);
              }}
              className="w-full border-b border-[var(--ink)] bg-transparent py-3 text-lg outline-none focus:border-[var(--ink)] placeholder:text-[var(--ink-faint)]"
            />
          </div>
          <div className="text-sm text-[var(--ink-soft)]">
            {filtered.length} {filtered.length === 1 ? "agent" : "agents"}
          </div>
        </div>

        <div className="mt-16 grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {slice.map((a, i) => (
            <motion.article
              key={a.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/agents/${a.slug}`} className="group block">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[var(--line)]">
                  <Image
                    src={a.photo}
                    alt={a.name}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={82}
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white text-xs uppercase tracking-[0.18em]">
                    <span>{a.region}</span>
                    <span>{a.yearsExperience}y</span>
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-medium tracking-[-0.01em]">
                      {a.name}
                    </h2>
                    <div className="text-sm text-[var(--ink-soft)] mt-1">
                      {a.role} · {a.specialty}
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] group-hover:border-[var(--ink)] transition"
                  >
                    →
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-[var(--ink-soft)]">
            No agents match &ldquo;{q}&rdquo;. Try a broader term.
          </div>
        )}

        {pages > 1 && (
          <div className="mt-20 flex items-center justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === safePage}
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full border text-sm transition",
                  i === safePage
                    ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                    : "border-[var(--line)] hover:border-[var(--ink)]"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
