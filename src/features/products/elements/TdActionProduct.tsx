import { queryClient } from "@/App"
import { BasicTooltip, Button } from "@/components"
import { axiosInstance } from "@/domain/api.config"
import { panPalFresEndpoints } from "@/domain/endpoints"
import { ProductInterface } from "@/interfaces"
import { useConfirm } from "@omit/react-confirm-dialog"
import { Pen, Trash } from "lucide-react"
import { useMutation } from "react-query"
import { toast } from "sonner"
import { EditProductModal } from "../modals/EditProduct"
import { useState } from "react"


export const TdActionProduct = ({ data }: { data: ProductInterface }) => {
  const [isOpen, setIsOpen] = useState(false)
  const confirm = useConfirm()
  const deleteMutation = useMutation({
    mutationFn: async () => {
      try {
        await axiosInstance.delete(panPalFresEndpoints.PRODUCTS + `/${data.id}`);


        queryClient.refetchQueries({ queryKey: ['products'] })
        toast.success(`El producto: ${data.title} ha sido eliminado con éxito`)

      } catch (error) {

      }

    },
    onError: (_error) => {
      toast.error("Oops hubo un error al eliminar el producto")
    }
  });

  const onDeleteMutation = async () => {
    const resAlert = await confirm({
      title: 'Eliminar producto',
      description: <>Esta seguro de eliminar el producto: <strong>{data.title}</strong>, esta acción no se puede revertir</>,
      icon: <Trash className="size-4 text-destructive" />,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      cancelButton: {
        size: 'default',
        variant: 'outline'
      },
      confirmButton: {
        className: 'bg-red-500 hover:bg-red-600 text-white'
      },
      alertDialogTitle: {
        className: 'flex items-center gap-2'
      }
    })

    if (resAlert) {
      await deleteMutation.mutateAsync()
    }

  };

  const onEditProduct = () => {
    setIsOpen(true)
  }

  return (
    <div className="flex items-center gap-2">
      <BasicTooltip
        asChild
        content={
          <Button onClick={onDeleteMutation} size={"icon"} variant={"gooeyLeft"}>
            <Trash />
          </Button>
        }
        tooltip={'Eliminar producto'}
      />

      <BasicTooltip
        asChild
        content={
          <Button onClick={onEditProduct} size={"icon"} variant={"gooeyLeft"}>
            <Pen />
          </Button>
        }
        tooltip={'Editar producto'}
      />

      <EditProductModal defaultData={data} modalState={{ value: isOpen, setter: setIsOpen }} />

    </div>
  )
}
