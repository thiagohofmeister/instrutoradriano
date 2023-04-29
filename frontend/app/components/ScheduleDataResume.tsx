import { StyleSheet, Text, View } from 'react-native'

import { ScheduleModel } from '../api/schedule/useSchedule'
import { useUtils } from '../hooks/useUtils'

export const ScheduleDataResume: React.FC<ScheduleDataResumeProps> = ({ schedule }) => {
  const { formatDate, formatFullAddress, formatPrice, formatMinutes } = useUtils()

  return (
    <View style={styles.main}>
      <Text>
        <Text style={styles.infoTitle}>Aluno:</Text> {schedule.student.name}
      </Text>

      <Text>
        <Text style={styles.infoTitle}>Início:</Text>{' '}
        {formatDate(new Date(schedule.classInitialDate))}
      </Text>

      <Text>
        <Text style={styles.infoTitle}>Final:</Text> {formatDate(new Date(schedule.classFinalDate))}
      </Text>

      <Text>
        <Text style={styles.infoTitle}>Duração:</Text> {formatMinutes(schedule.duration * 60)}
      </Text>

      <Text>
        <Text style={styles.infoTitle}>Endereço:</Text>{' '}
        {formatFullAddress(schedule.student.address)}
      </Text>

      <Text>
        <Text style={styles.infoTitle}>Preço:</Text> {formatPrice(schedule.amount)}
      </Text>
    </View>
  )
}

type ScheduleDataResumeProps = {
  schedule: ScheduleModel
}

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    padding: 15,
    gap: 5
  },
  infoTitle: {
    fontWeight: 'bold'
  }
})
