import { ValidateUserResponse } from "@/interfaces";
import { createColumnHelper } from "@tanstack/react-table";
import { TdActionUser } from "./elements/TdActionUser";


const columnHelperUser = createColumnHelper<ValidateUserResponse>();

export const columnsUser = [
  columnHelperUser.accessor('fullName', {
    header: 'Nombre completo',
  }),

  columnHelperUser.accessor('email', {
    header: 'Correo eléctronico'
  }),

  columnHelperUser.accessor('isActive', {
    header: "Activo?"
  }),

  columnHelperUser.display({
    id: 'Acciones',
    cell: ({ row }) => <TdActionUser data={row.original} />
  })


]