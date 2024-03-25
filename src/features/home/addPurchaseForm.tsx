import { FormButton } from "@/components/ui/button"
import { BasicFormProvider, InputForm } from "@/composables"
import { addPurchaseSchema, addPurchaseSchemaType } from "./schemas"
import { useFormContext } from "react-hook-form"



export const AddPurchaseForm = () => {

  const onSubmit = (data: addPurchaseSchemaType) => {

  }

  return (
    <BasicFormProvider className="w-full" submit={onSubmit} schema={addPurchaseSchema}>

      <InputForm name="product" label="Producto" />
      <InputForm name="quantity" label="Cantidad" />

      <AddPurchaseFormButton />
    </BasicFormProvider>
  )
}

const AddPurchaseFormButton = () => {
  const { reset, setValue } = useFormContext();
  const onResetForm = () => {
    setValue("product", "")
    setValue("quantity", "1")
    // reset()
  }
  return (
    <FormButton onClick={onResetForm} className="ml-auto mt-auto">
      Guardar
    </FormButton>
  )
}
