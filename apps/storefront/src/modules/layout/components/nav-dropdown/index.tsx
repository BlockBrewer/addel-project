"use client"

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronDown } from "@modules/home/components/icons"
import { CatalogCategory, categoryHref } from "@lib/constants/catalog"
import { useRef } from "react"

export default function NavDropdown({ category }: { category: CatalogCategory }) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  const open = () => {
    clearTimeout(closeTimer.current)
    // Headless UI exposes no imperative open, so mimic a click when closed.
    if (buttonRef.current?.getAttribute("aria-expanded") !== "true") {
      buttonRef.current?.click()
    }
  }
  const close = () => {
    closeTimer.current = window.setTimeout(() => {
      if (buttonRef.current?.getAttribute("aria-expanded") === "true") {
        buttonRef.current?.click()
      }
    }, 120)
  }

  return (
    <Popover className="relative" onMouseEnter={open} onMouseLeave={close}>
      <PopoverButton
        ref={buttonRef}
        className="flex items-center gap-1 whitespace-nowrap text-[15px] font-medium text-aqua-navy outline-none transition-colors hover:text-aqua data-[open]:text-aqua"
      >
        {category.label}
        <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.2} />
      </PopoverButton>
      <PopoverPanel className="absolute left-0 top-full z-50 pt-3">
        {({ close: closePanel }) => (
          <div className="min-w-[210px] rounded-xl border border-aqua-light bg-white p-2 shadow-lg">
            <LocalizedClientLink
              href={categoryHref(category)}
              onClick={closePanel}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-aqua-dark hover:bg-aqua-mist"
            >
              All {category.label}
            </LocalizedClientLink>
            {category.children.map((child) => (
              <LocalizedClientLink
                key={child.handle}
                href={categoryHref(category, child)}
                onClick={closePanel}
                className="block rounded-lg px-3 py-2 text-sm text-aqua-navy hover:bg-aqua-mist"
              >
                {child.label}
              </LocalizedClientLink>
            ))}
          </div>
        )}
      </PopoverPanel>
    </Popover>
  )
}
