// Importa los componentes necesarios para las acciones de la barra de herramientas y la cuadrícula de productos
import { ToolbarActionsProducts } from "@/features/products";
import { AllProductsGrid } from "@/features/products/Grids";

// Componente principal de la página de productos
export const Products = () => {
  return (
    <div className="flex flex-col gap-5 pt-5">
      {/* Componente para mostrar las acciones de la barra de herramientas */}
      <ToolbarActionsProducts />
      
      {/* Componente para renderizar la cuadrícula con todos los productos */}
      <AllProductsGrid />
    </div>
  );
};
