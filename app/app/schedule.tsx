import { useRouter } from 'expo-router'
import { DateTime } from 'luxon'
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ClassOption } from './api/schedule/useSchedule'
import { useScheduleCalculatePrice } from './api/schedule/useScheduleCalculatePrice'
import { useScheduleSave } from './api/schedule/useScheduleSave'
import { StudentModel } from './api/student/useStudent'
import { AppHeader } from './components/AppHeader'
import { Button } from './components/Button'
import { ClassData } from './components/ClassData'
import { DateContainer } from './components/DateContainer'
import { SelectClassOption } from './components/SelectClassOption'
import { SelectStudent } from './components/SelectStudent'
import { StudentData } from './components/StudentData'

export default function Page() {
  const [student, setStudent] = useState<StudentModel | null>(null)
  const [classOption, setClassOption] = useState<ClassOption | null>(null)
  const [date, setDate] = useState<DateTime | null>(
    DateTime.now().setZone(undefined, { keepLocalTime: true })
  )

  const router = useRouter()

  const { data: price, mutateAsync: calculatePrice } = useScheduleCalculatePrice()
  const { data: schedule, mutateAsync: saveSchedule, isLoading: savingSchedule } = useScheduleSave()

  const handlerScheduler = useCallback(() => {
    if (!date || !classOption || !student) {
      return
    }

    saveSchedule(
      {
        classInitialDate: date.toJSDate(),
        duration: classOption.duration,
        studentId: student.id!
      },
      {
        onSuccess: () => {
          router.replace('calendar')
        }
      }
    )
  }, [student, classOption, date])

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
            <View style={styles.box}>
              <Text style={styles.boxTitle}>Dados do aluno</Text>

              <View style={styles.stepContainer}>
                <StudentData student={student} />
              </View>
            </View>

            {!!price && (
              <View style={styles.box}>
                <Text style={styles.boxTitle}>Dados da aula</Text>

                <View style={styles.stepContainer}>
                  <DateContainer currentDate={date} onChange={setDate} />
                </View>

                <View style={styles.stepContainer}>
                  <SelectClassOption onChange={setClassOption} price={price} />
                </View>

                {!!classOption && (
                  <View style={styles.stepContainer}>
                    <ClassData price={price} classOption={classOption} />

                    <Button title="Agendar" disabled={savingSchedule} onPress={handlerScheduler} />
                  </View>
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
    width: '100%',
    borderRadius: 7
  },
  boxTitle: {
    fontSize: 16
  },
  form: {
    width: '100%'
  },
  stepContainer: {
    marginTop: 15
  }
})
