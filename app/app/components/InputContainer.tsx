import { HTMLProps, useMemo, useState } from 'react'
import { FieldError, UseControllerReturn } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'

import { useInputModel } from '../hooks/useInputModel'
import { InputErrorMessage } from './InputErrorMessage'

const InputContainer: React.FC<InputContainerProps> = ({
  label,
  input,
  prefix,
  suffix,
  hideErrorMessage,
  customError,
  controller,
  isRequired: required,
  ...props
}) => {
  const error = useMemo<FieldError | undefined>(
    () => customError || controller?.fieldState.error,
    [customError, controller]
  )

  const { value, onChange } = useInputModel({
    controller,
    onChange: props.onChange,
    value: props.value
  })

  const [isFocused, setIsFocused] = useState(false)

  const labelTitleStyles = useMemo(() => {
    if (isFocused || value) {
      return {
        ...styles.labelTitle,
        color: '#1C211E',
        fontWeight: 'bold',
        fontSize: 9,
        top: 5
      }
    }

    return styles.labelTitle
  }, [isFocused])

  const inputStyles = useMemo(() => {
    if (isFocused || value) {
      return {
        ...styles.input,
        height: 30,
        marginTop: 10
      }
    }

    return styles.input
  }, [isFocused])

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        {!!prefix && (
          <View style={styles.prefix}>
            <Text>{prefix}</Text>
          </View>
        )}

        <View style={styles.label}>
          {!!label && (
            <View style={labelTitleStyles}>
              {label} {required && <span style={styles.required}>*</span>}
            </View>
          )}

          <input
            {...input}
            value={value || ''}
            onChange={event => onChange?.(event.target.value)}
            onBlur={controller?.field.onBlur}
            ref={controller?.field.ref}
            name={controller?.field.name}
            style={inputStyles}
            onFocus={() => setIsFocused(true)}
            onBlurCapture={() => setIsFocused(false)}
          />
        </View>

        {!!suffix && (
          <View style={styles.suffix}>
            <Text>{suffix}</Text>
          </View>
        )}
      </View>
      {!!error && !hideErrorMessage && <InputErrorMessage error={error!} />}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    width: '100%',
    display: 'flex',
    borderWidth: 1,
    borderColor: '#dfdfdf',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 3
  },
  input: {
    height: 40,
    border: 'none',
    fontSize: 14,
    marginLeft: 10,
    backgroundColor: 'transparent',
    outlineStyle: 'none'
  },
  label: {
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  prefix: {
    background: '#E4E9E7',
    color: '#1C211E',
    height: '100%',
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    fontSize: 13
  },
  suffix: {
    background: '#E4E9E7',
    color: '#1C211E',
    height: '100%',
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    fontSize: 13
  },
  required: {
    color: '#FF3358',
    marginLeft: 3,
    fontSize: 13
  },
  labelTitle: {
    top: 11,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    fontSize: 13,
    transition: '0.3s all ease',
    left: 11,
    color: '#c1c1c1'
  }
})

interface InputContainerProps {
  prefix?: string
  suffix?: string
  label?: string
  value?: string | null | undefined
  isRequired?: boolean
  onChange?: (value: string) => void
  input?: HTMLProps<HTMLInputElement>
  controller?: UseControllerReturn<any, any>
  hideErrorMessage?: boolean
  customError?: FieldError | undefined
}

export default InputContainer
