import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Wordmark from "@modules/layout/components/wordmark"
import {
  Leaf,
  ShieldCheck,
  Medal,
  Sprout,
  Box,
  Truck,
  Search,
  User,
} from "@modules/home/components/icons"

const trustItems = [
  { Icon: Leaf, label: "100% Natural" },
  { Icon: ShieldCheck, label: "Honest Sourcing" },
  { Icon: Medal, label: "Premium Quality" },
  { Icon: Sprout, label: "Sourced from Sahiwal" },
  { Icon: Box, label: "Packed in Lahore" },
  { Icon: Truck, label: "Delivery All Over Pakistan" },
]

const navLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/store" },
  { label: "Our Story", href: "#story", external: true },
  { label: "Our Sourcing", href: "#story", external: true },
  { label: "Blog", href: "/store" },
  { label: "Contact", href: "#newsletter", external: true },
]

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      {/* Top trust bar */}
      <div className="bg-forest-dark text-white">
        <div className="content-container hidden items-center justify-center gap-x-7 gap-y-1 py-2 text-[11px] uppercase tracking-wider md:flex md:flex-wrap">
          {trustItems.map(({ Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 text-white/80">
              <Icon className="h-3.5 w-3.5 text-gold" />
              {label}
            </span>
          ))}
        </div>
        <p className="content-container py-2 text-center text-[11px] uppercase tracking-wider text-white/80 md:hidden">
          Pure Foods · Honest Origins · Delivery Across Pakistan
        </p>
      </div>

      {/* Header */}
      <header className="border-b border-forest/10 bg-cream-light">
        <nav className="content-container flex h-20 items-center justify-between">
          {/* Left: mobile menu + wordmark */}
          <div className="flex flex-1 items-center gap-3">
            <div className="text-forest md:hidden">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
            <LocalizedClientLink href="/" data-testid="nav-store-link">
              <Wordmark />
            </LocalizedClientLink>
          </div>

          {/* Center: nav links */}
          <ul className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-wider text-forest md:flex">
            {navLinks.map((link) =>
              link.external ? (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-gold-dark"
                  >
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.label}>
                  <LocalizedClientLink
                    href={link.href}
                    className="transition-colors hover:text-gold-dark"
                  >
                    {link.label}
                  </LocalizedClientLink>
                </li>
              )
            )}
          </ul>

          {/* Right: icons */}
          <div className="flex flex-1 items-center justify-end gap-5 text-forest">
            <LocalizedClientLink
              href="/store"
              aria-label="Search"
              className="transition-colors hover:text-gold-dark"
            >
              <Search className="h-5 w-5" />
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/account"
              aria-label="Account"
              data-testid="nav-account-link"
              className="transition-colors hover:text-gold-dark"
            >
              <User className="h-5 w-5" />
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="transition-colors hover:text-gold-dark"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
