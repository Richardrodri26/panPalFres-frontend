import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, DataTable, PaginationTable } from "@/components"
import { axiosInstance } from "@/domain/api.config"
import { useState } from "react"
import { useQuery } from "react-query"
import { columnsUser } from "./columns"
import { ValidateUserResponse, WrapDataWithPagination } from "@/interfaces"
import { panPalFresEndpoints } from "@/domain/endpoints"



const takeValue = 10

export const AllUsersGrid = () => {
  const [skip, setSkip] = useState(0)

  const { data, isLoading } = useQuery({
    queryKey: ['users', `${skip}-${takeValue}`],
    queryFn: async () => {
      const usersData = await axiosInstance.get<WrapDataWithPagination<ValidateUserResponse[]>>(panPalFresEndpoints.USERS + `?limit=${takeValue}&offset=${skip}`)

      return usersData.data
    }
  })

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Usuarios</CardTitle>
          <CardDescription>
            Gestiona los usuarios del sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columnsUser as any} data={data?.data || []} isLoading={!data && isLoading} />
        </CardContent>
        <CardFooter>
          {!data && isLoading
            ? (null)
            : (
              <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={{ currentPage: data?.currentPage || 0, totalPages: data?.totalPages || 0 }} takeValue={takeValue} />

            )
          }
        </CardFooter>
      </Card>


    </>
  )
}