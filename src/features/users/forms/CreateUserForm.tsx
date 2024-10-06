import { FormButton } from "@/components"
import { InputForm, RowForm } from "@/composables"



export const CreateUserForm = ({ isUpdateForm = false }: { isUpdateForm?: boolean }) => {
  return (
    <>
    <RowForm>
        <InputForm name="email" label="Correo eléctronico" placeholder="Escriba aqui" />
        <InputForm name="fullName" label="Nombre completo" placeholder="Escriba aqui" />

      </RowForm>
     

      <FormButton>
        {isUpdateForm ? 'Editar' : 'Crear'} Usuario
      </FormButton>
    </>
  )
}
