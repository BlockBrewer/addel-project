import { model } from "@medusajs/framework/utils"
import DigitalProduct from "./digital-product"

export enum MediaType {
  MAIN = "main",
  PREVIEW = "preview",
}

const DigitalProductMedia = model.define("digital_product_media", {
  id: model.id().primaryKey(),
  type: model.enum(MediaType),
  // ID of the file in the File Module (as returned by /admin/uploads)
  fileId: model.text(),
  // Original filename, shown to customers
  filename: model.text().nullable(),
  mimeType: model.text(),
  digital_product: model.belongsTo(() => DigitalProduct, {
    mappedBy: "medias",
  }),
})

export default DigitalProductMedia
