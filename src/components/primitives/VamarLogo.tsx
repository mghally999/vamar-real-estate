import { SVGProps } from "react";

/**
 * Vamar wordmark — stylized "V" monogram + VAMAR caps + REAL ESTATE subtitle.
 * Fills with currentColor so the parent's text color drives it (theme-aware
 * via --ink in light/dark themes, or any explicit text-[…] override).
 */
export function VamarLogo({
  withSubtitle = true,
  ...props
}: SVGProps<SVGSVGElement> & { withSubtitle?: boolean }) {
  return (
    <svg
      viewBox={withSubtitle ? "0 0 360 130" : "0 0 360 96"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* V monogram — two thin strokes forming an open wedge */}
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none">
        <line x1="10" y1="20" x2="40" y2="78" />
        <line x1="36" y1="20" x2="48" y2="48" />
      </g>

      {/* VAMAR wordmark */}
      <text
        x="62"
        y="68"
        fontFamily="'Lato','Helvetica Neue',Arial,sans-serif"
        fontSize="60"
        fontWeight="700"
        letterSpacing="10"
        fill="currentColor"
      >
        VAMAR
      </text>

      {withSubtitle && (
        <text
          x="62"
          y="106"
          fontFamily="'Lato','Helvetica Neue',Arial,sans-serif"
          fontSize="13"
          fontWeight="500"
          letterSpacing="6"
          fill="currentColor"
          opacity="0.7"
        >
          REAL ESTATE
        </text>
      )}
    </svg>
  );
}
