export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <path d="M24 3c6 6 9 11 9 17 0 7-4 12-9 12s-9-5-9-12c0-6 3-11 9-17Z" fill="#14a3a3" />
      <path d="M24 8v26" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity=".7" />
      <path d="M22 33C14 33 8 29 5 21c8-1 14 2 17 12Z" fill="#0b7f82" />
      <path d="M26 33c8 0 14-4 17-12-8-1-14 2-17 12Z" fill="#3bb5c4" />
      <path d="M24 31v13" stroke="#0b7f82" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function Wordmark({
  light = false,
}: {
  /** Use on dark backgrounds */
  light?: boolean
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark />
      <span className="leading-none">
        <span
          className={`block font-serif text-[28px] leading-none tracking-tight ${
            light ? "text-white" : "text-aqua-deep"
          }`}
        >
          AquaCraft
        </span>
        <span
          className={`mt-1 block text-[11px] font-medium ${
            light ? "text-white/80" : "text-aqua-navy"
          }`}
        >
          Design. Download. Inspire.
        </span>
      </span>
    </span>
  )
}
