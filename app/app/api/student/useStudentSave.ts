import { useCallback, useMemo } from 'react'
import { useMutation, UseMutationOptions, useQueryClient } from 'react-query'

import { StudentModel, useStudent } from './useStudent'

export const useStudentSave = (
  id?: string,
  options?: UseMutationOptions<StudentModel, unknown, StudentModel>
) => {
  const queryClient = useQueryClient()
  const { endpoint, create, update } = useStudent()

  const mutationKey = useMemo(() => [endpoint, id], [endpoint, id])

  const mutationFn = useCallback(
    async (student: StudentModel) => {
      if (id) {
        return await update(id, student)
      }

      return await create(student)
    },
    [id, create, update]
  )

  const mutation = useMutation<StudentModel, unknown, StudentModel>(mutationKey, mutationFn, {
    onError: () => {},
    onSuccess: (data, variables, context) => {
      if (id) {
        queryClient.setQueryData(mutationKey, data)
        console.log('Sucesso ao atualizar aluno')
        return
      }

      console.log('Sucesso ao cadastrar aluno')

      options?.onSuccess?.(data, variables, context)
    }
  })

  return mutation
}
