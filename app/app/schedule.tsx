import { useCallback, useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StudentModel } from './api/student/useStudent'
import { useStudentGetList } from './api/student/useStudentGetList'
import { AppHeader } from './components/AppHeader'
import SelectContainer, { SelectOptions } from './components/SelectContainer'
import StudentData from './components/StudentData'

export default function Page() {
  const [student, setStudent] = useState<StudentModel | null>(null)

  const { data, isLoading } = useStudentGetList({})

  const studentOptions = useMemo<SelectOptions>(() => {
    return data?.items.map(item => ({ label: item.name, value: item.id! })) || []
  }, [data])

  const handlerStudentSelect = useCallback(
    (id: string) => {
      setStudent(data?.items.find(student => student.id === id) || null)
    },
    [data, setStudent]
  )

  return (
    <View style={styles.container}>
      <AppHeader title="Agendar aula" />
      <View style={styles.main}>
        <View style={styles.box}>
          <SelectContainer
            label="Escolha o aluno"
            options={studentOptions}
            onChange={handlerStudentSelect}
            isRequired
          />
        </View>

        {!!student && (
          <>
            <View style={styles.box}>
              <Text style={styles.boxTitle}>Dados do aluno {student.id}</Text>

              <StudentData student={student} />
            </View>

            <View style={styles.box}>
              <Text style={styles.boxTitle}>Dados da aula</Text>
            </View>
          </>
        )}
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
    width: '100%',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    gap: 10
  },
  box: {
    borderWidth: 1,
    padding: 15,
    width: '100%'
  },
  boxTitle: {
    fontSize: 16,
    marginBottom: 15
  }
})
