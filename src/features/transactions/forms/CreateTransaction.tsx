import { Button } from "@/components"
import {
  Step,
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

export const CreateTransaction = () => {



  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper variant="circle-alt" size="sm" initialStep={0} steps={formSteps}>
        <ControllerSteps />
        {/* <Footer /> */}
      </Stepper>
    </div>
  )
}

const ControllerSteps = () => {
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
          [formSteps[1].id]: <CreateTransactionStepTwo transactionForm={transactionForm} addFormData={addFormData} />,
        }[(currentStep?.id || (steps[0]?.id || ''))])
      }
    </>
  )
}

const Footer = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper()
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  )
}
