"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { getProductPrice } from "@lib/util/get-product-price"
import { convertToLocale } from "@lib/util/money"
import { Lock } from "@modules/home/components/icons"
import MobileActions from "./mobile-actions"
import { useRouter } from "next/navigation"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
  /** Rendered between the price and the buttons (description, features) */
  details?: React.ReactNode
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
  details,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [isBuying, setIsBuying] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    setIsAdding(false)
  }

  // add to cart, then go straight to checkout
  const handleBuyNow = async () => {
    if (!selectedVariant?.id) return null

    setIsBuying(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    router.push(`/${countryCode}/checkout`)
  }

  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: selectedVariant?.id,
  })
  const price = selectedVariant ? variantPrice : cheapestPrice
  const meta = (product.metadata ?? {}) as Record<string, unknown>
  const compareAt = Number(meta.compare_at_price ?? 0)
  const showCompare =
    !!price && compareAt > price.calculated_price_number
  const savePct = showCompare
    ? Math.round((1 - price!.calculated_price_number / compareAt) * 100)
    : 0
  const features = String(meta.features ?? "")
    .split("|")
    .map((f) => f.trim())
    .filter(Boolean)
  const busy = !!disabled || isAdding || isBuying
  const canBuy = inStock && !!selectedVariant && isValidVariant

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>

        {price ? (
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="text-3xl font-bold text-aqua-navy"
              data-testid="product-price"
              data-value={price.calculated_price_number}
            >
              {price.calculated_price}
            </span>
            {showCompare && (
              <>
                <span className="text-base text-aqua-navy/40 line-through" data-testid="original-product-price">
                  {convertToLocale({ amount: compareAt, currency_code: price.currency_code })}
                </span>
                <span className="rounded bg-aqua-light px-2 py-1 text-xs font-semibold text-aqua-dark">
                  Save {savePct}%
                </span>
              </>
            )}
          </div>
        ) : (
          <div className="block h-9 w-32 animate-pulse bg-gray-100" />
        )}

        {details}

        {features.length > 0 && (
          <ul className="mt-1 space-y-2.5">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-aqua-navy">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aqua text-white">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="m20 6-11 11-5-5" /></svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!canBuy || busy}
            className="h-12 flex-1 rounded-md bg-aqua px-6 text-sm font-semibold text-white transition-colors hover:bg-aqua-dark disabled:cursor-not-allowed disabled:opacity-50"
            data-testid="add-product-button"
          >
            {isAdding
              ? "Adding..."
              : !selectedVariant && !options
              ? "Select variant"
              : !inStock || !isValidVariant
              ? "Unavailable"
              : "Add to Cart"}
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={!canBuy || busy}
            className="h-12 flex-1 rounded-md border border-aqua-dark bg-white px-6 text-sm font-semibold text-aqua-navy transition-colors hover:bg-aqua-mist disabled:cursor-not-allowed disabled:opacity-50"
            data-testid="buy-now-button"
          >
            {isBuying ? "Redirecting..." : "Buy Now"}
          </button>
        </div>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-aqua-navy/70">
          <Lock className="h-3.5 w-3.5" /> Secure Checkout
        </p>
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
