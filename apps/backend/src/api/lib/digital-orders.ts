import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import type { MedusaContainer } from "@medusajs/framework"

const FIELDS = [
  "id",
  "display_id",
  "created_at",
  "email",
  "customer_id",
  "customer.has_account",
  "digital_product_order.id",
  "digital_product_order.products.id",
  "digital_product_order.products.name",
  "digital_product_order.products.medias.id",
  "digital_product_order.products.medias.type",
  "digital_product_order.products.medias.filename",
  "digital_product_order.products.medias.mimeType",
]

export type DigitalOrderSummary = {
  order_id: string
  display_id: number
  created_at: string
  products: {
    id: string
    name: string
    medias: {
      id: string
      filename: string | null
      mime_type: string
    }[]
  }[]
}

export const listDigitalOrders = async (
  container: MedusaContainer,
  filters: Record<string, unknown>
) => {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const { data: orders } = await query.graph({
    entity: "order",
    fields: FIELDS,
    filters,
  })
  return orders as any[]
}

export const toSummary = (order: any): DigitalOrderSummary | null => {
  const products = order.digital_product_order?.products ?? []
  if (!products.length) return null
  return {
    order_id: order.id,
    display_id: order.display_id,
    created_at: order.created_at,
    products: products.map((p: any) => ({
      id: p.id,
      name: p.name,
      medias: (p.medias ?? [])
        .filter((m: any) => m.type === "main")
        .map((m: any) => ({
          id: m.id,
          filename: m.filename ?? null,
          mime_type: m.mimeType,
        })),
    })),
  }
}

/**
 * Orders placed by guests (no account) are accessible to whoever knows the
 * unguessable order id, exactly like the order confirmation page. Orders that
 * belong to a registered customer require that customer to be signed in.
 */
export const canAccessOrder = (order: any, actorId?: string) => {
  if (order.customer?.has_account) {
    return !!actorId && actorId === order.customer_id
  }
  return true
}
