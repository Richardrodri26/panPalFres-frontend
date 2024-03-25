import { BasicFormProvider, InputForm } from "@/composables"
import { loginSchema, loginSchemaType } from ".."
import { FormButton } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const LoginForm = () => {
  const navigate = useNavigate()

  const onSubmit = (data: loginSchemaType) => {
    navigate("/dashboard")
  }

  return (
    <BasicFormProvider submit={onSubmit} schema={loginSchema}>
      <p className="text-[#605DEC] text-xl font-semibold">Iniciar sesión</p>

      <InputForm name="email" label="Correo electronico" />
      <InputForm name="password" label="Contraseña" />

      <FormButton className="mt-5">
        Continuar
      </FormButton>
    </BasicFormProvider>
  )
}
