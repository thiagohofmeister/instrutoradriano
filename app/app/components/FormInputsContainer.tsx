import { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'

const FormInputsContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <div style={styles.main}>{children}</div>
}

const styles = StyleSheet.create({
  main: {}
})

export default FormInputsContainer
