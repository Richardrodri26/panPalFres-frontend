import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Checkbox } from "@/components"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { BasicFormProvider, ButtonForm } from "@/composables"
import { axiosInstance } from "@/domain/api.config"
import { panPalFresEndpoints } from "@/domain/endpoints"
import { IExternalState, ProductInterface, Transaction, WrapDataWithPagination } from "@/interfaces"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { createTransactionSchemaType } from "../schemas"
import { toast } from "sonner"
import { queryClient } from "@/App"

interface ICreateTransactionStepTwoProps {
  addFormData: (data: any) => void;
  transactionForm?: createTransactionSchemaType,
  closeModal: () => void 
}

export const CreateTransactionStepTwo = ({ transactionForm, closeModal }: ICreateTransactionStepTwoProps) => {
  // const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState<ProductTransactionInfo>({})
  // const externalState: IExternalState<string[]> = { setter: setSelectedProducts, state: selectedProducts };
  const externalState: IExternalState<ProductTransactionInfo> = { setter: setSelectedProducts, state: selectedProducts };

  const { data } = useQuery({
    queryKey: ['products', `createTransaction`],
    queryFn: async () => {
      const productsData = await axiosInstance.get<WrapDataWithPagination<ProductInterface[]>>(panPalFresEndpoints.PRODUCTS + `?limit=${99}&offset=${0}`)

      return productsData.data
    }
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: createTransactionSchemaType) => {
      try {
        const { data: axiosData } = await axiosInstance.post<Transaction>(panPalFresEndpoints.TRANSACTIONS, data);
        if (axiosData) {
          toast.success("Transaccion creada con éxito")

          queryClient.refetchQueries({ queryKey: ['allTransaction'] })
          closeModal()

        }
      } catch (error) {

      }


    }
  })

  const onSubmitData = async () => {

    const productsToSend = data?.data
    ?.filter((product) => Object.keys(selectedProducts).includes(product.id))
    .map(product => ({
      ...product,
      stock: selectedProducts[product.id]
    })) || [];

  // console.log('productsToSend', productsToSend)

    await mutateAsync({ ...(transactionForm! || {}), products: productsToSend })
    // closeModal()


  }

  const hasSelectedProducts = Object.keys(selectedProducts).length > 0

  return (
    <BasicFormProvider submit={onSubmitData}>
      <ScrollArea className="max-h-[500px]">

        <ListProducts products={data?.data || []} selectedProductsState={externalState} />

        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <ButtonForm disabled={!hasSelectedProducts} className="mt-2">
        Crear transaccion
      </ButtonForm>
    </BasicFormProvider>
  )
}

// interface ProductTransactionInfo {
//   id: string;
//   quantity: number
// }
export type ProductTransactionInfo = Record<string, number>

interface IListProductsProps {
  products: ProductInterface[];
  // selectedProductsState: IExternalState<ProductTransactionInfo[]>
  selectedProductsState: IExternalState<ProductTransactionInfo>;
}

const ListProducts = ({ products, selectedProductsState }: IListProductsProps) => {

  const { setter: setSelectedProducts, state: selectedProducts } = selectedProductsState

  // const isChecked = (id: string) => selectedProducts.some(product => product.id === id)

  // const handleProductSelect = (productId: string) => {
  //   if (isChecked(productId)) {
  //     setSelectedProducts(selectedProducts.filter(product => product.id !== productId))
  //   } else {
  //     // setSelectedProducts([...selectedProducts, productId])
  //     setSelectedProducts([...selectedProducts])
  //   }

  // }

  const handleProductSelect = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts({ ...selectedProducts, [productId]: 1 });
    } else {
      const newSelected = { ...selectedProducts };
      delete newSelected[productId];
      setSelectedProducts(newSelected);
    }
  };

  const handleQuantityChange = (productId: string, increment: number, max = 0) => {
    const currentQuantity = selectedProducts[productId] || 0;
    const newQuantity = Math.max(1, currentQuantity + increment);

    if (currentQuantity >= max) return

    setSelectedProducts({
      ...selectedProducts,
      [productId]: newQuantity
    });
  };

  return (
    <div className="flex flex-col gap-y-3">
      {products.map(product => {
        const isSelected = (productId: string) => productId in selectedProducts;
        const quantity = selectedProducts[product.id] || 0;
        const max = product.stock

        return (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{product.title}</CardTitle>
                <div className="flex items-center gap-x-4">
                  {isSelected(product.id) && (
                    <div className="flex items-center gap-x-2">
                      <Button
                        type="button"
                        onClick={() => handleQuantityChange(product.id, -1, max)}
                        className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                      >
                        -
                      </Button>
                      <span className="min-w-8 text-center">{quantity}</span>
                      <Button
                        type="button"
                        onClick={() => handleQuantityChange(product.id, 1, max)}
                        className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                      >
                        +
                      </Button>
                    </div>
                  )}
                  <Checkbox
                    id={`product-${product.id}`}
                    checked={isSelected(product.id)}
                    onCheckedChange={(checked) => handleProductSelect(product.id, checked as boolean)}
                  />
                </div>
              </div>
              <CardDescription>${product.price.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{product.description}</p>
              <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}