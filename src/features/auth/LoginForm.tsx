import { BasicFormProvider, InputForm } from "@/composables"
import { loginSchema, loginSchemaType } from ".."
import { Button, FormButton } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('') 
  // const [dataBackend, setDataBackend] = useState() 

  const navigate = useNavigate()

  // Consultar informacion al backend

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await fetch('urlDelBackend')
  //     setDataBackend(data as any)
  //   }
  //   getData()
  // }, [])

  // Enviar informacion al backend

  const loginBackend = async () => {
    const resLogin = await fetch('http://localhost:3000/auth/login', { 
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      })
     })

     console.log('resLogin', resLogin)

  } 


  const onSubmit = (data: loginSchemaType) => {
    navigate("/dashboard")
  };

  const goToRegister = () => {
    navigate("/registrarse")
  }

  // console.log('email', email)
  // console.log('password', password)

  return (
    <BasicFormProvider submit={onSubmit} schema={loginSchema}>
      <p className="text-[#605DEC] text-xl font-semibold">Iniciar sesión</p>

      <input placeholder="Prueba" type="text" value={email} onChange={(event) => {setEmail(event.target.value)}} />
      <input placeholder="password" type="text" value={password} onChange={(event) => {setPassword(event.target.value)}} />

      {/* <InputForm name="email" label="Correo electronico" />
      <InputForm name="password" label="Contraseña" /> */}

      <p onClick={goToRegister} className="hover:underline cursor-pointer">¿No tienes usuario? registrate</p>

      {/* <FormButton className="mt-5">
        Continuar
      </FormButton> */}

      <Button onClick={loginBackend}>LOGIN BACKEND</Button>
    </BasicFormProvider>
  )
}
