import { FC, InputHTMLAttributes } from 'react'
import { FieldError, UseControllerReturn } from 'react-hook-form'
import { StyleSheet } from 'react-native'

export const BaseInput: FC<BaseInputProps> = ({
  isLoading,
  controller,
  hideErrorMessage,
  customError,
  ...props
}) => {
  return (
    <input
      {...props}
      ref={controller?.field.ref}
      name={controller?.field.name}
      style={styles.input}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    border: 'none',
    height: '100%',
    width: '100%',
    paddingLeft: '13px',
    backgroundColor: 'transparent',
    '&:disabled': {
      cursor: 'not-allowed'
    },
    fontSize: 14
  }
})

export type DefaultInputProps = {
  isLoading?: boolean
  controller?: UseControllerReturn<any, any>
  hideErrorMessage?: boolean
  customError?: FieldError | undefined
}

export type BaseInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'title'> &
  DefaultInputProps

export type OverrideValueInputProps = Omit<BaseInputProps, 'value' | 'onChange'>
