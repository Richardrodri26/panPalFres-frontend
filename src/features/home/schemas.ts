import { z } from "zod";

const productSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  images: z.array(z.string()), // Asumiendo que es un array de strings (URLs de imágenes)
  slug: z.string(),
  id: z.string().uuid(), // UUID para el id
});

export const addPurchaseSchema = z.object({
  type: z.enum(['egreso', 'ingreso']), // Acepta 'egreso' o 'ingreso'
  products: z.array(productSchema), // Arreglo de productos
});

export type addPurchaseSchemaType = z.infer<typeof addPurchaseSchema>