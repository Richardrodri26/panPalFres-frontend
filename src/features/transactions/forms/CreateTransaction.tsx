import { Button } from "@/components"
import {
  Step,
  Stepper,
  useStepper,
  type StepItem,
} from "@/components/ui/stepper"

const steps = [
  { label: "Paso 1", id: '1' },
  { label: "Paso 2", id: '2' },
] satisfies StepItem[]

export const CreateTransaction = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper variant="circle-alt" size="sm" initialStep={0} steps={steps}>
        {steps.map(({ label, id }, index) => {
          return (
            <Step key={label} label={label}>
              <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
                <h1 className="text-xl">Step {index + 1}</h1>
              </div>
            </Step>
          )
        })}
        <Footer />
      </Stepper>
    </div>
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
