import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { DIGITAL_PRODUCT_MODULE } from "../modules/digital-product"
import DigitalProductModuleService from "../modules/digital-product/service"
import { OrderStatus } from "../modules/digital-product/models/digital-product-order"

// When an order is placed, record which digital products it contains so the
// customer can download them from the confirmation page / My Account.
export default async function digitalOrderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const service: DigitalProductModuleService =
    container.resolve(DIGITAL_PRODUCT_MODULE)

  const {
    data: [order],
  } = await query.graph({
    entity: "order",
    fields: ["id", "items.variant_id", "digital_product_order.id"],
    filters: { id: data.id },
  })

  if (!order || (order as any).digital_product_order?.id) {
    return // unknown order, or already processed
  }

  const variantIds = ((order as any).items ?? [])
    .map((i: { variant_id?: string }) => i.variant_id)
    .filter(Boolean) as string[]
  if (!variantIds.length) return

  const { data: variants } = await query.graph({
    entity: "product_variant",
    fields: ["id", "digital_product.id"],
    filters: { id: variantIds },
  })

  const productIds = [
    ...new Set(
      variants
        .map((v: any) => v.digital_product?.id as string | undefined)
        .filter(Boolean)
    ),
  ] as string[]
  if (!productIds.length) return

  const digitalOrder = await service.createDigitalProductOrders({
    status: OrderStatus.SENT,
    products: productIds,
  } as any)

  await link.create({
    [DIGITAL_PRODUCT_MODULE]: { digital_product_order_id: digitalOrder.id },
    [Modules.ORDER]: { order_id: order.id },
  })

  logger.info(
    `Digital products attached to order ${order.id}: ${productIds.join(", ")}`
  )
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
