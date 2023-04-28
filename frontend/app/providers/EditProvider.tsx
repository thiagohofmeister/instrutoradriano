import { createContext, FC, PropsWithChildren, useContext } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { UseMutationResult } from 'react-query'

import { MutationProvider } from './MutationProvider'

type EditStore<TData = any> = {
  immutableData: TData
}

const EditContext = createContext<EditStore | undefined>(undefined)

export function useEditContext<TData>() {
  const context = useContext<EditStore<TData> | undefined>(EditContext)

  if (context === undefined) {
    throw console.error('useEditContext can only be used inside EditProvider')
  }

  return context
}

export const EditProvider: FC<EditProviderProps> = <
  Mutation extends DefaultMutation,
  Form extends DefaultForm,
  TData extends any
>({
  children,
  form,
  mutation,
  immutableData
}: PropsWithChildren<EditProviderProps<Mutation, Form, TData>>) => {
  return (
    <EditContext.Provider value={{ immutableData }}>
      <FormProvider {...form}>
        <MutationProvider mutation={mutation}>{children}</MutationProvider>
      </FormProvider>
    </EditContext.Provider>
  )
}

type DefaultMutation = UseMutationResult<any, any, any, any>
type DefaultForm = UseFormReturn<any, any>

type EditProviderProps<Mutation = DefaultMutation, Form = DefaultForm, TData = any> = {
  mutation: Mutation
  form: Form
  immutableData: TData
} & PropsWithChildren
