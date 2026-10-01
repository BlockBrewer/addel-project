import { Leaf, ShieldCheck, Globe, BadgeCheck, Box } from "../icons"

const certs = [
  { Icon: Leaf, title: "100% Natural", desc: "No Additives" },
  { Icon: ShieldCheck, title: "Food Safety", desc: "Certified" },
  { Icon: Globe, title: "Export Quality", desc: "Standards" },
  { Icon: BadgeCheck, title: "Halal Certified", desc: "100% Halal" },
  { Icon: Box, title: "Hygienically Packed", desc: "For Your Safety" },
]

export default function Certifications() {
  return (
    <section className="w-full border-y border-forest/10 bg-cream-dark">
      <div className="content-container py-12">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
          Certified Natural. Made For Your Family.
        </p>
        <ul className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {certs.map(({ Icon, title, desc }) => (
            <li
              key={title}
              className="flex flex-col items-center gap-3 px-2 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-forest/15 text-forest">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-semibold text-forest">{title}</p>
                <p className="text-xs text-forest/55">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
