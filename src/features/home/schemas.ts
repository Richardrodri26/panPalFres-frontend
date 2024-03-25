import { z } from "zod";


export const addPurchaseSchema = z.object({
  product: z.string({
    required_error: "Producto requerido"
  }),

  quantity: z.string({
    required_error: "Cantidad requerida",
    invalid_type_error: "Solo se permiten caracteres numericos"
  }).regex(/^[0-9]+$/)
})

export type addPurchaseSchemaType = z.infer<typeof addPurchaseSchema>