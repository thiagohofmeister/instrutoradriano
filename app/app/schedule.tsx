import { DateTime } from 'luxon'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ClassOption } from './api/schedule/useSchedule'
import { useScheduleCalculatePrice } from './api/schedule/useScheduleCalculatePrice'
import { StudentModel } from './api/student/useStudent'
import { useStudentGetList } from './api/student/useStudentGetList'
import { AppHeader } from './components/AppHeader'
import Button from './components/Button'
import { ClassData } from './components/ClassData'
import { DateContainer } from './components/DateContainer'
import FormGroup from './components/FormGroup'
import { SelectClassOption } from './components/SelectClassOption'
import { SelectStudent } from './components/SelectStudent'
import StudentData from './components/StudentData'

export default function Page() {
  const [student, setStudent] = useState<StudentModel | null>(null)
  const [classOption, setClassOption] = useState<ClassOption | null>(null)
  const [date, setDate] = useState<DateTime | null>(DateTime.now())

  const { data: price, mutateAsync: calculatePrice } = useScheduleCalculatePrice()

  const handlerScheduler = useCallback(() => {}, [student, classOption, date])

  useEffect(() => {
    if (!student) return
    calculatePrice(student.id!)
  }, [student])

  return (
    <View style={styles.container}>
      <AppHeader title="Agendar aula" />
      <View style={styles.main}>
        <View style={styles.box}>
          <SelectStudent onChange={setStudent} />
        </View>

        {!!student && (
          <>
            <StudentData student={student} />

            {!!price && (
              <View style={styles.box}>
                <Text style={styles.boxTitle}>Dados da aula</Text>

                <View>
                  <FormGroup>
                    <DateContainer onChange={setDate} />
                    <SelectClassOption onChange={setClassOption} price={price} />
                  </FormGroup>
                </View>

                {!!classOption && (
                  <>
                    <ClassData price={price} classOption={classOption} />

                    <Button title="Agendar" onPress={handlerScheduler} />
                  </>
                )}
              </View>
            )}
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
