import { BasicFormProvider, InputForm } from "@/composables"
import { registerSchema, registerSchemaType } from ".."
import { FormButton } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { axiosInstance } from "@/domain/api.config"
import { panPalFresEndpoints } from "@/domain/endpoints"
import   Cookies from 'js-cookie'
import { LoginInterface } from "@/interfaces"
import { useGeneral } from "@/stores"

export const RegisterForm = () => {
  const setLoginUser = useGeneral(state => state.setLoginUser)
  const { mutateAsync } = useMutation({
    mutationFn: async (data: registerSchemaType) => {
      try {
        // Aquí se realiza la petición POST para el registro
        const resMutation = await axiosInstance.post<LoginInterface>(panPalFresEndpoints.REGISTER, data)
        const res = resMutation.data

        if (res) {
          // Guardamos el token en las cookies
          Cookies.set(import.meta.env.VITE_APP_KEY_COOKIE_SESSION, res?.token)

          // Establecemos el usuario registrado
          setLoginUser(res)

          // Redirigimos al dashboard
          navigate("/login")
        }
      } catch (error) {
        // Manejo de errores si la mutación falla
        console.error("Error durante el registro:", error)
      }
    }
  })

  const navigate = useNavigate()

  const onSubmit = async (data: registerSchemaType) => {
     // Aqui es donde normalmente se envia la informacion al backend (puedes user fetch, axios junto con tanstack query si deseas)
    await mutateAsync(data)
  }

  
  return (
    <BasicFormProvider submit={onSubmit} schema={registerSchema}>
      <h2 className="text-3xl font-semibold text-[#605DEC] p-0 text-center">
        REGISTRO
      </h2>
      <p className="text-[#c7b871] text-xl font-bold mt-4">Crear una nueva cuenta</p>

      {/* Campos del formulario de registro */}
      <InputForm name="email" label="Correo electrónico"  />
      <InputForm name="password" label="Contraseña" />
      <InputForm name="fullName" label="Nombre Completo" />
      

      
      <FormButton className="mt-5">
        Registrarse
      </FormButton>
    </BasicFormProvider>
  );
};