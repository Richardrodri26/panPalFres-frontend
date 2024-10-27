import { Button } from "@/components"
import { CreateTransactionModal } from "@/features/home/Modals/CreateTransactionModal"
import { TotalPurchaseList } from "@/features/home/TotalPurchaseList"
import { TransactionChart } from "@/features/home/TransactionChart"

export const HomePage = () => {
  
  return (
    <div className="px-5 flex justify-between pt-10">
      {/* <CreateTransaction /> */}

      <div className="max-w-[461px] w-full h-full flex flex-col gap-5">
        <div className=" w-full  max-w-[461px] h-full max-h-[440px] p-4">
          <p className="title mb-2">Registrar compra</p>

          <CreateTransactionModal asChild>
            <Button>
              Registrar transaccion
            </Button>
          </CreateTransactionModal>
        </div>

        <div className="w-full max-w-[461px] h-full overflow-y-hidden">
          <p className="title">Lista de compras realizadas</p>

          <TotalPurchaseList />
        </div>

      </div>


      <div className="w-full  h-full p-4">
        <TransactionChart />

      </div>
    </div>
  )
}
