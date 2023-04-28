import { FC, Fragment } from 'react'
import { FieldError } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'

export const InputErrorMessage: FC<InputErrorMessageProps> = ({ error }) => {
  if (!error || !error.type) return <Fragment />

  return (
    <View style={styles.main}>
      <Text>{error.message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    color: 'red',
    marginTop: 6,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 11
  }
})

type InputErrorMessageProps = {
  error: FieldError | undefined
}
