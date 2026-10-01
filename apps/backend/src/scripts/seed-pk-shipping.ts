import { MedusaContainer } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { createShippingOptionsWorkflow } from "@medusajs/medusa/core-flows"

const SHIPPING_NAME = "Standard Delivery"
const SHIPPING_AMOUNT = 200 // PKR, flat rate

export default async function seedPkShipping({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  // Region (for a region-scoped price).
  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["id", "name", "currency_code"],
  })
  const pkRegion =
    regions.find((r) => r.currency_code === "pkr") ||
    regions.find((r) => r.name?.toLowerCase() === "pakistan")
  if (!pkRegion) {
    throw new Error("No Pakistan/PKR region found.")
  }

  // Service zone that covers Pakistan.
  const { data: serviceZones } = await query.graph({
    entity: "service_zone",
    fields: ["id", "name", "geo_zones.country_code", "shipping_options.id"],
  })
  const pkZone = serviceZones.find((z) =>
    (z.geo_zones ?? []).some((g: { country_code?: string }) => g.country_code === "pk")
  )
  if (!pkZone) {
    throw new Error("No service zone covering 'pk' found — create one in Settings → Locations & Shipping first.")
  }

  if ((pkZone.shipping_options ?? []).length > 0) {
    logger.info(
      `Service zone "${pkZone.name}" already has ${pkZone.shipping_options.length} shipping option(s). Skipping.`
    )
    return
  }

  // Default shipping profile.
  const { data: profiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  })
  const shippingProfile = profiles[0]
  if (!shippingProfile) {
    throw new Error("No shipping profile found.")
  }

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: SHIPPING_NAME,
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: pkZone.id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Delivery in 2–4 working days. Pay cash on delivery.",
          code: "standard",
        },
        prices: [
          { currency_code: "pkr", amount: SHIPPING_AMOUNT },
          { region_id: pkRegion.id, amount: SHIPPING_AMOUNT },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
    ],
  })

  logger.info(
    `Created shipping option "${SHIPPING_NAME}" (Rs. ${SHIPPING_AMOUNT}) on service zone "${pkZone.name}".`
  )
}
