import { SplashScreen, Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } }
})

export default function Layout() {
  const [isReady, setReady] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setReady(true)
    }, 2000)
  }, [])

  if (!isReady) {
    return <SplashScreen />
  }

  return (
    <>
      <StatusBar barStyle={'dark-content'}></StatusBar>
      <QueryClientProvider client={queryClient}>
        <Stack />
      </QueryClientProvider>
    </>
  )
}
