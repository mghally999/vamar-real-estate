"use client";

import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "ghost" | "dark";

interface BaseProps {
  variant?: Variant;
  arrow?: boolean | "down" | "right";
  children: ReactNode;
  className?: string;
}

interface LinkProps extends BaseProps {
  href: string;
  onClick?: never;
  type?: never;
}

interface ButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: never;
}

export function PillButton(props: LinkProps | ButtonProps) {
  const {
    variant = "solid",
    arrow = true,
    children,
    className,
    ...rest
  } = props;

  const variantAttr = variant === "solid" ? undefined : variant;

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          {arrow === "down" ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          )}
        </span>
      )}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        data-variant={variantAttr}
        className={cn("pill group", className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      data-variant={variantAttr}
      className={cn("pill group", className)}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
