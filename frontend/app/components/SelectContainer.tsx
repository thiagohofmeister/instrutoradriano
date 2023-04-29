import { Picker, PickerIOS } from '@react-native-picker/picker'
import { HTMLProps, useCallback, useMemo, useState } from 'react'
import { FieldError, UseControllerReturn } from 'react-hook-form'
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Overlay } from 'react-native-elements'

import { useInputModel } from '../hooks/useInputModel'
import { Button } from './Button'
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
  const [showPicker, setShowPicker] = useState<boolean>(Platform.OS !== 'ios')

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

  const selected = useMemo(() => {
    if (!value) return { label, value: null }

    return selectOptions.find(op => op.value === value)
  }, [selectOptions, value])

  const onSelect = useCallback(
    (value: string | number) => {
      console.log({ value })
      onChange?.(value)
    },
    [onChange]
  )

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View
          style={[
            styles.input,
            Platform.OS === 'ios'
              ? {
                  flexDirection: 'row',
                  alignItems: 'center'
                }
              : []
          ]}>
          {Platform.OS === 'ios' && (
            <TouchableOpacity onPress={() => setShowPicker(true)} style={{ width: '100%' }}>
              <Text style={styles.label}>{selected?.label}</Text>
            </TouchableOpacity>
          )}

          {Platform.OS === 'ios' && (
            <Overlay isVisible={showPicker}>
              <View
                style={{
                  width: Dimensions.get('window').width - 50
                }}>
                <PickerIOS selectedValue={value || undefined} onValueChange={onSelect}>
                  {selectOptions.map(option => (
                    <PickerIOS.Item
                      key={option.label}
                      label={option.label}
                      value={option.value || undefined}
                    />
                  ))}
                </PickerIOS>

                <Button title="Fechar" onPress={() => setShowPicker(false)} />
              </View>
            </Overlay>
          )}

          {Platform.OS !== 'ios' && (
            <Picker
              style={styles.picker}
              selectedValue={value || undefined}
              onValueChange={onSelect}>
              {selectOptions.map(option => (
                <Picker.Item key={option.label} label={option.label} value={option.value} />
              ))}
            </Picker>
          )}
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
  label: {
    fontSize: 16,
    marginLeft: 10
  },
  picker: {
    height: '100%',
    backgroundColor: 'transparent',
    border: 0,
    padding: 0,
    margin: 0,
    outlineStyle: 'none'
  },
  container: {
    display: 'flex',
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    alignItems: 'center',
    borderRadius: 3
  },
  input: {
    height: '100%',
    width: '100%',
    fontSize: 14,
    backgroundColor: 'transparent',
    outlineStyle: 'none'
  }
})

interface SelectContainerProps {
  label: string
  value: string | null
  isRequired?: boolean
  onChange?: (value: string | number | null) => void
  select?: HTMLProps<HTMLSelectElement>
  controller?: UseControllerReturn<any, any>
  hideErrorMessage?: boolean
  customError?: FieldError | undefined
  options: SelectOption[]
}

export type SelectOptions = SelectOption[]

export type SelectOption = {
  value: number | string | null
  label: string
}
