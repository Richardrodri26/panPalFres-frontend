/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasicFormProvider, InputForm } from "@/composables";
import { loginSchema, loginSchemaType } from "..";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState<string>(""); // Almacenar el email
  const [password, setPassword] = useState<string>(""); // Almacenar la contraseña
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Almacenar el mensaje de error si ocurre
  const navigate = useNavigate();

  // Enviar informacion al backend

  const loginBackend = async () => {
    try {
      const resLogin = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!resLogin.ok) {
        // Si el código de estado no está en el rango 200-299
        throw new Error(`Error en el login: ${resLogin.status}`);
      }

      const data = await resLogin.json(); // Obtener los datos en formato JSON
      console.log("Login exitoso:", data);
    } catch (error) {
      setErrorMessage(
        "Hubo un problema con el login. Por favor, verifica tus credenciales."
      );
      console.error("Hubo un problema con la solicitud de login:", error);
    }
  };
  // Función para manejar el submit del formulario
  const onSubmit = (data: loginSchemaType) => {
    navigate("/dashboard");
    loginBackend(); // Llamar a la función de login
  };

  // Función para redirigir a la página de registro
  const goToRegister = () => {
    navigate("/registrarse");
  };

  {
    /*<input
        placeholder="Prueba"
        type="text"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        placeholder="password"
        type="text"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />*/
  }

  // console.log('email', email)
  // console.log('password', password)

  return (
    <BasicFormProvider submit={onSubmit} schema={loginSchema}>
      <p className="text-[#605DEC] text-xl font-semibold">Iniciar sesión</p>

      <label>corre electronico</label>

      {/* Campo de email */}
      <input className="border border-red-500"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <label>contraseña</label>
      {/* Campo de contraseña */}
      <input className="border border-red-500"
        name="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {/* Enlace para ir al registro */}
      <p onClick={goToRegister} className="hover:underline cursor-pointer">
        ¿No tienes usuario? registrate
      </p>

      {/* Mostrar mensaje de error si existe */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* Botón para ingresar */}
      <Button onClick={loginBackend}>INGRESAR</Button>
    </BasicFormProvider>
  );
};
