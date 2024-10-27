import { AlertDescription, AlertTitle, Card, CardContent, RenderIf, Skeleton } from "@/components";
import { ScrollArea, ScrollBar, Alert } from "@/components";
import { axiosInstance } from "@/domain/api.config";
import { panPalFresEndpoints } from "@/domain/endpoints";
import { Transaction, TransactionDetail } from "@/interfaces";
import { formatCurrency, formatDate } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { useQuery } from "react-query";




export const TotalPurchaseList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['allTransaction'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Transaction[]>(panPalFresEndpoints.TRANSACTIONS);

      return data
    }
  })

  if (!data && isLoading) return <Skeleton className="size-4 rounded-md" />


  return (
    <div className="flex flex-col gap-2">

      <TransactionList transactions={[...data || []].sort((a, b) => new Date(a.createdAt).getDate() - new Date(b.createdAt).getDate()) || []} />


    </div>
  )
}


const TransactionList: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {

  const hasTransactions = transactions.length > 0

  return (
    <>
      <RenderIf condition={hasTransactions}>
        <Card className="w-full max-w-4xl mx-auto mt-2">
          <CardContent className="py-4">
            <ScrollArea className="pr-2 max-h-[calc(160px_*_4)] overflow-y-auto scroll__app">
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <TransactionCard key={transaction.id} transaction={transaction} />
                ))}
              </div>


              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </CardContent>
        </Card>
      </RenderIf>

      <div className="mt-2">
      <RenderIf condition={!hasTransactions}>
        <NoTransactions />
      </RenderIf>
      </div>
    </>
  );

}

const TransactionDetailCard: React.FC<{ detail: TransactionDetail }> = ({ detail }) => (
  <div key={detail.id} className="bg-gray-50 p-2 rounded">
    <p className="text-sm">
      {detail.product.title} {' '}
      <span className="font-medium">
        {formatCurrency(detail.product.price)}
      </span>
    </p>
    <p className="text-xs text-gray-500">
      Cantidad: {detail.quantity}
    </p>
  </div>
);

const TransactionCard: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const getTransactionColor = (type: Transaction['type']): string => {
    return type === 'ingreso' ? 'text-green-600' : 'text-red-600';
  };

  const getTransactionLabel = (type: Transaction['type']): string => {
    const labels: Record<Transaction['type'], string> = {
      ingreso: 'Ingreso',
      egreso: 'Egreso'
    };
    return labels[type];
  };

  const totalValueTransaction = transaction.transactionDetail.reduce((prev, current) => prev + current.product.price, 0)

  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold">Ejecutor: {transaction.user.fullName}</h3>
          <p className="text-sm text-gray-500">
            {formatDate(transaction.createdAt)}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getTransactionColor(transaction.type)}`}
        >
          {getTransactionLabel(transaction.type)}
        </span>
      </div>

      <div className="mt-2">
        <p className="text-sm font-medium">
          Productos: {transaction.transactionDetail.length} - Total: {totalValueTransaction}
        </p>
        {transaction.transactionDetail.length > 0 && (
          <div className="mt-2 space-y-2">
            {transaction.transactionDetail.map((detail) => (
              <TransactionDetailCard key={detail.id} detail={detail} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


const NoTransactions = () => {

  return (
    <Alert variant="default" className="max-w-md mx-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>No hay transacciones</AlertTitle>
      <AlertDescription>
        No se han registrado entradas ni salidas de productos. Cuando realices transacciones, aparecerán aquí.
      </AlertDescription>
    </Alert>
  )
}
