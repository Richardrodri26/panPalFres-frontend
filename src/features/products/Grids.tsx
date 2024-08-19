import { DataTable } from "@/components"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { axiosInstance } from "@/domain/api.config"
import { panPalFresEndpoints } from "@/domain/endpoints"
import { ProductInterface } from "@/interfaces"
import { useState } from "react"
import { useQuery } from "react-query"
import { productsColumns } from "./columns"


const takeValue = 10

export const AllProductsGrid = () => {
  const [skip, setSkip] = useState(0)

  const { data, isLoading } = useQuery({
    queryKey: ['products', `${skip}-${takeValue}`],
    queryFn: async () => {
      const productsData = await axiosInstance.get<ProductInterface[]>(panPalFresEndpoints.PRODUCTS + `?limit=${takeValue}&offset=${skip}`)

      return productsData.data
    }
  })

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Productos</CardTitle>
          <CardDescription>
            Gestiona los productos del sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={productsColumns as any} data={data || []} isLoading={!data && isLoading} />
        </CardContent>
        {/* <CardFooter>
          {!data && isLoading
            ? (null)
            : (
              <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={{ currentPage: data?.currentPage || 0, totalPages: data?.totalPages || 0 }} takeValue={takeValue} />

            )
          }
        </CardFooter> */}
      </Card>


    </>
  )
}
