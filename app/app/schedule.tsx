import { Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Agendar aula' }} />
      <View style={styles.main}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Dados do aluno</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Dados da aula</Text>
        </View>
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
    width: '100%',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    gap: 10
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold'
  },
  box: {
    borderWidth: 1,
    padding: 15,
    width: '100%'
  },
  boxTitle: {}
})
