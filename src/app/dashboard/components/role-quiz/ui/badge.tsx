import type * as React from "react"
import { cn } from "@/lib/utils"

type BadgeTone = "neutral" | "success" | "error"
type BadgeSize = "sm" | "md"

export function Badge({
  tone = "neutral",
  size = "sm",
  children,
  className,
  "aria-label": ariaLabel,
}: {
  tone?: BadgeTone
  size?: BadgeSize
  children: React.ReactNode
  className?: string
  "aria-label"?: string
}) {
  const toneClass =
    tone === "success"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : tone === "error"
        ? "bg-red-50 text-red-700 ring-red-200"
        : "bg-muted/60 text-foreground ring-muted"

  const sizeClass = size === "md" ? "px-3 py-1 text-sm" : "px-2.5 py-0.5 text-xs"

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full ring-1 ring-inset font-medium",
        sizeClass,
        toneClass,
        className,
      )}
      role="status"
      aria-label={ariaLabel}
    >
      {children}
    </span>
  )
}
