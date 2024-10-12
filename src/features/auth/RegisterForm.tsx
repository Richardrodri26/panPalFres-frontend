/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasicFormProvider, InputForm } from "@/composables";
import { registerSchema, registerSchemaType } from "..";
import { FormButton } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGeneral } from "@/stores";
import Cookies from "js-cookie";

export const RegisterForm = () => {
  const [email, setEmail] = useState<string>(""); // Almacenar el email
  const [password, setPassword] = useState<string>(""); // Almacenar la contraseña
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Almacenar el mensaje de error si ocurre
  const navigate = useNavigate();
  const setLoginUser = useGeneral(state => state.setLoginUser)

  // Enviar informacion al backend

  const registerBackend = async (dataForm: registerSchemaType) => {
    try {
      const createUser = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...dataForm,
          fullName: 'PRUEBA DORANCE'
        }),
      });

      if (!createUser.ok) {
        // Si el código de estado no está en el rango 200-299
        throw new Error(`Error: ${createUser.status} ${createUser.statusText}`);
      }

      const data = await createUser.json(); // Obtener los datos en formato JSON
      console.log("Usuario registrado exitosamente:", data);
      setLoginUser(data)

      Cookies.set(import.meta.env.VITE_APP_KEY_COOKIE_SESSION, data?.token)

      navigate("/dashboard");

      // return data; // Si quieres devolver los datos de la respuesta
      
    } catch (error) {
      setErrorMessage(
        "Hubo un problema con el registro. Por favor, verifica tus datos."
      );
      console.error("Hubo un problema en la solicitud de registro:", error);
    }
  };
  // Función para manejar el submit del formulario
  const onSubmit = (data: registerSchemaType) => {
    registerBackend(data); // Llamar a la función de login
    
  };

  // Función para redirigir a la página de registro
  const goToRegister = () => {
    navigate("/registrarse");
  };

  
    

  return (
    <BasicFormProvider submit={onSubmit} schema={registerSchema}>
      <p className="text-[#605DEC] text-xl font-semibold">Registro de usuario</p>

      <InputForm name="email" label="Correo electronico" />
      <InputForm name="password" label="Contraseña" />

      <FormButton className="mt-5">
        Continuar
      </FormButton>
    </BasicFormProvider>
  );
  }

