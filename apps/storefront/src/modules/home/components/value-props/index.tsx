import { Leaf, Sprout, Medal, Box } from "../icons"

const items = [
  {
    Icon: Leaf,
    title: "100% Natural",
    desc: "No preservatives or artificial additives",
  },
  {
    Icon: Sprout,
    title: "Honest Sourcing",
    desc: "Sourced from trusted farms in Sahiwal",
  },
  {
    Icon: Medal,
    title: "Premium Quality",
    desc: "Carefully crafted for purity & taste",
  },
  {
    Icon: Box,
    title: "Freshly Packed",
    desc: "Hygienically packed in Lahore",
  },
]

export default function ValueProps() {
  return (
    <section className="w-full bg-forest text-white">
      <div className="content-container">
        <ul className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {items.map(({ Icon, title, desc }) => (
            <li
              key={title}
              className="flex items-center gap-4 px-2 py-7 lg:px-8"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider">
                  {title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/65">
                  {desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
