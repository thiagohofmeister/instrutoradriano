import { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'

const FormGroup: React.FC<PropsWithChildren> = ({ children }) => {
  return <View style={styles.main}>{children}</View>
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    marginBottom: 15,
    flexDirection: 'row',
    gap: 15
  }
})

export default FormGroup
