import { ProductInterface } from "@/interfaces";
import { createColumnHelper } from "@tanstack/react-table";
import { TdActionProduct } from "./elements/TdActionProduct";


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
  }),

  columnHelperProducts.accessor('stock', {
    header: 'Stock'
  }),

  columnHelperProducts.display({
    id: 'acciones',
    cell: ({ row }) => {
      const productData = row.original

      return (<TdActionProduct data={productData} />)
    }
  })
  
]