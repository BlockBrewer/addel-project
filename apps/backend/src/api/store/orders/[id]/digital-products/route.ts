import type { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import {
  canAccessOrder,
  listDigitalOrders,
  toSummary,
} from "../../../../lib/digital-orders"

// GET /store/orders/:id/digital-products
export async function GET(req: AuthenticatedMedusaRequest, res: MedusaResponse) {
  const [order] = await listDigitalOrders(req.scope, { id: req.params.id })

  if (!order || !canAccessOrder(order, req.auth_context?.actor_id)) {
    return res.status(404).json({ message: "Order not found" })
  }

  res.json({ digital_order: toSummary(order) })
}
