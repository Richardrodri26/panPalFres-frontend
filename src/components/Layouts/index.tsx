import { Outlet } from "react-router-dom"
import { TopBar } from "../TopBar"


export const AdminLayout = () => {

  return (
    <>
     <TopBar />

      <div style={{ height: "calc(100vh - 48px)" }} className="bg-[#D9D9D9]">
        <Outlet />
      </div>
    </>
  )
}