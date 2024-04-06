import { ResumeTotalPurchase } from "@/features/home/ResumeTotalPurchase"
import { TotalPurchaseList } from "@/features/home/TotalPurchaseList"
import { AddPurchaseForm } from "@/features/home/addPurchaseForm"


export const HomePage = () => {
  return (
    <div className="px-5 flex justify-between pt-10">

      <div className="max-w-[461px] w-full h-full flex flex-col gap-5">
      <div className="card w-full  max-w-[461px] h-full max-h-[440px] p-4">
        <p className="title">Registrar compra</p>

        <AddPurchaseForm />
      </div>

      <div className="card w-full  max-w-[461px] h-full max-h-[440px] p-4 overflow-y-auto">
        <p className="title">Lista de compras realizadas</p>

        <TotalPurchaseList />
      </div>
        
      </div>
      

      <div className="card w-full max-w-[673px] h-full max-h-[440px] p-4">
        <p className="title">Resumen</p>
        <ResumeTotalPurchase />
      </div>
    </div>
  )
}
