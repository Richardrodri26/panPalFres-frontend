import { BasicFormProvider, ButtonForm, SelectForm } from "@/composables"
import { createTransactionStepOneSchema, createTransactionStepOneSchemaType } from "../schemas";
import { useStepper } from "@/components";

interface ICreateTransactionStepOneProps {
  addFormData: (data: any) => void;
}

export const CreateTransactionStepOne = ({ addFormData }: ICreateTransactionStepOneProps) => {
  const { nextStep } = useStepper()

  const onSubmit = (data: createTransactionStepOneSchemaType) => {
    addFormData(data);
    nextStep()
  }

  return (
    <>
      <BasicFormProvider submit={onSubmit} schema={createTransactionStepOneSchema}>
        <SelectForm
          name="type"
          label="Tipo de transaccion"
          options={[{ key: 'egreso', value: 'Egreso' }, { key: 'ingreso', value: 'Ingreso' }]}
        />

        <ButtonForm>
          Continuar
        </ButtonForm>
      </BasicFormProvider>
    </>
  )
}
