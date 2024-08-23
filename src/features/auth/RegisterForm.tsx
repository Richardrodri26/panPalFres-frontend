import { BasicFormProvider, InputForm } from "@/composables"
import { registerSchema, registerSchemaType } from ".."
import { FormButton } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const RegisterForm = () => {
  const navigate = useNavigate()

  const urlBackend = import.meta.env.VITE_APP_BACKEND

  const onSubmit = (data: registerSchemaType) => {
    navigate("/dashboard")

    //NOTE: Aqui debe estar el enviar peticion al backend para crear usuario
    

  }

  return (
    <BasicFormProvider submit={onSubmit} schema={registerSchema}>
      <p className="text-[#605DEC] text-xl font-semibold">Registro de usuario</p>

      <InputForm name="email" label="Correo electronico" />
      <InputForm name="password" label="Contraseña" />

      <FormButton className="mt-5">
        Continuar
      </FormButton>
    </BasicFormProvider>
  )
}
