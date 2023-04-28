import { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'

export const FormInputsContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <View style={styles.main}>{children}</View>
}

const styles = StyleSheet.create({
  main: {
    width: '100%'
  }
})
