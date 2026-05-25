import Image from "next/image";
import { cn } from "@/lib/cn";

interface ChevronCardProps {
  src: string;
  alt: string;
  className?: string;
  variant?: "double" | "left" | "right";
  caption?: string;
}

export function ChevronCard({
  src,
  alt,
  className,
  variant = "double",
  caption,
}: ChevronCardProps) {
  const shape =
    variant === "left"
      ? "chevron-left"
      : variant === "right"
        ? "chevron-right"
        : "chevron";
  return (
    <figure className={cn("relative", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden",
          shape
        )}
        style={{ aspectRatio: "16 / 11" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, 90vw"
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-[var(--ink-soft)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
