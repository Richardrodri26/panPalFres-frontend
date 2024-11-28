// Importa el componente de formulario de inicio de sesión desde la carpeta de funcionalidades
import { LoginForm } from "@/features";

// Componente para la página de inicio de sesión
export const LoginPage = () => {
  return (
    <>
      {/* Barra superior con el nombre de la empresa */}
      <div className="w-full h-12 bg-white flex px-4">
        <p className="capitalize text-[#605DEC] text-xl font-semibold h-[32px] my-auto flex justify-center items-center">
          PAN PAL FRES
        </p>
      </div>

      {/* Contenedor principal para la página */}
      <div
        style={{ height: "calc(100vh - 48px)" }} // Calcula la altura restante de la ventana para ocupar toda la pantalla
        className="flex justify-center items-center bg-[#8b8c704d]" // Fondo semitransparente
      >
        {/* Columna izquierda: Imagen del logo de la empresa */}
        <div className="max-w-lg min-w-[500px] h-full max-h-[500px] bg-[#ebf2280f] rounded-md shadow-md">
          <div className="mt-20">
            <img
              src="\public\logo empresa.png" // Ruta relativa a la imagen del logo
              alt="Delicias" // Texto alternativo en caso de error al cargar la imagen
              className="w-full h-auto rounded-md" // Imagen redondeada y con tamaño responsivo
            />
          </div>
        </div>

        {/* Columna derecha: Formulario de inicio de sesión */}
        <div className="max-w-lg min-w-[500px] h-full max-h-[500px] bg-white rounded-md shadow-md">
          {/* Componente que contiene el formulario de login */}
          <LoginForm />
        </div>
      </div>
    </>
  );
};
