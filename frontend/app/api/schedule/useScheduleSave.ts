import { useCallback, useMemo } from 'react'
import { useMutation, UseMutationOptions } from 'react-query'

import { ScheduleCreateModel, ScheduleModel, useSchedule } from './useSchedule'

export const useScheduleSave = (
  options?: UseMutationOptions<ScheduleModel, unknown, TVariables>
) => {
  const { endpoint, create } = useSchedule()

  const mutationKey = useMemo(() => [endpoint], [endpoint])

  const mutationFn = useCallback(async (data: TVariables) => create(data), [create])

  const mutation = useMutation<ScheduleModel, unknown, TVariables>(mutationKey, mutationFn, {
    onError: () => {},
    onSuccess: (data, variables, context) => {
      console.log('Sucesso ao agendar aula')

      options?.onSuccess?.(data, variables, context)
    }
  })

  return mutation
}

type TVariables = ScheduleCreateModel
