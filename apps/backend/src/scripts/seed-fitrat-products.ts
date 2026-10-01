import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createProductsWorkflow,
  updateProductsWorkflow,
} from "@medusajs/medusa/core-flows"

// Where the product images are served from (storefront public/fitrat/*).
const STOREFRONT_URL = process.env.STOREFRONT_URL || "http://localhost:8000"

type SeedProduct = {
  title: string
  handle: string
  subtitle: string
  description: string
  image: string
  size: string
  price: number // major units, PKR
  rating: number
  reviews: number
}

const PRODUCTS: SeedProduct[] = [
  {
    title: "Premium Desi Ghee",
    handle: "desi-ghee",
    subtitle: "Traditionally crafted Bilona ghee from Sahiwal milk.",
    description:
      "Rich, aromatic, and traditionally prepared to bring authentic flavour and wholesome goodness to your meals. Made from grass-fed cow milk using the time-honoured Bilona method.",
    image: `${STOREFRONT_URL}/fitrat/desi-ghee.png`,
    size: "500ml",
    price: 1650,
    rating: 5,
    reviews: 120,
  },
  {
    title: "Pure Natural Honey",
    handle: "pure-honey",
    subtitle: "Raw, unprocessed honey from the best beekeepers.",
    description:
      "Naturally sweet, raw, and carefully sourced to preserve its authentic flavour and natural goodness. Unfiltered and unpasteurised for everyday wellness.",
    image: `${STOREFRONT_URL}/fitrat/honey.png`,
    size: "500g",
    price: 950,
    rating: 5,
    reviews: 98,
  },
  {
    title: "Natural Butter",
    handle: "natural-butter",
    subtitle: "Rich, creamy & wholesome butter made from pure milk.",
    description:
      "Pure and creamy butter churned from fresh milk for authentic taste and everyday nourishment. No preservatives, no additives.",
    image: `${STOREFRONT_URL}/fitrat/butter.png`,
    size: "500g",
    price: 650,
    rating: 5,
    reviews: 75,
  },
  {
    title: "Cold Pressed Mustard Oil",
    handle: "mustard-oil",
    subtitle: "100% pure mustard oil extracted the natural way.",
    description:
      "Bold in aroma and traditionally wood-pressed to retain its natural character, flavour, and quality. Rich in Omega 3 & 6 and great for heart health.",
    image: `${STOREFRONT_URL}/fitrat/mustard-oil.png`,
    size: "500ml",
    price: 750,
    rating: 5,
    reviews: 75,
  },
  {
    title: "Extra Virgin Olive Oil",
    handle: "olive-oil",
    subtitle: "Cold extracted for authentic taste & maximum nutrition.",
    description:
      "A smooth and premium first cold-pressed olive oil selected for everyday cooking, dressings, and healthier food choices. High in antioxidants.",
    image: `${STOREFRONT_URL}/fitrat/olive-oil.png`,
    size: "500ml",
    price: 1450,
    rating: 5,
    reviews: 58,
  },
]

const DEMO_HANDLES = ["t-shirt", "sweatshirt", "sweatpants", "shorts"]

export default async function seedFitratProducts({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  // Resolve the sales channel linked to the publishable key + a shipping profile.
  const { data: channels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })
  const salesChannel =
    channels.find((c) => c.name === "Default Sales Channel") || channels[0]

  const { data: profiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  })
  const shippingProfile = profiles[0]

  if (!salesChannel || !shippingProfile) {
    throw new Error("Missing sales channel or shipping profile — seed the store first.")
  }

  // Hide the placeholder apparel products from the storefront. They can't be
  // deleted (existing carts/orders hold inventory reservations), so we set them
  // to "draft" — the store API only returns published products.
  const { data: demoProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "status"],
    filters: { handle: DEMO_HANDLES },
  })
  const publishedDemo = demoProducts.filter((p) => p.status === "published")
  if (publishedDemo.length) {
    await updateProductsWorkflow(container).run({
      input: {
        selector: { id: publishedDemo.map((p) => p.id) },
        update: { status: ProductStatus.DRAFT },
      },
    })
    logger.info(`Unpublished ${publishedDemo.length} placeholder products.`)
  }

  // Skip Fitrat products that already exist (makes this script re-runnable).
  const { data: existing } = await query.graph({
    entity: "product",
    fields: ["handle"],
    filters: { handle: PRODUCTS.map((p) => p.handle) },
  })
  const existingHandles = new Set(existing.map((p) => p.handle))
  const toCreate = PRODUCTS.filter((p) => !existingHandles.has(p.handle))

  if (!toCreate.length) {
    logger.info("All Fitrat products already exist — nothing to create.")
    return
  }

  await createProductsWorkflow(container).run({
    input: {
      products: toCreate.map((p) => ({
        title: p.title,
        subtitle: p.subtitle,
        handle: p.handle,
        description: p.description,
        status: ProductStatus.PUBLISHED,
        shipping_profile_id: shippingProfile.id,
        weight: 500,
        thumbnail: p.image,
        images: [{ url: p.image }],
        metadata: { rating: String(p.rating), reviews: String(p.reviews) },
        options: [{ title: "Size", values: [p.size] }],
        variants: [
          {
            title: p.size,
            sku: `${p.handle.toUpperCase()}-${p.size.toUpperCase()}`,
            manage_inventory: false,
            options: { Size: p.size },
            prices: [{ amount: p.price, currency_code: "pkr" }],
          },
        ],
        sales_channels: [{ id: salesChannel.id }],
      })),
    },
  })

  logger.info(
    `Created ${toCreate.length} Fitrat products: ${toCreate
      .map((p) => p.handle)
      .join(", ")}.`
  )
}
