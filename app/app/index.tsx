import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Image, StyleSheet, View } from 'react-native'

import { Button } from './components/Button'

const LogoImage = require('../assets/icon.png')

export default function Page() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <View style={styles.main}>
        <Image source={LogoImage} style={styles.logo} />

        <Button
          title="Minha agenda"
          onPress={() => {
            router.push('/calendar')
          }}
        />

        <Button
          title="Meus alunos"
          onPress={() => {
            router.push('/students')
          }}
        />

        <Button
          title="Agendar aula"
          onPress={() => {
            router.push('/schedule')
          }}
        />
      </View>

      <StatusBar />
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
    alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: 'auto',
    gap: 10
  },
  logo: {
    width: 200,
    height: 200
  }
})
