import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { DIGITAL_PRODUCT_MODULE } from "../../../../modules/digital-product"
import DigitalProductModuleService from "../../../../modules/digital-product/service"

// DELETE /admin/digital-products/:id
export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const service: DigitalProductModuleService =
    req.scope.resolve(DIGITAL_PRODUCT_MODULE)
  await service.deleteDigitalProducts(req.params.id)
  res.json({ id: req.params.id, deleted: true })
}
