import { HTMLProps, useCallback, useMemo } from 'react'
import { FieldError, UseControllerReturn } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'

import { useInputModel } from '../hooks/useInputModel'
import { Dropdown } from './Dropdown'
import { InputErrorMessage } from './InputErrorMessage'

export const SelectContainer: React.FC<SelectContainerProps> = ({
  label,
  value,
  select,
  options,
  hideErrorMessage,
  customError,
  controller,
  isRequired,
  ...props
}) => {
  const error = useMemo<FieldError | undefined>(
    () => customError || controller?.fieldState.error,
    [customError, controller]
  )

  const { onChange } = useInputModel({
    controller,
    onChange: props.onChange,
    value
  })

  const selectOptions = useMemo<SelectOptions>(() => {
    return [{ label: 'Selecione', value: null }, ...options]
  }, [options])

  const onSelect = useCallback(
    ({ value }: SelectOption) => {
      onChange?.(value || '')
    },
    [onChange]
  )

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.input}>
          <Dropdown
            isRequired={isRequired}
            label={label}
            value={value}
            data={selectOptions}
            onSelect={onSelect}
          />
        </View>
      </View>
      {!!error && !hideErrorMessage && <InputErrorMessage error={error!} />}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flex: 1,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 3
  },
  input: {
    width: '100%',
    border: 'none',
    fontSize: 14,
    marginLeft: 10,
    backgroundColor: 'transparent',
    outlineStyle: 'none'
  }
})

interface SelectContainerProps {
  label: string
  value?: string | null | undefined
  isRequired?: boolean
  onChange?: (value: string) => void
  select?: HTMLProps<HTMLSelectElement>
  controller?: UseControllerReturn<any, any>
  hideErrorMessage?: boolean
  customError?: FieldError | undefined
  options: SelectOption[]
}

export type SelectOptions = SelectOption[]

export type SelectOption = {
  value: string | null
  label: string
}
