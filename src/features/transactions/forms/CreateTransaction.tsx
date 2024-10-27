
import {
  Stepper,
  useStepper,
  type StepItem,
} from "@/components/ui/stepper"
import { CreateTransactionStepOne } from "./CreateTransactionStepOne"
import { CreateTransactionStepTwo } from "./CreateTransactionStepTwo"
import { useState } from "react"
import { createTransactionSchemaType } from "../schemas"

const formSteps = [
  { label: "Paso 1", id: '1' },
  { label: "Paso 2", id: '2' },
] satisfies StepItem[]

export const CreateTransaction = ({ closeModal }: { closeModal: () => void }) => {



  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper variant="circle-alt" size="sm" initialStep={0} steps={formSteps}>
        <ControllerSteps closeModal={closeModal} />
        {/* <Footer /> */}
      </Stepper>
    </div>
  )
}

const ControllerSteps = ({ closeModal }: { closeModal: () => void }) => {
  const {
    currentStep,
    steps
  } = useStepper()

  const [transactionForm, setTransactionForm] = useState<createTransactionSchemaType | undefined>(undefined);

  const addFormData = (data: any) => {
    setTransactionForm({ ...transactionForm, ...data })
  }

  return (
    <>
      {
        ({
          [formSteps[0].id]: <CreateTransactionStepOne addFormData={addFormData} />,
          [formSteps[1].id]: <CreateTransactionStepTwo closeModal={closeModal} transactionForm={transactionForm} addFormData={addFormData} />,
        }[(currentStep?.id || (steps[0]?.id || ''))])
      }
    </>
  )
}