import { Leaf } from "@modules/home/components/icons"

export default function Wordmark({
  light = false,
}: {
  /** Use on dark backgrounds (footer) */
  light?: boolean
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full ${
          light ? "bg-gold text-forest-dark" : "bg-forest text-gold"
        }`}
      >
        <Leaf className="h-5 w-5" />
      </span>
      <span className="leading-none">
        <span
          className={`block font-serif text-2xl font-bold leading-none tracking-wide ${
            light ? "text-white" : "text-forest"
          }`}
        >
          FITRAT
        </span>
        <span
          className={`mt-0.5 block text-[10px] font-medium tracking-[0.35em] ${
            light ? "text-gold-light" : "text-gold-dark"
          }`}
        >
          ORIGINS
        </span>
      </span>
    </span>
  )
}
