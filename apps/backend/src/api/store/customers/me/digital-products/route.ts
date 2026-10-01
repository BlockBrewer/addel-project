import type { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { listDigitalOrders, toSummary } from "../../../../lib/digital-orders"

// GET /store/customers/me/digital-products
export async function GET(req: AuthenticatedMedusaRequest, res: MedusaResponse) {
  const customerId = req.auth_context.actor_id

  const orders = await listDigitalOrders(req.scope, { customer_id: customerId })

  res.json({
    digital_orders: orders
      .map(toSummary)
      .filter(Boolean)
      .sort((a, b) => (a!.created_at < b!.created_at ? 1 : -1)),
  })
}
