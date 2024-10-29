import { BasicFormProvider, InputForm } from "@/composables";
import { registerSchema, registerSchemaType } from "..";
import { FormButton } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGeneral } from "@/stores";
import Cookies from "js-cookie";

export const RegisterForm = () => {
  //const [email, setEmail] = useState<string>(""); // Almacenar el email
  //const [password, setPassword] = useState<string>(""); // Almacenar la contraseña
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Almacenar el mensaje de error si ocurre
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga
  const navigate = useNavigate();
  const setLoginUser = useGeneral((state) => state.setLoginUser);

  // Enviar información al backend
  const registerBackend = async (dataForm: registerSchemaType) => {
    setIsLoading(true);
    setErrorMessage(null); // Limpiar cualquier error previo

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dataForm), // Aquí se envían los datos del formulario
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message || "Error al registrar"); // Muestra el mensaje de error del backend
        return;
      }

      const data = await response.json();
      console.log("Usuario registrado exitosamente:", data);
      setLoginUser(data);
      Cookies.set(import.meta.env.VITE_APP_KEY_COOKIE_SESSION, data?.token);
      navigate("/");

    } catch (error) {
      setErrorMessage("Error de conexión. Por favor, inténtalo de nuevo más tarde.");
      console.error("Hubo un problema en la solicitud de registro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para manejar el submit del formulario
  const onSubmit = (data: registerSchemaType) => {
    console.log(data); // Revisa qué datos se están enviando
    registerBackend(data); // Llamar a la función de registro
  };

  
  return (
    <BasicFormProvider submit={onSubmit} schema={registerSchema}>
      <p className="text-[#605DEC] text-xl font-semibold">
        Registro de usuario
      </p>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <InputForm name="email" label="Correo electrónico" />
      <InputForm name="password" label="Contraseña"/>

      <FormButton className="mt-5" disabled={isLoading}>
        {isLoading ? "Registrando..." : "Continuar"} 
      </FormButton>
      
    </BasicFormProvider>
  );
};
