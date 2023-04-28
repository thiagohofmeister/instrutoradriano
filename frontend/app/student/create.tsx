import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import { NewStudentForm } from '../components/NewStudentForm/NewStudentForm'

export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Cadastrar aluno' }} />
      <View style={styles.main}>
        <NewStudentForm />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24
  },
  main: {
    width: '100%',
    justifyContent: 'center',
    marginHorizontal: 'auto'
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold'
  }
})
