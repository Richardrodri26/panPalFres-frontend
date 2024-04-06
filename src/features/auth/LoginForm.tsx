import { BasicFormProvider, InputForm } from "@/composables"
import { loginSchema, loginSchemaType } from ".."
import { FormButton } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const LoginForm = () => {
  const navigate = useNavigate()

  const onSubmit = (data: loginSchemaType) => {
    navigate("/dashboard")
  };

  const goToRegister = () => {
    navigate("/registrarse")
  }

  return (
    <BasicFormProvider submit={onSubmit} schema={loginSchema}>
      <p className="text-[#605DEC] text-xl font-semibold">Iniciar sesión</p>

      <InputForm name="email" label="Correo electronico" />
      <InputForm name="password" label="Contraseña" />

      <p onClick={goToRegister} className="hover:underline cursor-pointer">¿No tienes usuario? registrate</p>

      <FormButton className="mt-5">
        Continuar
      </FormButton>
    </BasicFormProvider>
  )
}
