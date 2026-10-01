import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Wordmark from "@modules/layout/components/wordmark"
import NewsletterForm from "@modules/home/components/newsletter/form"
import { PaymentBadges } from "@modules/common/icons/payment-badges"
import { Instagram, Pinterest, Facebook, TikTok, Youtube, Chat } from "@modules/home/components/icons"

const shop = [
  ["SVGs", "/categories/svgs"],
  ["Canva Templates", "/categories/canva-templates"],
  ["Printables", "/categories/printables"],
  ["Planners", "/categories/planners"],
  ["Sublimation", "/categories/sublimation"],
  ["Journals", "/categories/journals"],
  ["Mockups", "/categories/mockups"],
  ["3D Prints", "/categories/3d-prints"],
  ["All Categories", "/store"],
]

const info = [
  ["About Us", "/about"],
  ["Commercial Use", "/commercial-use"],
  ["License", "/license"],
  ["FAQ", "/faq"],
  ["Privacy Policy", "/privacy-policy"],
  ["Refund Policy", "/refund-policy"],
  ["Terms & Conditions", "/terms"],
]

const socials = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Pinterest, label: "Pinterest" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: TikTok, label: "TikTok" },
  { Icon: Youtube, label: "YouTube" },
]

const linkCls = "text-[15px] text-aqua-navy/80 transition-colors hover:text-aqua"
const headCls = "text-xl font-medium text-aqua-navy"

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-aqua-light bg-gradient-to-b from-aqua-light/40 to-aqua-mist">
      <img src="/aquacraft/leaf-left.jpg" alt="" aria-hidden className="pointer-events-none absolute bottom-0 left-0 hidden h-[360px] w-auto opacity-60 mix-blend-multiply [mask-image:linear-gradient(to_right,black,transparent)] lg:block" />
      <img src="/aquacraft/leaf-right.jpg" alt="" aria-hidden className="pointer-events-none absolute bottom-0 right-0 hidden h-[420px] w-auto opacity-60 mix-blend-multiply [mask-image:linear-gradient(to_left,black,transparent)] lg:block" />

      <div className="relative mx-auto max-w-[1600px] px-4 pb-8 pt-14 sm:px-6 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr_1.3fr]">
          <div>
            <LocalizedClientLink href="/"><Wordmark /></LocalizedClientLink>
            <p className="mt-6 max-w-[240px] text-[15px] leading-7 text-aqua-navy/80">
              Digital downloads to fuel your creativity and bring your ideas to life.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full bg-aqua-dark text-white transition-colors hover:bg-aqua-deep">
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:border-l lg:border-aqua-light lg:pl-10">
            <h3 className={headCls}>Shop</h3>
            <ul className="mt-5 space-y-3">
              {shop.map(([l, h]) => (<li key={l}><LocalizedClientLink href={h} className={linkCls}>{l}</LocalizedClientLink></li>))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-aqua-light lg:pl-10">
            <h3 className={headCls}>Information</h3>
            <ul className="mt-5 space-y-3">
              {info.map(([l, h]) => (<li key={l}><LocalizedClientLink href={h} className={linkCls}>{l}</LocalizedClientLink></li>))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-aqua-light lg:pl-10">
            <h3 className={headCls}>Customer Support</h3>
            <p className="mt-5 text-[15px] leading-7 text-aqua-navy/80">We&apos;re here to help you with any questions or concerns.</p>
            <a href="mailto:support@aquacraft.com" className="mt-4 inline-block text-[15px] text-aqua-dark underline">support@aquacraft.com</a>
            <div>
              <a href="mailto:support@aquacraft.com" className="mt-6 inline-flex items-center gap-2 rounded-md border border-aqua-dark bg-white px-5 py-3 text-sm font-medium text-aqua-dark transition-colors hover:bg-aqua-mist">
                Contact Support <Chat className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:border-l lg:border-aqua-light lg:pl-10">
            <h3 className={headCls}>Newsletter</h3>
            <p className="mt-5 text-[15px] leading-7 text-aqua-navy/80">Get exclusive offers, new designs and creative inspiration.</p>
            <NewsletterForm compact />
            <p className="mt-3 text-xs text-aqua-navy/70">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="relative mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-aqua-light pt-6">
          <p className="text-sm text-aqua-navy/80">© {new Date().getFullYear()} AquaCraft. All rights reserved.</p>
          <PaymentBadges />
        </div>
      </div>
    </footer>
  )
}
