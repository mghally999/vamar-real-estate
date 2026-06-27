import { cn } from "@/lib/cn";

/**
 * Vamar logo — the brand "V" monogram (inline SVG) stands in for the letter V,
 * followed by "AMAR" rendered as real text, so it reads VAMAR with no clipping
 * and no trailing whitespace. Size it with a font-size utility (e.g. text-3xl);
 * colour follows currentColor / the parent text colour.
 */
export function VamarLogo({
  withSubtitle = true,
  className,
}: {
  withSubtitle?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex flex-col leading-none select-none", className)}>
      <span
        className="inline-flex items-end"
        style={{ fontWeight: 700, letterSpacing: "0.04em", fontFamily: "var(--font-display)" }}
      >
        <svg
          viewBox="3 2 36 43"
          fill="none"
          aria-hidden="true"
          style={{
            height: "1em",
            width: "auto",
            marginRight: "0.02em",
            marginBottom: "0.12em",
            display: "block",
          }}
        >
          <g
            stroke="currentColor"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <path d="M3 5 L21 44 L39 5" />
            <path d="M12 3 L21 24 L30 3" />
          </g>
        </svg>
        <span>AMAR</span>
      </span>

      {withSubtitle && (
        <span
          style={{
            fontSize: "0.2em",
            letterSpacing: "0.42em",
            opacity: 0.7,
            fontWeight: 500,
            marginTop: "0.55em",
            fontFamily: "var(--font-display)",
          }}
        >
          REAL ESTATE
        </span>
      )}
    </span>
  );
}
