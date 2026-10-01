import type { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { DIGITAL_PRODUCT_MODULE } from "../../../../../modules/digital-product"
import DigitalProductModuleService from "../../../../../modules/digital-product/service"
import { canAccessOrder, listDigitalOrders } from "../../../../lib/digital-orders"

// POST /store/digital-products/:id/download  { order_id }
// :id is a digital product media id. Returns a URL for the file once the
// caller is shown to have purchased it.
export async function POST(req: AuthenticatedMedusaRequest, res: MedusaResponse) {
  const { order_id } = (req.body ?? {}) as { order_id?: string }
  if (!order_id) {
    return res.status(400).json({ message: "order_id is required" })
  }

  const [order] = await listDigitalOrders(req.scope, { id: order_id })
  if (!order || !canAccessOrder(order, req.auth_context?.actor_id)) {
    return res.status(404).json({ message: "Order not found" })
  }

  const purchased = (order.digital_product_order?.products ?? []).some(
    (p: any) => (p.medias ?? []).some((m: any) => m.id === req.params.id)
  )
  if (!purchased) {
    return res.status(403).json({ message: "File not part of this order" })
  }

  const service: DigitalProductModuleService =
    req.scope.resolve(DIGITAL_PRODUCT_MODULE)
  const media = await service.retrieveDigitalProductMedia(req.params.id)

  const fileModule = req.scope.resolve(Modules.FILE)
  const { url } = await fileModule.retrieveFile(media.fileId)

  res.json({ url, filename: media.filename })
}
