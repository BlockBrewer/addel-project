import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { DIGITAL_PRODUCT_MODULE } from "../../../modules/digital-product"
import DigitalProductModuleService from "../../../modules/digital-product/service"

type MediaInput = {
  file_id: string
  filename?: string
  mime_type: string
  type?: "main" | "preview"
}

// GET /admin/digital-products?variant_id=...
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const variantId = req.query.variant_id as string | undefined

  if (!variantId) {
    return res.status(400).json({ message: "variant_id is required" })
  }

  const { data: variants } = await query.graph({
    entity: "product_variant",
    fields: [
      "id",
      "digital_product.id",
      "digital_product.name",
      "digital_product.medias.id",
      "digital_product.medias.type",
      "digital_product.medias.fileId",
      "digital_product.medias.filename",
      "digital_product.medias.mimeType",
    ],
    filters: { id: variantId },
  })

  res.json({ digital_product: (variants[0] as any)?.digital_product ?? null })
}

// POST /admin/digital-products  { name, variant_id, medias: [{ file_id, mime_type, ... }] }
// Files are uploaded first with the standard POST /admin/uploads endpoint.
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { name, variant_id, medias } = (req.body ?? {}) as {
    name?: string
    variant_id?: string
    medias?: MediaInput[]
  }
  if (!name || !variant_id || !medias?.length) {
    return res
      .status(400)
      .json({ message: "name, variant_id and medias are required" })
  }

  const service: DigitalProductModuleService =
    req.scope.resolve(DIGITAL_PRODUCT_MODULE)
  const link = req.scope.resolve(ContainerRegistrationKeys.LINK)

  const digitalProduct = await service.createDigitalProducts({
    name,
    medias: medias.map((m) => ({
      type: m.type ?? "main",
      fileId: m.file_id,
      filename: m.filename ?? null,
      mimeType: m.mime_type,
    })),
  } as any)

  await link.create({
    [DIGITAL_PRODUCT_MODULE]: { digital_product_id: digitalProduct.id },
    product: { product_variant_id: variant_id },
  })

  res.status(201).json({ digital_product: digitalProduct })
}
