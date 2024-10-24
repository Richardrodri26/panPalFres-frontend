import { Skeleton } from "@/components";
import { axiosInstance } from "@/domain/api.config";
import { panPalFresEndpoints } from "@/domain/endpoints";
import { Edit2, Trash2 } from "lucide-react"
import { useQuery } from "react-query";


const mockData: { date: string; product: string }[] = [
  {
    date: "Agosto 16, 2023 12: 00 pm",
    product: "Jamon"
  },

  {
    date: "Agosto 16, 2023 12: 00 pm",
    product: "Yuca"
  },

  {
    date: "Agosto 16, 2023 12: 00 pm",
    product: "Queso"
  },

  {
    date: "Agosto 16, 2023 12: 00 pm",
    product: "Pan"
  },
]

export const TotalPurchaseList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['allTransaction'],
    queryFn: async () => {
      const { data } = await axiosInstance.get(panPalFresEndpoints.TRANSACTIONS);

      return data
    }
  })

  if(!data && isLoading) return <Skeleton className="size-4 rounded-md" />

  console.log('data', data)

  return (
    <div className="flex flex-col gap-2">

      {
        mockData?.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex flex-col gap-1">
              <p className="font-semibold">{item.date}</p>
              <p>Producto: {item.product}</p>
            </div>

            <Edit2 className="h-4 w-4 cursor-pointer hover:stroke-blue-500" />
            <Trash2 className="h-4 w-4 cursor-pointer hover:stroke-red-500" />
          </div>
        ))
      }

    </div>
  )
}
