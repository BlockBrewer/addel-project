import { defineMiddlewares } from "@medusajs/framework/http"
import { authenticate } from "@medusajs/medusa"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/customers/me/digital-products",
      method: ["GET"],
      middlewares: [authenticate("customer", ["session", "bearer"])],
    },
    {
      // Guests may use these with an order id; signed-in customers are
      // identified when a token/session is present.
      matcher: "/store/orders/:id/digital-products",
      method: ["GET"],
      middlewares: [
        authenticate("customer", ["session", "bearer"], {
          allowUnauthenticated: true,
        }),
      ],
    },
    {
      matcher: "/store/digital-products/:id/download",
      method: ["POST"],
      middlewares: [
        authenticate("customer", ["session", "bearer"], {
          allowUnauthenticated: true,
        }),
      ],
    },
  ],
})
