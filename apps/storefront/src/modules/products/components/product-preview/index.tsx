import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured: _isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const image = product.thumbnail || product.images?.[0]?.url

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block h-full"
    >
      <div
        data-testid="product-wrapper"
        className="flex h-full flex-col overflow-hidden rounded-lg border border-forest/10 bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-md"
      >
        <div className="overflow-hidden bg-cream-dark">
          {image ? (
            <img
              src={image}
              alt={product.title}
              className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="aspect-[4/5] w-full bg-cream-dark" />
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3
            className="line-clamp-1 font-serif text-lg font-semibold leading-tight text-forest"
            data-testid="product-title"
          >
            {product.title}
          </h3>
          {product.subtitle && (
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-forest/55">
              {product.subtitle}
            </p>
          )}
          {cheapestPrice && (
            <div className="mt-3 flex items-center gap-x-2">
              <PreviewPrice price={cheapestPrice} />
            </div>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
