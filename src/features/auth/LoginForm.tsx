/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasicFormProvider } from "@/composables";
import { loginSchema, loginSchemaType } from "..";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


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

  return (
    <BasicFormProvider submit={onSubmit} schema={loginSchema}>
      <h2 className="text-3xl font-semibold text-[#605DEC] p-0 text-center ">
        LOGIN
      </h2>
      <p className="text-[#c7b871] text-xl font-bold mt-4">Iniciar sesión</p>

      {/* Campo de email */}

      <div className="mt-6">
        <label className="text-lg font-medium">email</label>
        <input
          className="w-full border-2 border-grey-100 rounded-xl p-4 mt-2 bg-transparent"
          placeholder="Ingrese su correo"
          name="email"
          value={email}
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          size={30} // En TypeScript es importante que el valor sea un número
          minLength={4}
          maxLength={30}
          required
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
        />
      </div>

      {/* Campo de contraseña */}

      <div className="mt-3">
        <label className="text-lg font-medium">Password</label>
        <input
          className="w-full border-2 border-grey-100 rounded-xl p-4 mt-2 bg-transparent"
          placeholder="Ingrese tu contraseña Mínimo 8 caracteres, al menos una letra y un número"
          name="clave"
          value={password}
          type="password"
          size={15}
          minLength={8}
          maxLength={15}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {/* Enlace para ir al registro */}

      <div className="mt-3">
        <p className="py-1 text-center text-[#605DEC] text-lg font-bold hoover:scale-[1.01]" onClick={goToRegister}>
          ¿No tienes usuario? registrate
        </p>
      </div>

      {/* Mostrar mensaje de error si existe */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* Botón para ingresar */}

      <div className="mt-5 flex flex-col">
        <Button
          onClick={loginBackend}
          className=" active:scale-[.98] active-duration-75 hoover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-[#D2D2CA] text-[#c7b871] text-lg font-bold"
        >
          INGRESAR
        </Button>
      </div>

    
    </BasicFormProvider>
  );
};
