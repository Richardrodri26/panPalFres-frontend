import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreateTransaction } from "@/features/transactions"
import { useState } from "react"

interface ICreateTransactionModalProps {
  children: React.ReactNode
  asChild?: boolean
}

export const CreateTransactionModal = ({ children, asChild = false }: ICreateTransactionModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

        <CreateTransaction closeModal={closeModal} />


      </DialogContent>
    </Dialog>
  )
}
