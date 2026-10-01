import { Cart, Download, Customize, Pencil, ArrowRight } from "../icons"

const STEPS = [
  { Icon: Cart, title: "1. Purchase", desc: "Choose your favorite design" },
  { Icon: Download, title: "2. Download", desc: "Instant access to your files" },
  { Icon: Customize, title: "3. Customize", desc: "Edit in your favorite software" },
  { Icon: Pencil, title: "4. Create", desc: "Use for personal or commercial projects" },
]

export default function HowItWorks({ className = "" }: { className?: string }) {
  return (
    <section className={`rounded-2xl border border-gray-200 bg-white p-6 ${className}`}>
      <h2 className="text-center text-lg font-semibold text-aqua-navy">How It Works</h2>
      <ol className="mt-6 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
        {STEPS.map(({ Icon, title, desc }, i) => (
          <li key={title} className="relative flex flex-col items-center px-2 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-aqua-light/60 text-aqua-deep">
              <Icon className="h-7 w-7" />
            </span>
            {i < STEPS.length - 1 && (
              <ArrowRight className="absolute -right-2 top-5 hidden h-5 w-5 text-aqua sm:block" />
            )}
            <p className="mt-3 text-[13px] font-semibold text-aqua-navy">{title}</p>
            <p className="mt-1 text-xs leading-5 text-aqua-navy/70">{desc}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
