

import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { CreateProductModal } from '../modals/CreateProduct'

export const ToolbarActionsProducts = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="py-2 w-full flex justify-end items-center gap-2">

        <Button onClick={() => setIsOpen(true)} size={'sm'}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Añadir producto
          </span>
        </Button>
      </div>

      <CreateProductModal modalState={{ value: isOpen, setter: setIsOpen }} />

    </>
  )
}
