import { ToolbarActionsProducts } from "@/features/products"
import { AllProductsGrid } from "@/features/products/Grids"



export const Products = () => {
  return (
    <div className="flex flex-col gap-5 pt-5">

      <ToolbarActionsProducts />
      
      <AllProductsGrid />
    </div>
  )
}
