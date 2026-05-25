"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RevealOnView } from "@/components/primitives/RevealOnView";
import { PROPERTIES, formatPrice, type Property, type PropertyMode } from "@/data/properties";
import { cn } from "@/lib/cn";

type ModeFilter = "all" | PropertyMode;
type BedsFilter = "any" | "0" | "1" | "2" | "3" | "4" | "5+";

const MODES: { label: string; value: ModeFilter }[] = [
  { label: "All", value: "all" },
  { label: "Buy", value: "sale" },
  { label: "Rent", value: "rent" },
];

const BED_OPTIONS: BedsFilter[] = ["any", "0", "1", "2", "3", "4", "5+"];

function matchesBeds(beds: number, filter: BedsFilter): boolean {
  if (filter === "any") return true;
  if (filter === "5+") return beds >= 5;
  return beds === Number(filter);
}

export function SearchListing() {
  const [mode, setMode] = useState<ModeFilter>("all");
  const [beds, setBeds] = useState<BedsFilter>("any");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PROPERTIES.filter((p) => {
      if (mode !== "all" && p.mode !== mode) return false;
      if (!matchesBeds(p.beds, beds)) return false;
      if (!needle) return true;
      return [p.title, p.neighborhood, p.city]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [mode, beds, q]);

  return (
    <section className="pt-32 sm:pt-40 pb-24">
      <div className="container-x">
        <RevealOnView>
          <div className="eyebrow mb-4">Properties</div>
          <h1
            className="display display-tight max-w-[18ch]"
            style={{ fontSize: "var(--t-h1)" }}
          >
            Find what
            <br />
            moves you.
          </h1>
          <p className="mt-6 max-w-[44ch] text-[var(--ink-soft)] text-lg">
            A handpicked slice of what&rsquo;s open right now. Toggle between
            buy and rent, narrow by bedrooms, or just type a neighborhood.
          </p>
        </RevealOnView>

        <RevealOnView className="mt-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-wrap items-end gap-6">
              <div>
                <div className="eyebrow mb-2">Mode</div>
                <div className="inline-flex rounded-full border border-[var(--line)] p-1">
                  {MODES.map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => setMode(m.value)}
                      className={cn(
                        "px-4 py-1.5 text-sm rounded-full transition-colors",
                        mode === m.value
                          ? "bg-[var(--ink)] text-[var(--bg)]"
                          : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                      )}
                      aria-pressed={mode === m.value}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="beds" className="eyebrow mb-2 block">
                  Bedrooms
                </label>
                <select
                  id="beds"
                  value={beds}
                  onChange={(e) => setBeds(e.target.value as BedsFilter)}
                  className="rounded-full border border-[var(--line)] bg-transparent px-4 py-2 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]"
                >
                  {BED_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b === "any" ? "Any" : b === "0" ? "Studio" : b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full lg:max-w-sm">
              <label htmlFor="property-search" className="eyebrow mb-2 block">
                Search
              </label>
              <input
                id="property-search"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Neighborhood, city, building…"
                className="w-full rounded-full border border-[var(--line)] bg-transparent px-5 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:outline-none focus:border-[var(--ink)]"
              />
            </div>
          </div>

          <div className="mt-6 text-sm text-[var(--ink-soft)]">
            {filtered.length} {filtered.length === 1 ? "property" : "properties"}
          </div>
        </RevealOnView>

        {filtered.length === 0 ? (
          <RevealOnView className="mt-20 text-center text-[var(--ink-soft)]">
            <p>No properties match those filters. Try widening the search.</p>
          </RevealOnView>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {filtered.map((p, i) => (
              <RevealOnView
                key={p.slug}
                from={i % 3 === 0 ? "left" : i % 3 === 1 ? "up" : "right"}
                delay={(i % 3) * 0.05}
              >
                <PropertyCard property={p} />
              </RevealOnView>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PropertyCard({ property }: { property: Property }) {
  const { photo, title, neighborhood, city, mode, beds, baths, area, tag, slug } =
    property;

  return (
    <Link
      href={`/search#${slug}`}
      className="group block"
      aria-label={`${title} — ${formatPrice(property)}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[var(--bg-elev)]">
        <Image
          src={photo}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          quality={82}
        />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-black/70 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white backdrop-blur">
            {mode === "rent" ? "For Rent" : "For Sale"}
          </span>
          {tag && (
            <span className="rounded-full bg-white/85 px-3 py-1 text-xs uppercase tracking-[0.16em] text-black backdrop-blur">
              {tag}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.16em] text-[var(--ink-soft)]">
            {neighborhood} · {city}
          </div>
          <h3 className="mt-1 text-lg font-semibold tracking-tight">
            {title}
          </h3>
        </div>
        <div className="shrink-0 text-right text-lg font-semibold tracking-tight">
          {formatPrice(property)}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 text-sm text-[var(--ink-soft)]">
        <span>{beds === 0 ? "Studio" : `${beds} bd`}</span>
        <span aria-hidden>·</span>
        <span>{baths} ba</span>
        <span aria-hidden>·</span>
        <span>{area.toLocaleString()} sqft</span>
      </div>
    </Link>
  );
}
