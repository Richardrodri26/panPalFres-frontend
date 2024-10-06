
import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string({
    required_error: 'El campo de correo eléctronico es requerido'
  }).email("El valor ingresado no cumple con el formato de correo eléctronico"),
  // password: z.string(),
  fullName: z.string({
    required_error: 'El campo de Nombre Completo es requerido'
  }),
})

export type createUserSchemaType = z.infer<typeof createUserSchema>

export const editUserSchema = z.object({
  id: z.string(),
  email: z.string({
    required_error: 'El campo de correo eléctronico es requerido'
  }).email("El valor ingresado no cumple con el formato de correo eléctronico"),
  // password: z.string(),
  fullName: z.string({
    required_error: 'El campo de Nombre Completo es requerido'
  }),
})

export type editUserSchemaType = z.infer<typeof editUserSchema>