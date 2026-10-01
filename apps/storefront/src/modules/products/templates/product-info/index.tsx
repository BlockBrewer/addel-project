import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Rating from "@modules/home/components/rating"
import { ChevronRight } from "@modules/home/components/icons"
import { listCategories } from "@lib/data/categories"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

// Walk up a category's parent chain (resolved from the full category list), root first.
const categoryPath = (
  cat: HttpTypes.StoreProductCategory | undefined,
  byId: Map<string, HttpTypes.StoreProductCategory>
) => {
  const path: HttpTypes.StoreProductCategory[] = []
  let cur = cat
  while (cur) {
    path.unshift(cur)
    cur = cur.parent_category_id ? byId.get(cur.parent_category_id) : undefined
  }
  return path
}

export const Breadcrumb = async ({ product }: ProductInfoProps) => {
  const all = await listCategories({
    limit: 200,
    fields: "id,name,handle,parent_category_id",
  }).catch(() => [])
  const byId = new Map(all.map((c) => [c.id, c]))

  // Prefer the deepest category.
  const paths = (product.categories ?? []).map((c) =>
    categoryPath(byId.get(c.id) ?? c, byId)
  )
  const path = paths.sort((a, b) => b.length - a.length)[0] ?? []
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
