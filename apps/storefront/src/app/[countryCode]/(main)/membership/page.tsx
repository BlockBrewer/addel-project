import { Metadata } from "next"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Check } from "@modules/home/components/icons"

export const metadata: Metadata = {
  title: "Membership | AquaCraft",
  description: "Unlimited downloads of thousands of premium designs.",
}

const PERKS = [
  "Unlimited downloads of every design",
  "New designs added weekly",
  "Commercial license included",
  "Cancel anytime",
]

export default function MembershipPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-serif text-5xl text-aqua-navy">Join Our Membership</h1>
      <p className="mt-4 text-lg text-aqua-navy/80">
        Get unlimited downloads and access thousands of premium designs.
      </p>
      <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left">
        {PERKS.map((p) => (
          <li key={p} className="flex items-center gap-3 text-aqua-navy">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-aqua text-white">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-10 rounded-xl bg-aqua-light/50 px-6 py-4 text-sm text-aqua-navy">
        Memberships are launching soon. In the meantime you can buy any design
        individually.
      </p>
      <LocalizedClientLink
        href="/store"
        className="mt-8 inline-block rounded-md bg-aqua px-8 py-4 text-sm font-semibold text-white hover:bg-aqua-dark"
      >
        Explore Designs
      </LocalizedClientLink>
    </div>
  )
}
