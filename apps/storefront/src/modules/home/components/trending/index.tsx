import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

// Preferred display order on the homepage.
const ORDER = [
  "spooky-vibes-svg-bundle",
  "watercolor-butterflies-clipart-set",
  "boho-rainbow-tumbler-wrap",
  "ocean-bloom-digital-paper-pack",
  "floral-alphabet-svg-bundle",
  "cute-animals-coloring-book",
]

export default async function Trending({ countryCode }: { countryCode: string }) {
  const region = await getRegion(countryCode)
  if (!region) return null

  const {
    response: { products },
  } = await listProducts({ regionId: region.id, queryParams: { limit: 24 } })

  if (!products?.length) return null

  const sorted = [...products]
    .sort((a, b) => {
      const ia = ORDER.indexOf(a.handle ?? "")
      const ib = ORDER.indexOf(b.handle ?? "")
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
    })
    .slice(0, 6)

  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-semibold text-aqua-navy">Trending This Week</h2>
        <LocalizedClientLink href="/store" className="text-xs font-medium text-aqua-dark hover:underline">
          See All
        </LocalizedClientLink>
      </div>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        {sorted.map((p) => (
          <li key={p.id}>
            <ProductPreview product={p} />
          </li>
        ))}
      </ul>
    </section>
  )
}
