import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Dimensions, Image, StyleSheet, View } from 'react-native'

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

        <View style={styles.buttonContainer}>
          <Button
            title="Minha agenda"
            onPress={() => {
              router.push('/calendar')
            }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Meus alunos"
            onPress={() => {
              router.push('/students')
            }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Agendar aula"
            onPress={() => {
              router.push('/schedule')
            }}
          />
        </View>
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
  buttonContainer: {
    width: Dimensions.get('window').width / 2
  },
  logo: {
    width: 200,
    height: 200
  }
})
