import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Rating from "@modules/home/components/rating"
import { ChevronRight } from "@modules/home/components/icons"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

// Walk up a category's parent chain, root first.
const categoryPath = (cat?: HttpTypes.StoreProductCategory | null) => {
  const path: HttpTypes.StoreProductCategory[] = []
  let cur: HttpTypes.StoreProductCategory | null | undefined = cat
  while (cur) {
    path.unshift(cur)
    cur = cur.parent_category
  }
  return path
}

export const Breadcrumb = ({ product }: ProductInfoProps) => {
  // Prefer the deepest category.
  const cats = (product.categories ?? []).map((c) => categoryPath(c))
  const path = cats.sort((a, b) => b.length - a.length)[0] ?? []
  const base = "/categories/"

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-aqua-navy/60">
      <LocalizedClientLink href="/" className="hover:text-aqua">Home</LocalizedClientLink>
      {path.map((c, i) => (
        <span key={c.id} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3" />
          <LocalizedClientLink
            href={base + path.slice(0, i + 1).map((p) => p.handle).join("/")}
            className="hover:text-aqua"
          >
            {c.name}
          </LocalizedClientLink>
        </span>
      ))}
    </nav>
  )
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const meta = (product.metadata ?? {}) as Record<string, unknown>
  const rating = Number(meta.rating ?? 5)
  const reviews = meta.reviews != null ? Number(meta.reviews) : undefined

  return (
    <div id="product-info">
      <h1 className="text-3xl font-semibold leading-tight text-aqua-navy" data-testid="product-title">
        {product.title}
      </h1>
      <div className="mt-3 flex items-center gap-2">
        <Rating value={rating} size="h-4 w-4" />
        {reviews != null && <span className="text-sm text-aqua-navy/60">({reviews} reviews)</span>}
      </div>
    </div>
  )
}

export default ProductInfo
