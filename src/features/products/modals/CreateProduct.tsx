import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreateProductForm } from "../forms/CreateProduct";
import { BasicFormProvider } from "@/composables";
import { productSchema, productSchemaType } from "../schema";
import { useMutation } from "react-query";
import { axiosInstance } from "@/domain/api.config";
import { panPalFresEndpoints } from "@/domain/endpoints";
import { toast } from "sonner";
import { queryClient } from "@/App";


interface ICreateProductModalProps {
  modalState: {
    value: boolean;
    setter: (isOpen: boolean) => void
  }
}

export const CreateProductModal = ({ modalState }: ICreateProductModalProps) => {
  const { mutateAsync } = useMutation({
    mutationFn: async (data: productSchemaType) => {
      try {
        const productData = await axiosInstance.post(panPalFresEndpoints.PRODUCTS, data);

        if (productData.data) {
          toast.success("Producto creado con éxito")

          queryClient.refetchQueries({ queryKey: ['products'] })

          modalState.setter(false)
        }

      } catch (error) {

      }

    }
  })


  return (
    <Dialog onOpenChange={modalState.setter} open={modalState.value}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear producto</DialogTitle>
          <DialogDescription>
            Por favor rellena los campos solicitados.

            <BasicFormProvider submit={mutateAsync} className="p-0" schema={productSchema}>

              <CreateProductForm />
            </BasicFormProvider>

          </DialogDescription>
        </DialogHeader>

      </DialogContent>
    </Dialog>
  )
}