import { Outlet } from "react-router-dom"
import { TopBar } from "../TopBar"
import { useSidebarToggle, useStore } from "@/hooks";
import { cn } from "@/lib/utils"
import { Sidebar } from "@/composables/SideMenu";


export const AdminLayout = () => {

  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />


      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 px-5",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Outlet />
      </main>

    </>
  )
}