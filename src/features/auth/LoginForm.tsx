import { BasicFormProvider, InputForm } from "@/composables"
import { loginSchema, loginSchemaType } from ".."
import { Button, FormButton } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useMutation } from "react-query"
import { axiosInstance } from "@/domain/api.config"
import { panPalFresEndpoints } from "@/domain/endpoints"
import Cookies from 'js-cookie'
import { LoginInterface } from "@/interfaces"
import { useGeneral } from "@/stores"
import { toast } from "sonner"

export const LoginForm = () => {
  const setLoginUser = useGeneral(state => state.setLoginUser)
  const { mutateAsync } = useMutation({
    mutationFn: async (data: loginSchemaType) => {
      try {
        const resMutation = await axiosInstance.post<LoginInterface>(panPalFresEndpoints.LOGIN, data)
        const res = resMutation.data


        if (res) {
          Cookies.set(import.meta.env.VITE_APP_KEY_COOKIE_SESSION, res?.token)

          setLoginUser(res)

          navigate("/dashboard")
        }
      } catch (error) {
        // const errorBackend = (error as any)?.response?.data?.message
        // if (errorBackend) {
        //   toast.error(errorBackend)
        // } else {
        //   toast.error("Oops, hubo un error al iniciar sesión")

        // }

      }
    }
  })

  const navigate = useNavigate()



  // const loginBackend = async () => {
  //   const resLogin = await fetch('http://localhost:3000/auth/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json', // Tipo de contenido que estamos enviando
  //     },
  //     body: JSON.stringify({
  //       email: 'prueba@email.com',
  //       password: '123456789',
  //       // email: email,
  //       // password: password,
  //     })
  //   })
  // }


  const onSubmit = async (data: loginSchemaType) => {
    await mutateAsync(data)
  };

  const goToRegister = () => {
    navigate("/registrarse")
  }

  // console.log('email', email)
  // console.log('password', password)

  return (
    <BasicFormProvider submit={onSubmit} schema={loginSchema}>
      <p className="text-[#605DEC] text-xl font-semibold">Iniciar sesión</p>

      {/* <input placeholder="Prueba" type="text" value={email} onChange={(event) => { setEmail(event.target.value) }} />
      <input placeholder="password" type="text" value={password} onChange={(event) => { setPassword(event.target.value) }} /> */}

      <InputForm name="email" label="Correo electronico" />
      <InputForm name="password" label="Contraseña" />

      <p onClick={goToRegister} className="hover:underline cursor-pointer">¿No tienes usuario? registrate</p>

      <FormButton className="mt-5">
        Continuar
      </FormButton>

      {/* <Button onClick={loginBackend}>LOGIN BACKEND</Button> */}
    </BasicFormProvider>
  )
}
