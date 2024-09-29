/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasicFormProvider } from "@/composables";
import { registerSchema, registerSchemaType } from "..";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const RegisterForm = () => {
  const [email, setEmail] = useState<string>(""); // Almacenar el email
  const [password, setPassword] = useState<string>(""); // Almacenar la contraseña
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Almacenar el mensaje de error si ocurre
  const navigate = useNavigate();

  // Enviar informacion al backend

  const registerBackend = async () => {
    try {
      const createUser = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!createUser.ok) {
        // Si el código de estado no está en el rango 200-299
        throw new Error(`Error: ${createUser.status} ${createUser.statusText}`);
      }

      const data = await createUser.json(); // Obtener los datos en formato JSON
      console.log("Usuario registrado exitosamente:", data);

      return data; // Si quieres devolver los datos de la respuesta
      
    } catch (error) {
      setErrorMessage(
        "Hubo un problema con el registro. Por favor, verifica tus datos."
      );
      console.error("Hubo un problema en la solicitud de registro:", error);
    }
  };
  // Función para manejar el submit del formulario
  const onSubmit = (data: registerSchemaType) => {
    navigate("/dashboard");
    registerBackend(); // Llamar a la función de login
  };

  // Función para redirigir a la página de registro
  const goToRegister = () => {
    navigate("/registrarse");
  };

  
    

  return (
    <BasicFormProvider submit={onSubmit} schema={registerSchema}>
      <p className="text-[#605DEC] text-xl font-semibold">Iniciar sesión</p>

      <label>corre electronico</label>

      {/* Campo de email */}
      <input className="border border-red-500"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <label className="sol">contraseña</label>
      {/* Campo de contraseña */}
      <input className="border border-red-500"
        name="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {/* Mostrar mensaje de error si existe */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* Botón para ingresar */}
      <Button onClick={registerBackend}>REGISTRAR</Button>
    </BasicFormProvider>
  );
  }

