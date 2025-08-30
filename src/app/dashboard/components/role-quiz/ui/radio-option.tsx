"use client"

import { cn } from "@/lib/utils"

export function RadioOption({
  name,
  value,
  checked,
  onChange,
  label,
}: {
  name: string
  value: string
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <label
      className={cn(
        "group relative block cursor-pointer rounded-lg border p-3 transition-colors",
        "hover:border-primary focus-within:ring-2 focus-within:ring-primary/30",
        checked ? "border-primary bg-primary/5" : "border-input bg-background",
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "mt-0.5 grid h-4 w-4 place-items-center rounded-full border-2 transition-colors",
            checked ? "border-primary" : "border-muted-foreground/60 group-hover:border-primary",
          )}
        >
          <span
            className={cn("h-2 w-2 rounded-full bg-primary transition-transform", checked ? "scale-100" : "scale-0")}
          />
        </span>
        <span className="text-sm md:text-base text-foreground">{label}</span>
      </div>
    </label>
  )
}
