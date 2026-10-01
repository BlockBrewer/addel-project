import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight, Users, Sprout, Box, Leaf } from "../icons"

const stats = [
  { Icon: Users, value: "10,000+", label: "Happy Families" },
  { Icon: Sprout, value: "50+", label: "Trusted Farms" },
  { Icon: Box, value: "25+", label: "Premium Products" },
  { Icon: Leaf, value: "100%", label: "Natural & Pure" },
]

export default function Story() {
  return (
    <section id="story" className="w-full bg-cream-light">
      <div className="content-container grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
        {/* Left: copy + image */}
        <div className="grid gap-8 sm:grid-cols-2 sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
              Our Story
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-forest sm:text-4xl">
              Rooted in Nature.
              <br />
              Guided by Purpose.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-forest/65">
              At Fitrat Origins, we believe real food comes from honest origins.
              From the green pastures of Sahiwal to our careful processes in
              Lahore, every step is taken with integrity and respect for nature.
            </p>
            <LocalizedClientLink
              href="/store"
              className="group mt-6 inline-flex items-center gap-3 bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest text-forest-dark transition-colors hover:bg-gold-dark hover:text-white"
            >
              Learn Our Story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </LocalizedClientLink>
          </div>
          <img
            src="/fitrat/combo.png"
            alt="The Fitrat Origins range — desi ghee, honey, mustard oil and olive oil"
            className="h-56 w-full rounded-xl object-cover sm:h-72"
          />
        </div>

        {/* Right: stats */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map(({ Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-xl border border-forest/10 bg-white px-4 py-8 text-center shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold-dark">
                <Icon className="h-5 w-5" />
              </span>
              <p className="font-serif text-3xl font-bold text-forest">
                {value}
              </p>
              <p className="text-xs uppercase tracking-wider text-forest/55">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
