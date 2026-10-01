import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Infinity, Refresh, Award, Cart, ChevronRight } from "../icons"

const items = [
  {
    Icon: Infinity,
    title: "Unlimited Access",
    desc: "Download as much as you need, whenever you need it.",
  },
  {
    Icon: Refresh,
    title: "Regular Updates",
    desc: "New designs added weekly. Never run out of inspiration.",
  },
  {
    Icon: Award,
    title: "High Quality",
    desc: "Premium designs you can use anywhere.",
  },
  {
    Icon: Cart,
    title: "Commercial Friendly",
    desc: "Use our designs for personal and commercial projects.",
  },
]

export default function ValueProps() {
  return (
    <section className="grid overflow-hidden rounded-2xl border border-gray-100 bg-aqua-mist lg:grid-cols-[1fr_minmax(0,360px)]">
      <ul className="grid divide-y divide-gray-200 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {items.map(({ Icon, title, desc }) => (
          <li key={title} className="flex items-center gap-4 px-6 py-6">
            <Icon className="h-10 w-10 shrink-0 text-aqua-deep" />
            <div>
              <h3 className="text-[15px] font-semibold text-aqua-navy">{title}</h3>
              <p className="mt-1 text-[13px] leading-6 text-aqua-navy/70">{desc}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-aqua to-aqua-dark px-8 py-7 text-center text-white">
        <h3 className="font-serif text-2xl">Join Our Membership</h3>
        <p className="mt-2 text-sm leading-6 text-white/90">
          Get unlimited downloads and access thousands of premium designs.
        </p>
        <LocalizedClientLink
          href="/membership"
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-8 py-3 text-sm font-semibold text-aqua-navy transition-colors hover:bg-aqua-light"
        >
          Start Free Trial <ChevronRight className="h-4 w-4" />
        </LocalizedClientLink>
      </div>
    </section>
  )
}
