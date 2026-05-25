"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  id: string;
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  /** Allow only one open at a time (default true) */
  single?: boolean;
}

export function Accordion({ items, className, single = true }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      return single ? [id] : [...prev, id];
    });
  };

  return (
    <ul className={cn("divide-y divide-[var(--line)]", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <li key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`acc-panel-${item.id}`}
                id={`acc-trigger-${item.id}`}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                <span className="text-xl sm:text-2xl font-medium tracking-[-0.01em] text-[var(--ink)]">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className="relative grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-colors group-hover:border-[var(--ink)]"
                >
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="block leading-none text-lg"
                  >
                    +
                  </motion.span>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`acc-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`acc-trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pr-12 text-[var(--ink-soft)] leading-relaxed text-[var(--t-body)] max-w-[64ch]">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
