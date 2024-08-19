import { ProductInterface } from "@/interfaces";
import { createColumnHelper } from "@tanstack/react-table";


const columnHelperProducts = createColumnHelper<ProductInterface>()

export const productsColumns = [
  columnHelperProducts.accessor('title',{
    header: 'Nombre del producto'
  }),
  columnHelperProducts.accessor('description',{
    header: 'Descripción del producto'
  }),
  columnHelperProducts.accessor('price', {
    header: 'Precio'
  })
  
]