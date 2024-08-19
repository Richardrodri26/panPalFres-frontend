import { FormButton } from "@/components/ui/button"
import { BasicFormProvider, InputForm, RowForm } from "@/composables"



export const CreateProductForm = () => {

  return (
    <>

      <RowForm>
        <InputForm name="title" label="Nombre del producto" />
        <InputForm name="price" label="Precio del producto" />
        <InputForm name="stock" label="Cantidad en stock" />

      </RowForm>
      <InputForm name="description" label="Descripción del producto" />

      <FormButton>
        Crear producto
      </FormButton>


    </>
  )
}