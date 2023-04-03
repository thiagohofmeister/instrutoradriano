import { Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import StudentForm from '../components/NewStudentForm'

export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Cadastrar aluno' }} />
      <View style={styles.main}>
        <Text style={styles.title}>Cadastrar aluno</Text>
        <StudentForm />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 'auto'
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold'
  }
})
