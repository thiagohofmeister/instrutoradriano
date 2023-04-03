import { Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Minha agenda' }} />
      <View style={styles.main}>
        <Text style={styles.title}>Minha agenda</Text>
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
