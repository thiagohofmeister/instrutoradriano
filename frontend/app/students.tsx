import { useRouter } from 'expo-router'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { useStudentGetList } from './api/student/useStudentGetList'
import { AppHeader } from './components/AppHeader'
import { Button } from './components/Button'
import { StudentData } from './components/StudentData'

export default function Page() {
  const { isLoading, error, data, refetch } = useStudentGetList({})
  const router = useRouter()

  const renderStudents = () => {
    if (isLoading) return <Text style={styles.title}>Carregando</Text>

    if (error || !data) return <Button title="Recarregar" onPress={() => refetch()} />

    if (!data.items.length) {
      return <Text>Nenhuma pessoa aluna cadastrada.</Text>
    }

    return data.items.map(student => (
      <View style={styles.student} key={student.id}>
        <StudentData student={student} />
      </View>
    ))
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Meus alunos" />
      <View style={styles.button}>
        <Button
          title="Cadastrar aluno"
          onPress={() => {
            router.push('/student/create')
          }}
        />
      </View>

      <ScrollView style={styles.studentsList}>{renderStudents()}</ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 24
  },
  studentsList: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold'
  },
  student: {
    marginBottom: 15,
    borderWidth: 1,
    padding: 15,
    borderRadius: 7
  },
  button: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 15
  }
})
