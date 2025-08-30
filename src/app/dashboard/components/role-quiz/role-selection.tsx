"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ROLES, type Role } from "./types"
import { Spinner } from "./ui/spinner"

export function RoleSelection({
  role,
  setRole,
  customRole,
  setCustomRole,
  loading,
  onNext,
}: {
  role: Role | null
  setRole: (r: Role) => void
  customRole: string
  setCustomRole: (v: string) => void
  loading: boolean
  onNext: () => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-3">Choose your role</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ROLES.map((r) => {
            const selected = role === r
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                data-selected={selected}
                className={cn(
                  "rounded-xl hover:cursor-pointer border px-4 py-3 text-left transition-colors",
                  "hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30",
                  "data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground data-[selected=true]:border-primary",
                )}
                aria-pressed={selected}
              >
                <span className="font-medium">{r}</span>
                <p className={cn("text-sm mt-1", selected ? "text-primary-foreground/90" : "text-muted-foreground")}>
                  {r === "Others" ? "Specify a custom role" : "Common responsibilities"}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {role === "Others" && (
        <div className="space-y-2">
          <label htmlFor="custom-role" className="text-sm font-medium">
            Your role
          </label>
          <input
            id="custom-role"
            type="text"
            placeholder="e.g., Product Manager"
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
            className={cn(
              "w-full rounded-lg border bg-background px-3 py-2",
              "focus:outline-none focus:ring-2 focus:ring-primary/30",
            )}
          />
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <div className="text-sm text-muted-foreground">Step 1 of 3 • Role selection</div>
        <Button disabled={!role || (role === "Others" && !customRole) || loading} onClick={onNext}>
          {loading ? <Spinner className="mr-2" /> : null}
          Generate Quiz
        </Button>
      </div>
    </div>
  )
}
