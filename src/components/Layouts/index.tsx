// Importaciones necesarias de React Router, hooks personalizados y componentes
import { Outlet } from "react-router-dom"; // Outlet para renderizar las rutas hijas
import { useSidebarToggle, useStore, useValidateUser } from "@/hooks"; // Hooks personalizados para la barra lateral y validación del usuario
import { cn } from "@/lib/utils"; // Utilidad para manejar clases condicionales
import { Sidebar } from "@/composables/SideMenu"; // Componente de la barra lateral
import { Skeleton } from "../ui/skeleton"; // Componente para mostrar un "esqueleto" mientras se cargan datos
import { Footer } from "@/composables/SideMenu/Footer"; // Componente para el pie de página

// Componente principal para el layout del panel de administración
export const AdminLayout = () => {
  // Hook para validar el estado del usuario (por ejemplo, si está autenticado o autorizado)
  const { isLoading } = useValidateUser();

  // Hook para controlar el estado del sidebar (abierto/cerrado)
  const sidebar = useStore(useSidebarToggle, (state) => state);

  // Si el estado del sidebar no está definido, no renderizar nada
  if (!sidebar) return null;

  // Si hay un error (puedes descomentar y manejar este caso)
  // if (error) {
  //   return <div>Error al cargar la información del usuario.</div>;
  // }

  return (
    <main className="flex">
      {/* Componente de la barra lateral */}
      <Sidebar />

      {/* Contenido principal que se ajusta según el estado de la barra lateral */}
      <section
        className={cn(
          "min-h-[calc(100vh_-_56px)] overflow-hidden w-full bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 px-5",
          // Clases dinámicas basadas en si el sidebar está abierto o cerrado
          // sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        {/* Mostrar un esqueleto de carga mientras se valida el usuario */}
        {isLoading ? (
          <Skeleton className="w-full h-[calc(100vh-20px)] my-auto mt-2 rounded-md" />
        ) : (
          // Una vez cargado, mostrar el contenido
          <div className="max-h-screen min-h-screen overflow-y-auto flex flex-col justify-between">
            {/* Área principal del contenido */}
            <div className="flex-1 h-full">
              {/* Renderiza las rutas hijas definidas en React Router */}
              <Outlet />
            </div>
            {/* Pie de página */}
            <Footer />
          </div>
        )}
      </section>
    </main>
  );
};
