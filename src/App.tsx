import { RouterProvider } from 'react-router-dom'
import './App.css'
import { appRouter } from './routes'
import { Toaster } from './components/ui/sonner'
import { AlertRoot } from './components'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfirmDialogProvider } from '@omit/react-confirm-dialog'

export const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmDialogProvider>
        <RouterProvider router={appRouter} />
        <Toaster richColors />
        <AlertRoot />
      </ConfirmDialogProvider>
    </QueryClientProvider>
  )
}

export default App
