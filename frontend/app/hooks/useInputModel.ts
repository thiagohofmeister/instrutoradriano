import { useMemo } from 'react'
import { FieldError, UseControllerReturn } from 'react-hook-form'

export const useInputModel = <Value, OnChange, Props>(
  props: InputModelProps<Value, OnChange> & Props
) => {
  const value = useMemo<Value>(() => props.value || props.controller?.field.value, [props])

  const onChange = useMemo(() => props.onChange || props.controller?.field.onChange, [props])

  return {
    ...props,
    value,
    onChange
  }
}

type InputModelProps<Value, OnChange> = {
  isLoading?: boolean
  controller?: UseControllerReturn<any, any>
  hideErrorMessage?: boolean
  customError?: FieldError | undefined
  value?: Value
  onChange?: OnChange
}
