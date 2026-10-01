import { Star } from "../icons"

export default function Rating({
  value = 5,
  count,
  className = "",
  size = "h-3.5 w-3.5",
}: {
  value?: number
  count?: number
  className?: string
  size?: string
}) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`${size} ${i < Math.round(value) ? "" : "opacity-25"}`}
          />
        ))}
      </div>
      {typeof count === "number" && (
        <span className="text-xs text-aqua-navy/60">({count})</span>
      )}
    </div>
  )
}
