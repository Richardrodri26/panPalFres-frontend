// Importaciones de componentes necesarios para la página de inicio
import { Button } from "@/components"; // Botón reutilizable desde la carpeta de componentes
import { CreateTransactionModal } from "@/features/home/Modals/CreateTransactionModal"; // Modal para registrar una transacción
import { TotalPurchaseList } from "@/features/home/TotalPurchaseList"; // Componente para mostrar la lista de compras
import { TransactionChart } from "@/features/home/TransactionChart"; // Gráfico de transacciones

// Componente principal para la página de inicio
export const HomePage = () => {
  return (
    <div className="px-5 flex justify-between pt-10">
      {/* Contenedor principal con padding y diseño en flexbox para separar elementos */}

      {/* Columna izquierda: Registro de transacciones y lista de compras */}
      <div className="max-w-[461px] w-full h-full flex flex-col gap-5">
        {/* Sección para registrar una nueva transacción */}
        <div className="w-full max-w-[461px] h-full max-h-[440px] p-4">
          <p className="title mb-2">Registrar compra</p>
          {/* Botón para abrir el modal de registro */}
          <CreateTransactionModal asChild>
            <Button>
              Registrar transacción
            </Button>
          </CreateTransactionModal>
        </div>

        {/* Sección para mostrar la lista de compras realizadas */}
        <div className="w-full max-w-[461px] h-full overflow-y-hidden">
          <p className="title">Lista de compras realizadas</p>
          <TotalPurchaseList />
        </div>
      </div>

      {/* Columna derecha: Gráfico de transacciones */}
      <div className="w-full h-full p-4">
        <TransactionChart />
      </div>
    </div>
  );
};
