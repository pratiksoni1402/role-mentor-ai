import { cn } from "@/lib/utils"

export function StepIndicator({ current }: { current: number }) {
  const steps = [
    { id: 1, label: "Role" },
    { id: 3, label: "Quiz" },
    { id: 4, label: "Results" },
  ]

  return (
    <ol className="mt-4 flex items-center gap-3" aria-label="Progress">
      {steps.map((s, i) => {
        const isActive = current === s.id
        const isComplete = current > s.id
        return (
          <li key={s.id} className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border text-xs",
                isActive
                  ? "border-primary text-primary"
                  : isComplete
                    ? "border-emerald-300 text-emerald-600"
                    : "border-muted text-muted-foreground",
              )}
              aria-current={isActive ? "step" : undefined}
            >
              {i + 1}
            </span>
            <span className={cn("text-sm", isActive ? "text-foreground font-medium" : "text-muted-foreground")}>
              {s.label}
            </span>
            {i < steps.length - 1 && <span className="mx-2 h-px w-6 bg-muted" aria-hidden />}
          </li>
        )
      })}
    </ol>
  )
}
