import { z } from "zod";

const productSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  images: z.array(z.string()), // Asumiendo que es un array de strings (URLs de imágenes)
  slug: z.string(),
  id: z.string().uuid(), // UUID para el id
});

export const createTransactionStepOneSchema = z.object({
  type: z.enum(['egreso', "ingreso"], {
    required_error: "El campo tipo de transaccion es requerido",
    invalid_type_error: "El campo tipo de transaccion solo acepta egreso o ingreso",
  }),
});


export type createTransactionStepOneSchemaType = z.infer<typeof createTransactionStepOneSchema>;

export const createTransactionStepTwoSchema = z.object({
  products: z.array(productSchema), // Arreglo de productos
});

export type createTransactionStepTwoSchemaType = z.infer<typeof createTransactionStepTwoSchema>;

// export const createTransactionSchema = z.union([createTransactionStepOneSchema, createTransactionStepTwoSchema])
// export const createTransactionSchema = z.intersection(createTransactionStepOneSchema, createTransactionStepTwoSchema)
export const createTransactionSchema = createTransactionStepOneSchema.merge(createTransactionStepTwoSchema)

export type createTransactionSchemaType = z.infer<typeof createTransactionSchema>;