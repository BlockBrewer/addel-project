import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { retrieveCustomer } from "@lib/data/customer"
import { CATALOG } from "@lib/constants/catalog"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import NavDropdown from "@modules/layout/components/nav-dropdown"
import SearchBox from "@modules/layout/components/search-box"
import SideMenu from "@modules/layout/components/side-menu"
import Wordmark from "@modules/layout/components/wordmark"
import {
  ChevronDown,
  Heart,
  Sparkle,
  User,
  Cart,
} from "@modules/home/components/icons"

export default async function Nav() {
  const [regions, locales, currentLocale, customer] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    retrieveCustomer().catch(() => null),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      {/* Announcement bar */}
      <div className="bg-aqua text-white">
        <div className="mx-auto flex h-[50px] max-w-[1600px] items-center justify-between px-4 text-sm sm:px-6 lg:px-10">
          <span className="hidden w-[300px] lg:block" />
          <p className="flex flex-1 items-center justify-center gap-2 text-center font-medium">
            <Sparkle className="h-3.5 w-3.5 shrink-0 text-yellow-200" />
            <span>New Designs Added Weekly – Start Creating Today!</span>
          </p>
          <div className="hidden items-center gap-5 md:flex lg:w-[300px] lg:justify-end">
            <span className="flex items-center gap-1 whitespace-nowrap">
              USD $ <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.2} />
            </span>
            <LocalizedClientLink
              href="/account"
              className="flex items-center gap-1.5 hover:opacity-80"
            >
              <Heart className="h-[18px] w-[18px]" />
              Favorites
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/membership"
              className="whitespace-nowrap rounded-md bg-aqua-navy px-4 py-2 font-semibold hover:bg-black"
            >
              Join Now
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/account"
              data-testid="nav-account-link"
              className="flex items-center gap-1.5 whitespace-nowrap hover:opacity-80"
            >
              <User className="h-[18px] w-[18px]" fill="currentColor" />
              {customer ? "Account" : "Log In"}
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white">
        <nav className="mx-auto flex h-[88px] max-w-[1600px] items-center gap-5 px-4 sm:px-6 lg:px-10">
          <div className="text-aqua-navy">
            <SideMenu
              regions={regions}
              locales={locales}
              currentLocale={currentLocale}
            />
          </div>
          <LocalizedClientLink
            href="/"
            data-testid="nav-store-link"
            className="shrink-0"
          >
            <Wordmark />
          </LocalizedClientLink>

          <ul className="ml-4 hidden flex-1 items-center justify-center gap-6 xl:flex">
            {CATALOG.map((c) => (
              <li key={c.handle}>
                <NavDropdown category={c} />
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-4 xl:ml-0">
            <Suspense fallback={<div className="hidden h-12 w-[242px] sm:block" />}>
              <SearchBox className="hidden w-[242px] sm:flex" />
            </Suspense>
            <Suspense
              fallback={
                <LocalizedClientLink href="/cart" data-testid="nav-cart-link">
                  <Cart className="h-7 w-7" />
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
