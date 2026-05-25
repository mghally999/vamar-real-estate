"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PillButton } from "@/components/primitives/PillButton";
import { media } from "@/lib/media";
import { cn } from "@/lib/cn";

type Track = "client" | "agent";

const CLIENT_STEPS = ["intent", "where", "budget", "contact", "review"] as const;
const AGENT_STEPS = ["intent", "experience", "region", "contact", "review"] as const;

type ClientStep = (typeof CLIENT_STEPS)[number];
type AgentStep = (typeof AGENT_STEPS)[number];

interface State {
  track: Track;
  step: number;
  intent: string;
  region: string;
  timeframe: string;
  budget: string;
  experience: string;
  speciality: string;
  name: string;
  email: string;
  phone: string;
}

const initial: State = {
  track: "client",
  step: 0,
  intent: "",
  region: "",
  timeframe: "",
  budget: "",
  experience: "",
  speciality: "",
  name: "",
  email: "",
  phone: "",
};

export function ApplyForm() {
  const [s, setS] = useState<State>(initial);
  const [submitted, setSubmitted] = useState(false);

  const steps = s.track === "client" ? CLIENT_STEPS : AGENT_STEPS;
  const current = steps[s.step];
  const total = steps.length;

  const canAdvance = useMemo(() => {
    if (s.track === "client") {
      const step = current as ClientStep;
      if (step === "intent") return !!s.intent;
      if (step === "where") return !!s.region && !!s.timeframe;
      if (step === "budget") return !!s.budget;
      if (step === "contact") return !!s.name && /.+@.+\..+/.test(s.email);
      if (step === "review") return true;
    } else {
      const step = current as AgentStep;
      if (step === "intent") return !!s.intent;
      if (step === "experience") return !!s.experience;
      if (step === "region") return !!s.region && !!s.speciality;
      if (step === "contact") return !!s.name && /.+@.+\..+/.test(s.email);
      if (step === "review") return true;
    }
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
            <div className="eyebrow mb-6">Application received</div>
            <h1 className="display display-tight" style={{ fontSize: "var(--t-h1)" }}>
              Thanks, {s.name.split(" ")[0] || "there"}.
              <br />
              <span data-faint>We&apos;ll be in touch.</span>
            </h1>
            <p className="mt-8 max-w-[44ch] text-[var(--ink-soft)] text-lg leading-relaxed">
              A real human reads every application. Expect a personal reply within
              one business day — usually the same afternoon.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <PillButton href="/" variant="ghost">Back to home</PillButton>
              <PillButton onClick={() => { setS(initial); setSubmitted(false); }}>Start another</PillButton>
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
          <div className="eyebrow mb-4">Apply</div>
          <h1 className="display display-tight" style={{ fontSize: "var(--t-h1)" }}>
            Tell us where
            <br />
            you&apos;re going.
          </h1>
          <p className="mt-6 max-w-[36ch] text-[var(--ink-soft)] leading-relaxed">
            Whether you&apos;re buying, selling or joining the team — start here.
            Five short steps, no pressure.
          </p>

          <div className="mt-10 relative inline-flex items-center bg-[var(--line)] rounded-full p-1">
            {(["client", "agent"] as Track[]).map((t) => (
              <button
                key={t}
                onClick={() => switchTrack(t)}
                className={cn(
                  "relative z-10 px-5 py-2 text-sm rounded-full transition-colors",
                  s.track === t ? "text-white" : "text-[var(--ink-soft)]"
                )}
                aria-pressed={s.track === t}
              >
                {t === "client" ? "I'm a client" : "I'm an agent"}
              </button>
            ))}
            <motion.span
              layout
              className="absolute inset-y-1 rounded-full bg-[var(--ink)]"
              style={{
                left: s.track === "client" ? 4 : "50%",
                right: s.track === "client" ? "50%" : 4,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          <div className="mt-12">
            <div className="flex items-center gap-2 mb-3">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 rounded-full transition-all",
                    i <= s.step ? "bg-[var(--ink)] w-10" : "bg-[var(--line)] w-6"
                  )}
                />
              ))}
            </div>
            <div className="text-sm text-[var(--ink-soft)]">
              Step {s.step + 1} of {total}
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
              {s.track === "client" && renderClientStep(current as ClientStep, s, setS)}
              {s.track === "agent" && renderAgentStep(current as AgentStep, s, setS)}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={prev}
              disabled={s.step === 0}
              className="text-sm text-[var(--ink-soft)] disabled:opacity-30 hover:text-[var(--ink)]"
            >
              ← Back
            </button>
            <PillButton
              onClick={next}
              disabled={!canAdvance}
              className="disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {s.step === total - 1 ? "Submit application" : "Continue"}
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderClientStep(step: ClientStep, s: State, set: (u: (p: State) => State) => void) {
  if (step === "intent") {
    return (
      <Question label="What brings you to Vamar?" eyebrow="01 · Intent">
        <ChipGroup
          options={["I'm buying", "I'm selling", "I'm renting", "I'm investing"]}
          value={s.intent}
          onChange={(v) => set((p) => ({ ...p, intent: v }))}
        />
      </Question>
    );
  }
  if (step === "where") {
    return (
      <Question label="Where and when?" eyebrow="02 · Where">
        <Field
          label="Neighborhoods or regions"
          value={s.region}
          onChange={(v) => set((p) => ({ ...p, region: v }))}
          placeholder="Downtown, Marina, Palm Jumeirah…"
        />
        <ChipGroup
          options={["This quarter", "Next 6 months", "This year", "Just exploring"]}
          value={s.timeframe}
          onChange={(v) => set((p) => ({ ...p, timeframe: v }))}
          legend="Timeframe"
        />
      </Question>
    );
  }
  if (step === "budget") {
    return (
      <Question label="What's the working budget?" eyebrow="03 · Budget">
        <ChipGroup
          options={[
            "Under AED 1.5M",
            "AED 1.5–3M",
            "AED 3–6M",
            "AED 6–12M",
            "AED 12M+",
            "Renting / monthly",
          ]}
          value={s.budget}
          onChange={(v) => set((p) => ({ ...p, budget: v }))}
        />
      </Question>
    );
  }
  if (step === "contact") {
    return (
      <Question label="How do we reach you?" eyebrow="04 · You">
        <Field label="Name" value={s.name} onChange={(v) => set((p) => ({ ...p, name: v }))} />
        <Field
          label="Email"
          type="email"
          value={s.email}
          onChange={(v) => set((p) => ({ ...p, email: v }))}
        />
        <Field
          label="Phone (optional)"
          type="tel"
          value={s.phone}
          onChange={(v) => set((p) => ({ ...p, phone: v }))}
        />
      </Question>
    );
  }
  return (
    <Question label="Looks right?" eyebrow="05 · Review">
      <ReviewRow label="Intent" value={s.intent} />
      <ReviewRow label="Region" value={s.region} />
      <ReviewRow label="Timeframe" value={s.timeframe} />
      <ReviewRow label="Budget" value={s.budget} />
      <ReviewRow label="Name" value={s.name} />
      <ReviewRow label="Email" value={s.email} />
      {s.phone && <ReviewRow label="Phone" value={s.phone} />}
    </Question>
  );
}

function renderAgentStep(step: AgentStep, s: State, set: (u: (p: State) => State) => void) {
  if (step === "intent") {
    return (
      <Question label="What kind of role are you exploring?" eyebrow="01 · Intent">
        <ChipGroup
          options={["Senior agent", "New agent", "Team lead", "Just curious"]}
          value={s.intent}
          onChange={(v) => set((p) => ({ ...p, intent: v }))}
        />
      </Question>
    );
  }
  if (step === "experience") {
    return (
      <Question label="How long have you been in real estate?" eyebrow="02 · Experience">
        <ChipGroup
          options={["< 1 year", "1–3 years", "3–7 years", "7+ years"]}
          value={s.experience}
          onChange={(v) => set((p) => ({ ...p, experience: v }))}
        />
      </Question>
    );
  }
  if (step === "region") {
    return (
      <Question label="Where do you work — and on what?" eyebrow="03 · Practice">
        <Field
          label="Primary region"
          value={s.region}
          onChange={(v) => set((p) => ({ ...p, region: v }))}
          placeholder="Marina, Downtown, Palm…"
        />
        <Field
          label="Specialty"
          value={s.speciality}
          onChange={(v) => set((p) => ({ ...p, speciality: v }))}
          placeholder="Luxury, family, off-plan, rentals…"
        />
      </Question>
    );
  }
  if (step === "contact") {
    return (
      <Question label="How do we reach you?" eyebrow="04 · You">
        <Field label="Name" value={s.name} onChange={(v) => set((p) => ({ ...p, name: v }))} />
        <Field
          label="Email"
          type="email"
          value={s.email}
          onChange={(v) => set((p) => ({ ...p, email: v }))}
        />
        <Field
          label="Phone (optional)"
          type="tel"
          value={s.phone}
          onChange={(v) => set((p) => ({ ...p, phone: v }))}
        />
      </Question>
    );
  }
  return (
    <Question label="Looks right?" eyebrow="05 · Review">
      <ReviewRow label="Role" value={s.intent} />
      <ReviewRow label="Experience" value={s.experience} />
      <ReviewRow label="Region" value={s.region} />
      <ReviewRow label="Specialty" value={s.speciality} />
      <ReviewRow label="Name" value={s.name} />
      <ReviewRow label="Email" value={s.email} />
      {s.phone && <ReviewRow label="Phone" value={s.phone} />}
    </Question>
  );
}

function Question({
  label,
  eyebrow,
  children,
}: {
  label: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="eyebrow mb-4">{eyebrow}</div>
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

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-[var(--line)] py-4">
      <span className="text-sm uppercase tracking-[0.18em] text-[var(--ink-soft)]">
        {label}
      </span>
      <span className="text-lg text-right max-w-[60%]">{value || "—"}</span>
    </div>
  );
}
