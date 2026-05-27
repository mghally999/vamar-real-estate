"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PillButton } from "@/components/primitives/PillButton";
import { media } from "@/lib/media";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/getDictionary";
import type { Locale } from "@/lib/i18n-config";

type Dict = Dictionary["apply"];
type Track = "owner" | "investor";

const STEPS = ["intent", "area", "value", "contact"] as const;
type Step = (typeof STEPS)[number];

interface State {
  track: Track;
  step: number;
  intent: string;
  area: string;
  value: string;
  timeframe: string;
  name: string;
  email: string;
  phone: string;
}

const initial: State = {
  track: "owner",
  step: 0,
  intent: "",
  area: "",
  value: "",
  timeframe: "",
  name: "",
  email: "",
  phone: "",
};

export function ApplyForm({ dict, locale }: { dict: Dict; locale: Locale }) {
  const [s, setS] = useState<State>(initial);
  const [submitted, setSubmitted] = useState(false);

  const current = STEPS[s.step];
  const total = STEPS.length;

  const canAdvance = useMemo(() => {
    if (current === "intent") return !!s.intent;
    if (current === "area") return !!s.area && !!s.timeframe;
    if (current === "value") return !!s.value;
    if (current === "contact") return !!s.name && /.+@.+\..+/.test(s.email);
    return false;
  }, [s, current]);

  const next = () => {
    if (!canAdvance) return;
    if (s.step === total - 1) {
      setSubmitted(true);
      return;
    }
    setS((p) => ({ ...p, step: p.step + 1 }));
  };
  const prev = () => setS((p) => ({ ...p, step: Math.max(0, p.step - 1) }));

  const switchTrack = (t: Track) => {
    setS({ ...initial, track: t });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <section className="pt-32 sm:pt-40 pb-24">
        <div className="container-x grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
            <div className="eyebrow mb-6">&nbsp;</div>
            <h1
              className="display display-tight"
              style={{ fontSize: "var(--t-h1)" }}
            >
              {dict.sentTitle}
            </h1>
            <p className="mt-8 max-w-[44ch] text-[var(--ink-soft)] text-lg leading-relaxed">
              {dict.sentBody}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <PillButton href={`/${locale}`} variant="ghost">
                &larr;
              </PillButton>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <Image
                src={media.applyHero}
                alt=""
                aria-hidden
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                quality={85}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 sm:pt-40 pb-24">
      <div className="container-x grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32 self-start">
          <div className="eyebrow mb-4">{dict.metaTitle}</div>
          <h1
            className="display display-tight"
            style={{ fontSize: "var(--t-h1)" }}
          >
            {dict.metaTitle}
          </h1>

          <div className="mt-10 relative inline-flex items-center bg-[var(--line)] rounded-full p-1">
            {(["owner", "investor"] as Track[]).map((t) => (
              <button
                key={t}
                onClick={() => switchTrack(t)}
                className={cn(
                  "relative z-10 px-5 py-2 text-sm rounded-full transition-colors",
                  s.track === t ? "text-white" : "text-[var(--ink-soft)]"
                )}
                aria-pressed={s.track === t}
              >
                {t === "owner" ? dict.trackOwner : dict.trackInvestor}
              </button>
            ))}
            <motion.span
              layout
              className="absolute inset-y-1 rounded-full bg-[var(--ink)]"
              style={{
                left: s.track === "owner" ? 4 : "50%",
                right: s.track === "owner" ? "50%" : 4,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          <div className="mt-12">
            <div className="flex items-center gap-2 mb-3">
              {STEPS.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 rounded-full transition-all",
                    i <= s.step
                      ? "bg-[var(--ink)] w-10"
                      : "bg-[var(--line)] w-6"
                  )}
                />
              ))}
            </div>
            <div className="text-sm text-[var(--ink-soft)]">
              {s.step + 1} / {total}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${s.track}-${current}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-[420px]"
            >
              {current === "intent" && (
                <Question
                  label={
                    s.track === "owner"
                      ? dict.intentLabelOwner
                      : dict.intentLabelInvestor
                  }
                >
                  <ChipGroup
                    options={dict.intentOptions}
                    value={s.intent}
                    onChange={(v) => setS((p) => ({ ...p, intent: v }))}
                  />
                </Question>
              )}
              {current === "area" && (
                <Question label={dict.areaLabel}>
                  <Field
                    label={dict.areaLabel}
                    value={s.area}
                    onChange={(v) => setS((p) => ({ ...p, area: v }))}
                    placeholder={dict.areaPlaceholder}
                  />
                  <ChipGroup
                    options={dict.timeframeOptions}
                    value={s.timeframe}
                    onChange={(v) => setS((p) => ({ ...p, timeframe: v }))}
                    legend={dict.timeframeLabel}
                  />
                </Question>
              )}
              {current === "value" && (
                <Question label={dict.valueLabel}>
                  <ChipGroup
                    options={dict.valueOptions}
                    value={s.value}
                    onChange={(v) => setS((p) => ({ ...p, value: v }))}
                  />
                </Question>
              )}
              {current === "contact" && (
                <Question label={dict.nameLabel}>
                  <Field
                    label={dict.nameLabel}
                    value={s.name}
                    onChange={(v) => setS((p) => ({ ...p, name: v }))}
                  />
                  <Field
                    label={dict.emailLabel}
                    type="email"
                    value={s.email}
                    onChange={(v) => setS((p) => ({ ...p, email: v }))}
                  />
                  <Field
                    label={dict.phoneLabel}
                    type="tel"
                    value={s.phone}
                    onChange={(v) => setS((p) => ({ ...p, phone: v }))}
                  />
                </Question>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={prev}
              disabled={s.step === 0}
              className="text-sm text-[var(--ink-soft)] disabled:opacity-30 hover:text-[var(--ink)]"
            >
              {dict.back}
            </button>
            <PillButton
              onClick={next}
              disabled={!canAdvance}
              className="disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {s.step === total - 1 ? dict.submit : dict.next}
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Question({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="h2 max-w-[20ch] mb-10">{label}</h2>
      <div className="space-y-8">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  const id = `f-${label.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-b border-[var(--line)] bg-transparent py-3 text-lg outline-none focus:border-[var(--ink)] placeholder:text-[var(--ink-faint)]"
      />
    </div>
  );
}

function ChipGroup({
  options,
  value,
  onChange,
  legend,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  legend?: string;
}) {
  return (
    <fieldset>
      {legend && <legend className="eyebrow mb-3">{legend}</legend>}
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(o)}
              aria-pressed={active}
              className={cn(
                "px-4 py-2.5 rounded-full text-sm border transition",
                active
                  ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                  : "bg-transparent text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]"
              )}
            >
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
