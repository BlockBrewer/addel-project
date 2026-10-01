import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Wordmark from "@modules/layout/components/wordmark"
import {
  Facebook,
  Instagram,
  Whatsapp,
  Lock,
  Banknote,
  Truck,
  Heart,
  ArrowRight,
} from "@modules/home/components/icons"

const columns: { title: string; links: string[] }[] = [
  {
    title: "Shop",
    links: ["Desi Ghee", "Honey", "Butter", "Mustard Oil", "Olive Oil", "All Products"],
  },
  {
    title: "Company",
    links: ["Our Story", "Our Sourcing", "Blog", "Contact Us"],
  },
  {
    title: "Customer Care",
    links: ["Track Order", "Shipping & Delivery", "Returns & Refunds", "FAQs"],
  },
]

const socials = [Facebook, Instagram, Whatsapp]

const badges = [
  { Icon: Lock, label: "Secure Payments" },
  { Icon: Banknote, label: "Cash on Delivery" },
  { Icon: Truck, label: "Nationwide Delivery" },
  { Icon: Heart, label: "Made in Pakistan" },
]

export default function Footer() {
  return (
    <footer className="w-full bg-forest-dark text-white">
      <div className="content-container py-16">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)_1.3fr]">
          {/* Brand */}
          <div className="max-w-xs">
            <LocalizedClientLink href="/">
              <Wordmark light />
            </LocalizedClientLink>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Pure foods. Honest origins. Premium natural products crafted with
              care and sourced from the heart of Sahiwal, Pakistan.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-white/65">
                {col.links.map((link) => (
                  <li key={link}>
                    <LocalizedClientLink
                      href="/store"
                      className="transition-colors hover:text-white"
                    >
                      {link}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Stay Connected
            </h3>
            <p className="mt-5 text-sm text-white/65">
              Subscribe for updates and exclusive offers.
            </p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="h-11 w-full rounded-l-md border-0 bg-white/10 px-3 text-sm text-white placeholder:text-white/40 focus:bg-white/15 focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-11 shrink-0 items-center justify-center rounded-r-md bg-gold px-4 text-forest-dark transition-colors hover:bg-gold-light"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="content-container flex flex-col items-center justify-between gap-4 py-5 text-xs text-white/55 md:flex-row">
          <p>© 2024 Fitrat Origins. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {badges.map(({ Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-gold" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
