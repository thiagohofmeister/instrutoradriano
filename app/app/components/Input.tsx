import { Control, useController } from 'react-hook-form'
import { StyleSheet, Text, TextInput } from 'react-native'

const Input = ({ control, name, label, isRequired, ...props }: InputProps) => {
  const {
    field,
    fieldState: { error }
  } = useController({
    control,
    name,
    rules: {
      required: isRequired
    }
  })

  return (
    <div>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={field.ref}
        value={field.value}
        onChangeText={value => {
          props.onChange?.(value)
          field.onChange(value)
        }}
        onBlur={field.onBlur}
        style={styles.main}
      />

      {error && <Text>{error.type === 'required' ? 'Campo obrigatório' : error.message}</Text>}
    </div>
  )
}

type InputProps = {
  onChange?: (value: string) => void
  control: Control<any>
  name: string
  label: string
  isRequired: boolean
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: 34,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  label: {
    fontSize: 14
  }
})

export default Input
