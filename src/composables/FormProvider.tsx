import { z } from 'zod';
import { DeepPartial, DefaultValues, FieldErrors, FormProvider, useForm, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Form } from '@/components/ui/form';

// Definimos un tipo auxiliar para DeepPartial que trabaje mejor con Zod
type DeepPartialWithZod<T extends z.ZodObject<any, any>> = {
  [K in keyof T]?: T[K] extends z.ZodObject<any, any> ? DeepPartialWithZod<T[K]> : T[K];
};

interface ISubmitModulesForm<T extends z.ZodObject<any, any> = z.ZodObject<any, any>> {
  children: React.ReactNode;
  schema?: T;
  submit?: (data: T['_input']) => void;
  onError?: SubmitErrorHandler<DeepPartialWithZod<T>>; // Ajustamos el tipo de la función de manejo de errores
  defaultValue?: DefaultValues<DeepPartialWithZod<T>>;
  values?: any;
  className?: string;
}

export function BasicFormProvider<T extends z.ZodObject<any, any>>({ children, submit, onError, defaultValue, values, schema, className = 'p-10' }: ISubmitModulesForm<T>) {
  // hooks
  const currentMethods = useForm({
    defaultValues: defaultValue,
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: schema ? zodResolver(schema) : undefined,
  });

  return (
    <form onSubmit={submit ? currentMethods.handleSubmit(data => submit(data), onError) : undefined} className={className}>
      <Form  {...currentMethods}>
        {children}
      </Form>
    </form>
  );
}