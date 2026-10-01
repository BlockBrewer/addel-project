import { HttpTypes } from "@medusajs/types"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Rating from "../rating"
import { ArrowRight } from "../icons"

// Preferred display order on the homepage.
const ORDER = ["desi-ghee", "pure-honey", "natural-butter", "mustard-oil", "olive-oil"]

function formatPrice(price: {
  calculated_price_number: number
  currency_code: string
  calculated_price: string
}) {
  if (price.currency_code?.toLowerCase() === "pkr") {
    return `Rs. ${Math.round(price.calculated_price_number).toLocaleString("en-US")}`
  }
  return price.calculated_price
}

export default async function Featured({
  countryCode,
}: {
  countryCode: string
}) {
  const region = await getRegion(countryCode)
  if (!region) {
    return null
  }

  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: { limit: 12 },
  })

  if (!products?.length) {
    return null
  }

  const sorted = [...products]
    .sort((a, b) => {
      const ia = ORDER.indexOf(a.handle ?? "")
      const ib = ORDER.indexOf(b.handle ?? "")
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
    })
    .slice(0, 5)

  return (
    <section className="w-full bg-cream">
      <div className="content-container py-16 sm:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
              Our Best Sellers
            </p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-forest sm:text-5xl">
              Featured Products
            </h2>
          </div>
          <LocalizedClientLink
            href="/store"
            className="group inline-flex items-center gap-2 border-b border-forest/30 pb-1 text-sm font-semibold uppercase tracking-wider text-forest transition-colors hover:border-forest"
          >
            View All Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </LocalizedClientLink>
        </div>

        <ul className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
          {sorted.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: HttpTypes.StoreProduct }) {
  const { cheapestPrice } = getProductPrice({ product })
  const meta = (product.metadata ?? {}) as Record<string, unknown>
  const rating = Number(meta.rating ?? 5)
  const reviews = meta.reviews != null ? Number(meta.reviews) : undefined
  const href = `/products/${product.handle}`

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-forest/10 bg-white shadow-sm transition-shadow hover:shadow-md">
      <LocalizedClientLink href={href} className="block overflow-hidden bg-cream-dark">
        <img
          src={product.thumbnail ?? undefined}
          alt={product.title}
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </LocalizedClientLink>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-lg font-semibold leading-tight text-forest">
          {product.title}
        </h3>
        {product.subtitle && (
          <p className="mt-1 text-xs leading-relaxed text-forest/55">
            {product.subtitle}
          </p>
        )}
        <Rating value={rating} count={reviews} className="mt-3" />
        {cheapestPrice && (
          <p className="mt-3 text-lg font-bold text-forest">
            {formatPrice(cheapestPrice)}
          </p>
        )}
        <LocalizedClientLink
          href={href}
          className="mt-4 inline-flex w-full items-center justify-center bg-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-forest-dark transition-colors hover:bg-gold-dark hover:text-white"
        >
          Shop Now
        </LocalizedClientLink>
      </div>
    </article>
  )
}
