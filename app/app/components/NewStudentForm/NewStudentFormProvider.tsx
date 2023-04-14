import { useRouter, useSearchParams } from 'expo-router'
import { PropsWithChildren, useState } from 'react'
import { useForm } from 'react-hook-form'

import { StudentModel } from '../../api/student/useStudent'
import { useStudentSave } from '../../api/student/useStudentSave'
import { EditProvider } from '../../providers/EditProvider'

export const NewStudentFormProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { id } = useSearchParams<{ id?: string }>()

  const router = useRouter()

  const [immutableData, setImmutableData] = useState<StudentFormModel>({
    id,
    name: '',
    phone: '',
    address: {
      zipCode: '',
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
        router.replace('/students')
      }
    }
  })

  return (
    <EditProvider form={form} mutation={mutation} immutableData={immutableData}>
      {children}
    </EditProvider>
  )
}

type StudentFormModel = {
  id: string | undefined
  name: string
  phone: string
  address: {
    zipCode: string
    number: string
    complement: string
  }
}
