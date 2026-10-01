import { Star } from "../icons"

export default function Rating({
  value = 5,
  count,
  className = "",
}: {
  value?: number
  count?: number
  className?: string
}) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i < Math.round(value) ? "" : "opacity-25"}`}
          />
        ))}
      </div>
      {typeof count === "number" && (
        <span className="text-xs text-forest/50">({count})</span>
      )}
    </div>
  )
}
