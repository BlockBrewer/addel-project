import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Rating from "@modules/home/components/rating"
import { Heart } from "@modules/home/components/icons"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured: _isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region?: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const image = product.thumbnail || product.images?.[0]?.url
  const meta = (product.metadata ?? {}) as Record<string, unknown>
  const rating = Number(meta.rating ?? 5)
  const reviews = meta.reviews != null ? Number(meta.reviews) : undefined

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block h-full"
    >
      <article
        data-testid="product-wrapper"
        className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-1.5 shadow-sm transition-shadow duration-300 group-hover:shadow-md"
      >
        <div className="relative overflow-hidden rounded-md bg-aqua-mist">
          {image ? (
            <img
              src={image}
              alt={product.title}
              loading="lazy"
              className="aspect-[5/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="aspect-[5/4] w-full bg-aqua-mist" />
          )}
          <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-aqua-navy shadow-sm">
            <Heart className="h-4 w-4" />
          </span>
        </div>
        <div className="flex flex-1 flex-col px-2 pb-2 pt-3">
          <h3
            className="line-clamp-2 text-[13px] font-semibold leading-snug text-aqua-navy"
            data-testid="product-title"
          >
            {product.title}
          </h3>
          {cheapestPrice && (
            <div className="mt-1.5 flex items-center gap-x-2">
              <PreviewPrice price={cheapestPrice} />
            </div>
          )}
          <Rating value={rating} count={reviews} className="mt-auto pt-2" size="h-3 w-3" />
        </div>
      </article>
    </LocalizedClientLink>
  )
}
