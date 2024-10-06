

import { queryClient } from '@/App'
import { BasicTooltip, Button } from '@/components'
import { axiosInstance } from '@/domain/api.config'
import { panPalFresEndpoints } from '@/domain/endpoints'
import { ValidateUserResponse } from '@/interfaces'
import { useConfirm } from '@omit/react-confirm-dialog'
import { Pen, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'sonner'
import { EditUserModal } from '../modals/EditUserModal'

export const TdActionUser = ({ data }: { data: ValidateUserResponse }) => {
  const [isOpen, setIsOpen] = useState(false)
  const confirm = useConfirm()
  const deleteMutation = useMutation({
    mutationFn: async () => {
      try {
        await axiosInstance.delete(panPalFresEndpoints.USERS + `/${data.id}`);


        queryClient.refetchQueries({ queryKey: ['users'], exact: false })
        toast.success(`El producto: ${data.fullName} ha sido eliminado con éxito`)

      } catch (error) {

      }

    },
    onError: (error) => {
      toast.error("Oops hubo un error al eliminar el producto")
    }
  });

  const onDeleteMutation = async () => {
    const resAlert = await confirm({
      title: 'Eliminar producto',
      description: <>Esta seguro de eliminar el usuario: <strong>{data.fullName}</strong>? esta acción no se puede revertir</>,
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
        tooltip={'Eliminar usuario'}
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

      <EditUserModal defaultData={data} modalState={{ value: isOpen, setter: setIsOpen }} />

    </div>
  )
}
