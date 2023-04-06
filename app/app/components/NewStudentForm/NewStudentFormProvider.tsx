import { useSearchParams } from 'expo-router'
import { PropsWithChildren, useState } from 'react'
import { useForm } from 'react-hook-form'

import { StudentModel } from '../../api/student/useStudent'
import { useStudentSave } from '../../api/student/useStudentSave'
import { EditProvider } from '../../providers/EditProvider'

export const NewStudentFormProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { id } = useSearchParams<{ id?: string }>()

  const [immutableData, setImmutableData] = useState<StudentModel>({
    id,
    name: '',
    phone: '',
    address: {
      zipCode: '',
      street: '',
      city: '',
      number: '',
      complement: ''
    }
  })

  const form = useForm<StudentModel>({
    defaultValues: immutableData
  })

  const mutation = useStudentSave(id, {
    onSuccess: mutatedData => {
      if (!id && !!mutatedData?.id) {
        console.log('Redirecionar para a listagem')
      }
    }
  })

  return (
    <EditProvider form={form} mutation={mutation} immutableData={immutableData}>
      {children}
    </EditProvider>
  )
}
