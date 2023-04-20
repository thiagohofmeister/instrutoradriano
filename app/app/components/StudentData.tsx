import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { StudentModel } from '../api/student/useStudent'
import { useUtils } from '../hooks/useUtils'

const StudentData: React.FC<StudentProps> = ({ student }) => {
  const { formatMinutes, formatDistance } = useUtils()

  return (
    <SafeAreaView style={styles.main}>
      <Text>
        <Text style={styles.infoTitle}>Nome:</Text> {student.name}
      </Text>
      <Text>
        <Text style={styles.infoTitle}>Telefone:</Text> {student.phone}
      </Text>

      {student.address && (
        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text>
            <Text style={styles.infoTitle}>CEP:</Text> {student.address.zipCode}
          </Text>
          <Text>
            <Text style={styles.infoTitle}>Rua:</Text> {student.address.street}
          </Text>
          <Text>
            <Text style={styles.infoTitle}>Número:</Text> {student.address.number}
          </Text>
          <Text>
            <Text style={styles.infoTitle}>Complemento:</Text> {student.address.complement || '-'}
          </Text>
          <Text>
            <Text style={styles.infoTitle}>Distância:</Text>{' '}
            {formatDistance(student.address.distance)}
          </Text>
          <Text>
            <Text style={styles.infoTitle}>Tempo de deslocamento:</Text>{' '}
            {formatMinutes(student.address.distanceDuration)}
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    width: '100%',
    borderWidth: 1,
    borderColor: '#333',
    padding: 15
  },
  address: {
    marginTop: 15
  },
  addressTitle: {
    fontSize: 16,
    marginBottom: 10,
    borderTopWidth: 1,
    paddingTop: 10
  },
  infoTitle: {
    fontWeight: 'bold'
  }
})

type StudentProps = {
  student: StudentModel
}

export default StudentData
