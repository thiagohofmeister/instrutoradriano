import { Stack, useRouter } from 'expo-router'
import { Pressable, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

export const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
  const router = useRouter()

  return (
    <Stack.Screen
      options={{
        title,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Pressable onPress={() => router.replace('/')}>
            <Icon style={styles.buttonHomeIcon} type="font-awesome" name="home" />
          </Pressable>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  buttonHomeIcon: {
    marginLeft: 16,
    color: 'rgb(30, 28, 30)'
  }
})

type AppHeaderProps = {
  title: string
}
