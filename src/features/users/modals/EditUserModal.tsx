import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BasicFormProvider } from "@/composables";
import { useMutation } from "react-query";
import { CreateUserForm } from "../forms/CreateUserForm";
import { axiosInstance } from "@/domain/api.config";
import { editUserSchema, editUserSchemaType } from "../schemas";
import { queryClient } from "@/App";
import { toast } from "sonner";
import { panPalFresEndpoints } from "@/domain/endpoints";
import { ValidateUserResponse } from "@/interfaces";

interface IEditUserModalProps {
  modalState: {
    value: boolean;
    setter: (isOpen: boolean) => void
  }
  defaultData: ValidateUserResponse
}

export const EditUserModal = ({ modalState, defaultData }: IEditUserModalProps) => {
  const { mutateAsync } = useMutation({
    mutationFn: async (data: editUserSchemaType) => {
      try {
        const userData = await axiosInstance.patch<ValidateUserResponse>(panPalFresEndpoints.USERS + `/${defaultData.id}`, {
          ...data,
          // password: '123456789'
        });

        if (userData.data) {
          toast.success("Usuario actualizado con éxito")

          queryClient.refetchQueries({ queryKey: ['users'], exact: false })

          modalState.setter(false)
        }

      } catch (error) {

      }

    }
  })

  const editUserDefaultData: editUserSchemaType = {
    id: defaultData.id,
    email: defaultData.email,
    fullName: defaultData.fullName
  }

  return (
    <Dialog onOpenChange={modalState.setter} open={modalState.value}>
      <DialogContent>
        <BasicFormProvider defaultValue={editUserDefaultData as any} submit={mutateAsync} className="p-0" schema={editUserSchema}>
          <DialogHeader>
            <DialogTitle>Editar usuario</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Por favor rellena los campos solicitados.
          </DialogDescription>


          <CreateUserForm isUpdateForm />


        </BasicFormProvider>
      </DialogContent>
    </Dialog>
  )
}
