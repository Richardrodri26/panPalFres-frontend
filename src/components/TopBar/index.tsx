import { useNavigate } from "react-router-dom"

export const TopBar = () => {
  const navigate = useNavigate();
  
  const onLogout = () => {
    navigate("/")
  }

  return (
    <div className="w-full h-12 bg-white flex justify-between items-center px-4">
      <p className="capitalize text-[#605DEC] text-xl font-semibold h-[32px] my-auto flex justify-center items-center">PAN PAL FRES</p>

      <p onClick={onLogout} className="capitalize text-[#605DEC] text-md">Cerrar sesión</p>
    </div>
  )
}