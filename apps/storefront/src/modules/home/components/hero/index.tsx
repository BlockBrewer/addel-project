import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight, Leaf } from "../icons"

const heroTrust = [
  ["100% Natural", "No Additives"],
  ["Trusted by", "Families"],
  ["Export Quality", "Standards"],
  ["Secure & Fast", "Delivery"],
]

const Hero = () => {
  return (
    <>
      {/* Mobile / small-tablet hero — full-bleed product photo background */}
      <section className="relative overflow-hidden bg-forest-dark text-white md:hidden">
        <img
          src="/fitrat/honey.png"
          alt="Fitrat Origins pure raw honey in the green pastures of Sahiwal"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* legibility scrim — dark at top & bottom, the jar glows through the middle */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/90 via-forest-dark/25 to-forest-dark/95" />

        <div className="relative content-container flex min-h-[88vh] flex-col items-center justify-between py-12 text-center">
          <h1 className="font-serif text-[2.75rem] font-semibold leading-[1.05] drop-shadow-sm">
            <span className="block">Pure Foods.</span>
            <span className="block text-gold">Honest Origins.</span>
          </h1>

          <div className="w-full">
            <LocalizedClientLink
              href="/store"
              className="group inline-flex items-center gap-3 bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-forest-dark shadow-lg shadow-black/30 transition-colors hover:bg-gold-light"
            >
              Shop Premium Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </LocalizedClientLink>

            <ul className="mx-auto mt-8 grid max-w-xs grid-cols-2 gap-x-6 gap-y-3 text-left">
              {heroTrust.map(([a, b]) => (
                <li key={a} className="flex items-center gap-2.5">
                  <Leaf className="h-4 w-4 shrink-0 text-gold" />
                  <span className="text-xs leading-tight">
                    <span className="block font-medium">{a}</span>
                    <span className="block text-white/65">{b}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Desktop hero — branded banner art (logo & headline are part of the image) */}
      <section className="relative hidden w-full overflow-hidden bg-forest-dark md:block">
        <img
          src="/fitrat/hero.jpg"
          alt="Fitrat Origins — Pure Foods. Honest Origins. Premium desi ghee, pure honey, wood-pressed mustard oil and extra virgin olive oil"
          className="block max-h-[90vh] w-full object-cover object-center"
        />

        {/* legibility wash on the left for the overlaid CTA */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest-dark/55 via-forest-dark/10 to-transparent" />

        {/* CTA + trust points overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="content-container pb-[7%]">
            <div className="max-w-lg">
              <LocalizedClientLink
                href="/store"
                className="group inline-flex items-center gap-3 bg-gold px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-forest-dark shadow-lg shadow-black/20 transition-colors hover:bg-gold-light"
              >
                Shop Premium Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </LocalizedClientLink>

              <ul className="mt-7 grid max-w-md grid-cols-2 gap-x-8 gap-y-4">
                {heroTrust.map(([a, b]) => (
                  <li key={a} className="flex items-center gap-2.5 text-white">
                    <Leaf className="h-4 w-4 shrink-0 text-gold" />
                    <span className="text-xs leading-tight">
                      <span className="block font-medium">{a}</span>
                      <span className="block text-white/60">{b}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
