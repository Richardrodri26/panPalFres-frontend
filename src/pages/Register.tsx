import { Button } from "@/components/ui/button"
import { RegisterForm } from "@/features/auth/RegisterForm"
import { useNavigate } from "react-router-dom"

export const RegisterPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1)
  }
  return (
    <>
      <div className="w-full h-12 bg-white flex px-4">
        <p className="capitalize text-[#605DEC] text-xl font-semibold h-[32px] my-auto flex justify-center items-center">PAN PAL FRES</p>

      </div>

      <div style={{ height: "calc(100vh - 48px)" }} className="flex justify-center items-center bg-[#D9D9D9]">
        <div className="max-w-lg min-w-[500px] h-full max-h-[500px] bg-white rounded-md shadow-md">
          <Button className="ml-4 mt-4" onClick={goBack}>Regresar</Button>
          <RegisterForm />
        </div>
      </div>
    </>
  )
}
