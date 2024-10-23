import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreateTransaction } from "@/features/transactions"

interface ICreateTransactionModalProps {
  children: React.ReactNode
  asChild?: boolean
}

export const CreateTransactionModal = ({ children, asChild = false }: ICreateTransactionModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Transaccion</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Por favor rellena los campos solicitados.
        </DialogDescription>

        <CreateTransaction />


      </DialogContent>
    </Dialog>
  )
}
