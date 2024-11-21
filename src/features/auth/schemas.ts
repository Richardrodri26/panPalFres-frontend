import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({
    required_error: "El campo email es requerido",
    invalid_type_error: "El campo email solo acepta texto",
  }),
  password: z.string({
    required_error: "El campo contraseña es requerido",
    invalid_type_error: "El campo contraseña no acepta este formato",
  }),
})

export type loginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string({
    required_error: "El campo email es requerido",
    invalid_type_error: "El campo email solo acepta texto",
  }),
  fullName: z.string({
    required_error: "El campo nombre completo es requerido",
    invalid_type_error: "El campo nombre completo solo acepta texto",
  }),
  password: z.string({
    required_error: "El campo contraseña es requerido",
    invalid_type_error: "El campo contraseña no acepta este formato",
  }),
})

export type registerSchemaType = z.infer<typeof registerSchema>;

