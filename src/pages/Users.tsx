import { ToolbarActionsUsers } from "@/features/users"
import { AllUsersGrid } from "@/features/users/Grids"



export const Users = () => {
  return (
    <div className="flex flex-col gap-5 pt-5">

      <ToolbarActionsUsers />

      <AllUsersGrid />
    </div>
  )
}
