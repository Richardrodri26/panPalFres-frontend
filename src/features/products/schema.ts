import { z } from "zod";

// Definición de las expresiones regulares
const REGEX_STOCK = /^\d+$/;

export const productSchema = z.object({
  title: z.string({
    required_error: "El título es obligatorio",
    invalid_type_error: "El título debe ser una cadena de texto",
  }).min(1, "El título no puede estar vacío"),
  
  price: z.string({
    required_error: "El precio es obligatorio",
    invalid_type_error: "El precio debe ser una cadena de texto",
  }).regex(REGEX_STOCK, "El precio debe ser un número válido con hasta 2 decimales"),  
  description: z.string({
    required_error: "La descripción es obligatoria",
    invalid_type_error: "La descripción debe ser una cadena de texto",
  }).min(1, "La descripción no puede estar vacía"),
  
  stock: z.string({
    required_error: "El stock es obligatorio",
    invalid_type_error: "El stock debe ser una cadena de texto",
  }).regex(REGEX_STOCK, "El stock debe ser un número entero válido"),
});

export type productSchemaType = z.infer<typeof productSchema>;