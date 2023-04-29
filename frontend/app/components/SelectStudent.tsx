import { useCallback, useMemo } from 'react'

import { StudentModel } from '../api/student/useStudent'
import { useStudentGetList } from '../api/student/useStudentGetList'
import { SelectContainer, SelectOptions } from './SelectContainer'

export const SelectStudent: React.FC<SelectStudentProps> = ({ value, onChange }) => {
  const { data: students } = useStudentGetList({})

  const studentOptions = useMemo<SelectOptions>(() => {
    return students?.items.map(item => ({ label: item.name, value: item.id! })) || []
  }, [students])

  const handlerStudentSelect = useCallback(
    (value: string | number | null) => {
      const student = students?.items.find(student => student.id === value) || null
      console.log({ student, value })
      onChange(student)
    },
    [students, onChange]
  )

  return (
    <SelectContainer
      value={value?.id || null}
      label="Escolha o aluno"
      options={studentOptions}
      onChange={handlerStudentSelect}
      isRequired
    />
  )
}

type SelectStudentProps = {
  value: StudentModel | null
  onChange: (student: StudentModel | null) => void
}
