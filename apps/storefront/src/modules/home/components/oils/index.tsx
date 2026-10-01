import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight, Check } from "../icons"

const oils = [
  {
    name: "Cold Pressed",
    highlight: "Mustard Oil",
    image: "/fitrat/mustard-oil.png",
    features: ["100% Pure & Natural", "Rich in Omega 3 & 6", "Great for Heart Health"],
  },
  {
    name: "Extra Virgin",
    highlight: "Olive Oil",
    image: "/fitrat/olive-oil.png",
    features: ["First Cold Pressed", "High in Antioxidants", "Imported Quality"],
  },
]

export default function Oils() {
  return (
    <section className="w-full bg-forest-deep text-white">
      <div className="content-container grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.4fr] lg:items-center">
        {/* Intro */}
        <div className="max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Pure Oils Collection
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Purity in Every
            <br />
            <span className="text-gold">Drop of Oil.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Our oils are cold pressed to preserve natural nutrients, aroma and
            authentic taste.
          </p>
          <LocalizedClientLink
            href="/store"
            className="group mt-7 inline-flex items-center gap-3 bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-forest-dark transition-colors hover:bg-gold-light"
          >
            Explore Oils
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </LocalizedClientLink>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          {oils.map((oil) => (
            <article
              key={oil.highlight}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <img
                src={oil.image}
                alt={oil.highlight}
                className="h-40 w-24 shrink-0 rounded-lg object-cover sm:h-48 sm:w-28"
              />
              <div className="min-w-0">
                <h3 className="font-serif text-2xl font-semibold leading-tight">
                  {oil.name}
                  <br />
                  <span className="text-gold">{oil.highlight}</span>
                </h3>
                <ul className="mt-4 space-y-2">
                  {oil.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-xs text-white/80"
                    >
                      <Check className="h-4 w-4 shrink-0 text-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
                <LocalizedClientLink
                  href="/store"
                  className="group mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:text-gold-light"
                >
                  Shop {oil.highlight}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </LocalizedClientLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
