import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createTaxRegionsWorkflow,
  updateProductsWorkflow,
} from "@medusajs/medusa/core-flows"
import { DIGITAL_PRODUCT_MODULE } from "../modules/digital-product"
import DigitalProductModuleService from "../modules/digital-product/service"

// Placeholder artwork served by the storefront (apps/storefront/public/aquacraft).
const STOREFRONT_URL = process.env.STOREFRONT_URL || "http://localhost:8000"
const img = (name: string) => `${STOREFRONT_URL}/aquacraft/${name}`

const REGION_NAME = "United States"
const REGION_COUNTRIES = ["us", "ca", "au", "nz", "ie", "nl", "be", "at", "ch", "no", "fi", "pt", "sg", "jp", "pk"]

// Old demo / previous-brand products that must not show in the new store.
const LEGACY_HANDLES = [
  "t-shirt", "sweatshirt", "sweatpants", "shorts",
  "desi-ghee", "pure-honey", "natural-butter", "mustard-oil", "olive-oil",
]

type Cat = { name: string; handle: string; children?: Cat[] }
const CATEGORIES: Cat[] = [
  { name: "SVGs", handle: "svgs", children: [
    { name: "SVG Bundles", handle: "svg-bundles" },
    { name: "Holiday SVGs", handle: "holiday-svgs" },
    { name: "Animals & Nature", handle: "animals-nature" },
  ] },
  { name: "Canva Templates", handle: "canva-templates", children: [
    { name: "Social Media", handle: "social-media", children: [
      { name: "Instagram", handle: "instagram" },
    ] },
    { name: "Pinterest Pins", handle: "pinterest-pins" },
  ] },
  { name: "Printables", handle: "printables", children: [
    { name: "Wall Art", handle: "wall-art" },
    { name: "Coloring Pages", handle: "coloring-pages" },
    { name: "Activity Sheets", handle: "activity-sheets" },
  ] },
  { name: "Planners", handle: "planners", children: [
    { name: "Daily Planners", handle: "daily-planners" },
    { name: "Weekly Planners", handle: "weekly-planners" },
    { name: "Budget Planners", handle: "budget-planners" },
  ] },
  { name: "Journals", handle: "journals", children: [
    { name: "Gratitude Journals", handle: "gratitude-journals" },
    { name: "Bullet Journals", handle: "bullet-journals" },
  ] },
  { name: "Mockups", handle: "mockups", children: [
    { name: "Apparel Mockups", handle: "apparel-mockups" },
    { name: "Mug & Tumbler Mockups", handle: "mug-tumbler-mockups" },
  ] },
  { name: "3D Prints", handle: "3d-prints", children: [
    { name: "Home Decor", handle: "home-decor" },
    { name: "Toys & Games", handle: "toys-games" },
  ] },
  { name: "Sublimation", handle: "sublimation" },
  { name: "Digital Papers", handle: "digital-papers" },
]

type SeedProduct = {
  title: string
  handle: string
  description: string
  images: string[]
  price: number // USD, major units
  compareAt?: number
  rating: number
  reviews: number
  category: string // leaf category handle
  features: string[]
  format: string
}

const PRODUCTS: SeedProduct[] = [
  {
    title: "Spooky Vibes SVG Bundle",
    handle: "spooky-vibes-svg-bundle",
    description: "A haunting collection of Halloween SVG cut files — pumpkins, ghosts, bats and spooky sayings — ready for Cricut and Silhouette.",
    images: [img("spooky-vibes.jpg")],
    price: 4.99, rating: 5, reviews: 124, category: "holiday-svgs", format: "SVG, PNG, DXF, EPS",
    features: ["60 Unique Designs", "SVG, PNG, DXF & EPS", "Works with Cricut & Silhouette", "Instant Download", "Commercial Use"],
  },
  {
    title: "Watercolor Butterflies Clipart Set",
    handle: "watercolor-butterflies-clipart-set",
    description: "Delicate hand-painted watercolor butterflies on transparent backgrounds. Perfect for invitations, stickers and décor.",
    images: [img("watercolor-butterflies.jpg")],
    price: 3.49, rating: 5, reviews: 86, category: "wall-art", format: "PNG (300 DPI)",
    features: ["24 Transparent PNGs", "300 DPI High Resolution", "Instant Download", "Commercial Use"],
  },
  {
    title: "Boho Rainbow Tumbler Wrap",
    handle: "boho-rainbow-tumbler-wrap",
    description: "A seamless boho rainbow sublimation wrap sized for 20oz skinny tumblers.",
    images: [img("boho-rainbow.jpg")],
    price: 4.49, rating: 5, reviews: 92, category: "sublimation", format: "PNG (300 DPI)",
    features: ["Seamless 20oz Skinny Wrap", "Sublimation Ready", "Instant Download", "Commercial Use"],
  },
  {
    title: "Ocean Bloom Digital Paper Pack",
    handle: "ocean-bloom-digital-paper-pack",
    description: "12 coastal-floral seamless patterns in calming ocean blues for scrapbooking, packaging and print-on-demand.",
    images: [img("ocean-bloom.jpg")],
    price: 3.99, rating: 5, reviews: 77, category: "digital-papers", format: "JPG (12x12 in, 300 DPI)",
    features: ["12 Seamless Patterns", "12x12 in, 300 DPI", "Instant Download", "Commercial Use"],
  },
  {
    title: "Floral Alphabet SVG Bundle",
    handle: "floral-alphabet-svg-bundle",
    description: "A–Z and 0–9 floral monogram letters as layered SVG cut files.",
    images: [img("floral-alphabet.jpg")],
    price: 5.99, rating: 5, reviews: 165, category: "svg-bundles", format: "SVG, PNG, DXF",
    features: ["36 Layered Letters & Numbers", "SVG, PNG & DXF", "Works with Cricut & Silhouette", "Commercial Use"],
  },
  {
    title: "Cute Animals Coloring Book",
    handle: "cute-animals-coloring-book",
    description: "30 adorable animal coloring pages for kids, printable at home on US Letter paper.",
    images: [img("cute-animals.jpg")],
    price: 4.99, rating: 5, reviews: 98, category: "coloring-pages", format: "PDF (US Letter)",
    features: ["30 Printable Pages", "US Letter PDF", "Instant Download", "Personal Use"],
  },
  {
    title: "50 Aesthetic Instagram Post Templates",
    handle: "50-aesthetic-instagram-post-templates",
    description: "Beautiful, modern Instagram post templates perfect for your brand, business or personal use. Fully editable in Canva.",
    images: [img("instagram-templates.jpg"), img("instagram-thumb-2.jpg")],
    price: 8.99, compareAt: 14.99, rating: 4, reviews: 128, category: "instagram", format: "Canva template link (PDF)",
    features: ["50 Unique Templates", "1080 x 1080 px", "Fully Editable in Canva", "Instant Download", "Commercial Use"],
  },
]

export default async function seedAquacraft({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const link = container.resolve(ContainerRegistrationKeys.LINK)

  const { data: channels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })
  const salesChannel =
    channels.find((c) => c.name === "Default Sales Channel") || channels[0]
  if (!salesChannel) {
    throw new Error("No sales channel found — run `medusa db:migrate` first.")
  }

  // 1. USD region ---------------------------------------------------------
  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["id", "name", "countries.iso_2"],
  })
  if (!regions.find((r) => r.name === REGION_NAME)) {
    const taken = new Set(
      regions.flatMap((r) => (r.countries ?? []).map((c: any) => c.iso_2))
    )
    const countries = REGION_COUNTRIES.filter((c) => !taken.has(c))
    await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: REGION_NAME,
            currency_code: "usd",
            countries,
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    })
    try {
      await createTaxRegionsWorkflow(container).run({
        input: countries.map((country_code) => ({
          country_code,
          provider_id: "tp_system",
        })),
      })
    } catch (e) {
      logger.warn(`Tax regions skipped: ${(e as Error).message}`)
    }
    logger.info(`Created region "${REGION_NAME}" (USD).`)
  }

  // 2. Categories ---------------------------------------------------------
  const { data: existingCats } = await query.graph({
    entity: "product_category",
    fields: ["id", "handle"],
  })
  const catIds = new Map<string, string>(
    existingCats.map((c) => [c.handle as string, c.id as string])
  )
  const createCats = async (cats: Cat[], parentId?: string) => {
    const missing = cats.filter((c) => !catIds.has(c.handle))
    if (missing.length) {
      const { result } = await createProductCategoriesWorkflow(container).run({
        input: {
          product_categories: missing.map((c) => ({
            name: c.name,
            handle: c.handle,
            is_active: true,
            parent_category_id: parentId,
          })),
        },
      })
      result.forEach((c) => catIds.set(c.handle, c.id))
    }
    for (const c of cats) {
      if (c.children) await createCats(c.children, catIds.get(c.handle))
    }
  }
  await createCats(CATEGORIES)
  logger.info("Categories ready.")

  // 3. Hide legacy products ----------------------------------------------
  const { data: legacy } = await query.graph({
    entity: "product",
    fields: ["id", "status"],
    filters: { handle: LEGACY_HANDLES },
  })
  const published = legacy.filter((p) => p.status === "published")
  if (published.length) {
    await updateProductsWorkflow(container).run({
      input: {
        selector: { id: published.map((p) => p.id) },
        update: { status: ProductStatus.DRAFT },
      },
    })
    logger.info(`Unpublished ${published.length} legacy products.`)
  }

  // 4. Digital products ---------------------------------------------------
  const { data: existing } = await query.graph({
    entity: "product",
    fields: ["handle"],
    filters: { handle: PRODUCTS.map((p) => p.handle) },
  })
  const have = new Set(existing.map((p) => p.handle))
  const toCreate = PRODUCTS.filter((p) => !have.has(p.handle))
  if (!toCreate.length) {
    logger.info("All AquaCraft products already exist.")
    return
  }

  // No shipping profile => items don't require shipping, so checkout skips it.
  const { result: created } = await createProductsWorkflow(container).run({
    input: {
      products: toCreate.map((p) => ({
        title: p.title,
        handle: p.handle,
        description: p.description,
        status: ProductStatus.PUBLISHED,
        thumbnail: p.images[0],
        images: p.images.map((url) => ({ url })),
        category_ids: [catIds.get(p.category)!],
        metadata: {
          rating: String(p.rating),
          reviews: String(p.reviews),
          features: p.features.join("|"),
          file_format: p.format,
          ...(p.compareAt ? { compare_at_price: String(p.compareAt) } : {}),
        },
        options: [{ title: "License", values: ["Standard"] }],
        variants: [
          {
            title: "Standard",
            sku: p.handle.toUpperCase(),
            manage_inventory: false,
            options: { License: "Standard" },
            prices: [{ amount: p.price, currency_code: "usd" }],
          },
        ],
        sales_channels: [{ id: salesChannel.id }],
      })),
    },
  })

  // 5. Attach a placeholder download to each product ---------------------
  const fileModule = container.resolve(Modules.FILE)
  const digital: DigitalProductModuleService = container.resolve(
    DIGITAL_PRODUCT_MODULE
  )
  for (const product of created) {
    const filename = `${product.handle}.txt`
    const [file] = await fileModule.createFiles([
      {
        filename,
        mimeType: "text/plain",
        access: "public",
        content: Buffer.from(
          `Thank you for purchasing "${product.title}"!\n\nThis is a placeholder file. Replace it in the admin: Products → ${product.title} → variant → Digital files.\n`
        ).toString("base64"),
      },
    ])
    const dp = await digital.createDigitalProducts({
      name: product.title,
      medias: [
        { type: "main", fileId: file.id, filename, mimeType: "text/plain" },
      ],
    } as any)
    await link.create({
      [DIGITAL_PRODUCT_MODULE]: { digital_product_id: dp.id },
      [Modules.PRODUCT]: { product_variant_id: product.variants![0].id },
    })
  }

  logger.info(`Created ${created.length} AquaCraft products.`)
}
