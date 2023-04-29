import { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { PeriodityEnum } from './api/schedule/useSchedule'
import { useScheduleGetList } from './api/schedule/useScheduleGetList'
import { AppHeader } from './components/AppHeader'
import { Button } from './components/Button'
import { ScheduleDataResume } from './components/ScheduleDataResume'

export default function Page() {
  const [periodity, setPeriodity] = useState<PeriodityEnum>(PeriodityEnum.TODAY)
  const isActive = useCallback((p: PeriodityEnum) => periodity === p, [periodity, setPeriodity])

  const { data, isError, isLoading, refetch } = useScheduleGetList({ periodity })

  return (
    <View style={styles.main}>
      <AppHeader title="Minha agenda" />
      <View style={styles.periodity}>
        <View style={styles.button}>
          <Button
            title="Hoje"
            isActive={isActive(PeriodityEnum.TODAY)}
            onPress={() => setPeriodity(PeriodityEnum.TODAY)}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Amanhã"
            isActive={isActive(PeriodityEnum.TOMORROW)}
            onPress={() => {
              setPeriodity(PeriodityEnum.TOMORROW)
            }}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Semana"
            isActive={isActive(PeriodityEnum.WEEK)}
            onPress={() => setPeriodity(PeriodityEnum.WEEK)}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Mês"
            isActive={isActive(PeriodityEnum.MONTH)}
            onPress={() => setPeriodity(PeriodityEnum.MONTH)}
          />
        </View>
      </View>

      <ScrollView style={styles.schedules}>
        {isError && <Button title="Recarregar" onPress={() => refetch()} />}
        {isLoading ? (
          <Text>Carregando</Text>
        ) : (
          data?.items.map(item => (
            <View style={styles.schedule} key={item.id}>
              <ScheduleDataResume schedule={item} />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    padding: 24,
    flex: 1
  },
  periodity: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20
  },
  button: {},
  title: {
    fontSize: 64,
    fontWeight: 'bold'
  },
  schedules: {},
  schedule: {
    marginBottom: 15
  }
})
