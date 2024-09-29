import { BasicFormProvider, InputForm } from "@/composables"
import { loginSchema, loginSchemaType } from ".."
import { FormButton } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { axiosInstance } from "@/domain/api.config"
import { panPalFresEndpoints } from "@/domain/endpoints"
import Cookies from 'js-cookie'
import { LoginInterface } from "@/interfaces"
import { useGeneral } from "@/stores"

export const LoginForm = () => {
  const setLoginUser = useGeneral(state => state.setLoginUser)
  const { mutateAsync } = useMutation({
    mutationFn: async (data: loginSchemaType) => {
      try {

        // Uso la instancia de axios configurada para nuestro backend
        // Como ruta para el endpoint llamo la configurada en el objeto panPalFresEndpoints
        // EJEMPLO: panPalFresEndpoints.LOGIN = '/auth/login'
        // Cuando se envie la peticion al backend lucira asi http://localhost:3000/auth/login
        const resMutation = await axiosInstance.post<LoginInterface>(panPalFresEndpoints.LOGIN, data)
        const res = resMutation.data

        if (res) {
          // Aqui guardo en una cookie la informacion del token del usuario
          Cookies.set(import.meta.env.VITE_APP_KEY_COOKIE_SESSION, res?.token)

          setLoginUser(res)


          // Esto redirige a otra pagina
          navigate("/dashboard")
        }
      } catch (error) {
      }
    }
  })

  const navigate = useNavigate()


  const onSubmit = async (data: loginSchemaType) => {

    // Aqui es donde normalmente se envia la informacion al backend (puedes user fetch, axios junto con tanstack query si deseas)

    await mutateAsync(data)
  };

  const goToRegister = () => {
    navigate("/registrarse")
  }


  return (
    // El schema es para validar los campos de formulario
    <BasicFormProvider submit={onSubmit} schema={loginSchema}>
      <h2 className="text-3xl font-semibold text-[#605DEC] p-0 text-center ">
        LOGIN
      </h2>
      <p className="text-[#c7b871] text-xl font-bold mt-4">Iniciar sesión</p>


      {/* En el input se debe enviar como name el nombre de la propiedad como se declaro en el schema */}
      <InputForm name="email" label="Correo electronico" />
      <InputForm name="password" label="Contraseña" />

      <p onClick={goToRegister} className="hover:underline cursor-pointer">¿No tienes usuario? registrate</p>

      {/* El form button solo se habilita cuando el formulario es valido, cuando se habilita el boton y se da clic se ejecutara la funcion submit */}
      <FormButton className="mt-5">
        Continuar
      </FormButton>

    </BasicFormProvider>
  );
};
