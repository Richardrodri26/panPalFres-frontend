import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateProductForm } from "../forms/CreateProduct";
import { BasicFormProvider } from "@/composables";
import { editProductSchemaType, editProductSchema } from "../schema";
import { useMutation } from "react-query";
import { axiosInstance } from "@/domain/api.config";
import { panPalFresEndpoints } from "@/domain/endpoints";
import { toast } from "sonner";
import { queryClient } from "@/App";
import { ProductInterface } from "@/interfaces";


interface IEditProductModalProps {
  modalState: {
    value: boolean;
    setter: (isOpen: boolean) => void
  },
  defaultData: ProductInterface
}

export const EditProductModal = ({ modalState, defaultData }: IEditProductModalProps) => {
  const { mutateAsync } = useMutation({
    mutationFn: async (data: editProductSchemaType) => {
      try {
        const productData = await axiosInstance.patch(panPalFresEndpoints.PRODUCTS + `/${defaultData.id}`, { ...data, stock: +data.stock });

        if (productData.data) {
          toast.success("Producto actualizado con éxito")

          queryClient.refetchQueries({ queryKey: ['products'] })

          modalState.setter(false)
        }

      } catch (error) {

      }

    }
  })

  // console.log('defaultData.stock', defaultData.stock)

  const { slug, images, ...restDefaultData } = defaultData

  const defaultDataForm: editProductSchemaType  = {
    ...restDefaultData,
    stock: `${defaultData.stock}`,
    price: `${restDefaultData.price}`
    
  }

  return (
    <Dialog onOpenChange={modalState.setter} open={modalState.value}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edita el producto: {defaultData.title}</DialogTitle>
          <DialogDescription>
            Por favor rellena los campos solicitados.

            <BasicFormProvider defaultValue={defaultDataForm} submit={mutateAsync} className="p-0" schema={editProductSchema}>

              <CreateProductForm isUpdateForm />
            </BasicFormProvider>

          </DialogDescription>
        </DialogHeader>

      </DialogContent>
    </Dialog>
  )
}