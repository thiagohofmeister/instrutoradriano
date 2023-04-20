import { useCallback, useMemo, useState } from 'react'
import { StudentModel } from '../api/student/useStudent'
import { useStudentGetList } from '../api/student/useStudentGetList'
import SelectContainer, { SelectOptions } from './SelectContainer'

export const SelectStudent: React.FC<SelectStudentProps> = ({ onChange }) => {
  const { data: students } = useStudentGetList({})

  const studentOptions = useMemo<SelectOptions>(() => {
    return students?.items.map(item => ({ label: item.name, value: item.id! })) || []
  }, [students])

  const handlerStudentSelect = useCallback(
    (id: string) => {
      onChange(students?.items.find(student => student.id === id) || null)
    },
    [students, onChange]
  )

  return (
    <SelectContainer
      label="Escolha o aluno"
      options={studentOptions}
      onChange={handlerStudentSelect}
      isRequired
    />
  )
}

type SelectStudentProps = {
  onChange: (student: StudentModel | null) => void
}
