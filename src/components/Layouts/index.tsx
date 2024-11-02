import { Outlet } from "react-router-dom";
import { useSidebarToggle, useStore, useValidateUser } from "@/hooks";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/composables/SideMenu";
import { Skeleton } from "../ui/skeleton";
import { Footer } from "@/composables/SideMenu/Footer"; // Asegúrate de que esto esté importado

export const AdminLayout = () => {
  const { isLoading, error } = useValidateUser();
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  if (error) {
    return <div>Error al cargar la información del usuario.</div>;
  }

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 px-5",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        {
          isLoading
            ? (
              <Skeleton className="w-full h-[calc(100vh-20px)] my-auto mt-2 rounded-md" />
            )
            : (
              <Outlet />
            )
        }
      </main>
      <Footer />
    </>
  );
}
