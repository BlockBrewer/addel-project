import { Mail, ArrowRight } from "../icons"

export default function Newsletter() {
  return (
    <section id="newsletter" className="w-full bg-forest text-white">
      <div className="content-container grid items-center gap-8 py-12 lg:grid-cols-2">
        <div className="flex items-center gap-5">
          <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gold text-forest-dark sm:flex">
            <Mail className="h-7 w-7" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Stay Connected
            </p>
            <h2 className="mt-1 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
              Get the Goodness Delivered to You.
            </h2>
          </div>
        </div>

        <div className="lg:justify-self-end lg:text-right">
          <p className="text-sm text-white/70">
            Subscribe to get updates on new products, offers and healthy living
            tips.
          </p>
          <form className="mt-4 flex w-full max-w-md gap-0 lg:ml-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Email address"
              className="h-12 w-full rounded-none border-0 bg-white px-4 text-sm text-forest-dark placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button
              type="submit"
              className="group inline-flex h-12 shrink-0 items-center gap-2 bg-gold px-6 text-xs font-semibold uppercase tracking-widest text-forest-dark transition-colors hover:bg-gold-light"
            >
              Subscribe
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
