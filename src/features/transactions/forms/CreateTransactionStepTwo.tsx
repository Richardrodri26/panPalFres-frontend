import { Card, CardContent, CardDescription, CardHeader, CardTitle, Checkbox } from "@/components"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { BasicFormProvider, ButtonForm } from "@/composables"
import { axiosInstance } from "@/domain/api.config"
import { panPalFresEndpoints } from "@/domain/endpoints"
import { IExternalState, ProductInterface, WrapDataWithPagination } from "@/interfaces"
import { useState } from "react"
import { useQuery } from "react-query"

interface ICreateTransactionStepTwoProps {
  addFormData: (data: any) => void;
}

export const CreateTransactionStepTwo = ({ addFormData }: ICreateTransactionStepTwoProps) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const externalState: IExternalState<string[]> = { setter: setSelectedProducts, state: selectedProducts };

  const { data, isLoading } = useQuery({
    queryKey: ['products', `createTransaction`],
    queryFn: async () => {
      const productsData = await axiosInstance.get<WrapDataWithPagination<ProductInterface[]>>(panPalFresEndpoints.PRODUCTS + `?limit=${99}&offset=${0}`)

      return productsData.data
    }
  })

  return (
    <BasicFormProvider>
      <ScrollArea className="max-h-[500px]">

        <ListProducts products={data?.data || []} selectedProductsState={externalState} />

        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <ButtonForm className="mt-2">
        Crear transaccion
      </ButtonForm>
    </BasicFormProvider>
  )
}

interface IListProductsProps {
  products: ProductInterface[];
  selectedProductsState: IExternalState<string[]>
}

const ListProducts = ({ products, selectedProductsState }: IListProductsProps) => {

  const { setter: setSelectedProducts, state: selectedProducts } = selectedProductsState

  const handleProductSelect = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }

  }

  return (
    <>
      {products.map(product => (
        <Card key={product.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{product.title}</CardTitle>
              <Checkbox
                id={`product-${product.id}`}
                checked={selectedProducts.includes(product.id)}
                onCheckedChange={() => handleProductSelect(product.id)}
              />
            </div>
            <CardDescription>${product.price.toFixed(2)}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}