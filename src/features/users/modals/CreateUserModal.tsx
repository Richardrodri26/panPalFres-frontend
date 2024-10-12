import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BasicFormProvider } from "@/composables";
import { useMutation } from "react-query";
import { CreateUserForm } from "../forms/CreateUserForm";
import { axiosInstance } from "@/domain/api.config";
import { createUserSchema, createUserSchemaType } from "../schemas";
import { queryClient } from "@/App";
import { toast } from "sonner";
import { panPalFresEndpoints } from "@/domain/endpoints";
import { ValidateUserResponse } from "@/interfaces";

interface ICreateUserModalProps {
  modalState: {
    value: boolean;
    setter: (isOpen: boolean) => void
  }
}

export const CreateUserModal = ({ modalState }: ICreateUserModalProps) => {
  const { mutateAsync } = useMutation({
    mutationFn: async (data: createUserSchemaType) => {
      try {
        const userData = await axiosInstance.post<ValidateUserResponse>(panPalFresEndpoints.CREATE_USER, {
          ...data,
          password: '123456789'
        });

        console.log('userData.data', userData.data)

        if (userData.data) {
          toast.success("Usuario creado con éxito")

          queryClient.refetchQueries({ queryKey: ['users'], exact: false })

          modalState.setter(false)
        }

      } catch (error) {

      }

    }
  })
  return (
    <Dialog onOpenChange={modalState.setter} open={modalState.value}>
      <DialogContent>
        <BasicFormProvider submit={mutateAsync} className="p-0" schema={createUserSchema}>
          <DialogHeader>
            <DialogTitle>Crear usuario</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Por favor rellena los campos solicitados.
          </DialogDescription>


          <CreateUserForm />


        </BasicFormProvider>
      </DialogContent>
    </Dialog>
  )
}
