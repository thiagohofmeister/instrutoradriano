import { Stack, useRouter } from 'expo-router'
import { Pressable, StyleSheet, Text } from 'react-native'

export const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
  const router = useRouter()

  return (
    <Stack.Screen
      options={{
        title,
        headerLeft: () => (
          <Pressable onPress={() => router.replace('/')}>
            <Text style={styles.buttonHome}>Início</Text>
          </Pressable>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  buttonHome: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 16
  }
})

type AppHeaderProps = {
  title: string
}
