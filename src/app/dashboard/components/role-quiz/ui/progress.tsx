export function Progress({ value }: { value: number }) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div
      className="h-2 w-full rounded-full bg-muted"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${clamped}%` }} />
    </div>
  )
}
