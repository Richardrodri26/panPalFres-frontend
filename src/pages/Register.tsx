// Importa los componentes necesarios para la página de registro
import { Button } from "@/components/ui/button"; // Botón reutilizable de la interfaz
import { RegisterForm } from "@/features/auth/RegisterForm"; // Formulario de registro
import { useNavigate } from "react-router-dom"; // Hook para la navegación en React Router

// Componente principal para la página de registro
export const RegisterPage = () => {
  // Hook para manejar la navegación entre rutas
  const navigate = useNavigate();

  // Función para regresar a la página anterior
  const goBack = () => {
    navigate(-1); // Navega a la página previa en el historial del navegador
  };

  return (
    <>
      {/* Barra superior con el título del sistema */}
      <div className="w-full h-12 bg-white flex px-4">
        <p className="capitalize text-[#605DEC] text-xl font-semibold h-[32px] my-auto flex justify-center items-center">
          PAN PAL FRES
        </p>
      </div>

      {/* Contenedor principal de la página */}
      <div
        style={{ height: "calc(100vh - 48px)" }} // Altura dinámica para ajustarse al espacio restante
        className="flex justify-center items-center bg-[#D9D9D9]"
      >
        {/* Tarjeta de registro */}
        <div className="max-w-lg min-w-[500px] h-full max-h-[500px] bg-white rounded-md shadow-md">
          {/* Botón para regresar a la página anterior */}
          <Button className="ml-4 mt-4" onClick={goBack}>
            Regresar
          </Button>
          {/* Formulario de registro */}
          <RegisterForm />
        </div>
      </div>
    </>
  );
};
