import { model } from "@medusajs/framework/utils"
import DigitalProduct from "./digital-product"

export enum OrderStatus {
  PENDING = "pending",
  SENT = "sent",
}

const DigitalProductOrder = model.define("digital_product_order", {
  id: model.id().primaryKey(),
  status: model.enum(OrderStatus).default(OrderStatus.PENDING),
  products: model.manyToMany(() => DigitalProduct, {
    mappedBy: "orders",
    pivotTable: "digitalproduct_digitalproductorders",
    joinColumn: "digitalproduct_order_id",
    inverseJoinColumn: "digitalproduct_id",
  }),
})

export default DigitalProductOrder
