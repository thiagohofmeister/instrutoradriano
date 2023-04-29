import { useCallback, useMemo } from 'react'
import { useMutation, UseMutationOptions } from 'react-query'

import { CalculatePriceModel, useSchedule } from './useSchedule'

export const useScheduleCalculatePrice = (
  options?: UseMutationOptions<CalculatePriceModel, unknown, string>
) => {
  const { endpoint, calculatePrice } = useSchedule()

  const mutationKey = useMemo(() => [endpoint], [endpoint])

  const mutationFn = useCallback(
    async (studentId: string) => {
      return await calculatePrice(studentId)
    },
    [calculatePrice]
  )

  const mutation = useMutation<CalculatePriceModel, unknown, string>(mutationKey, mutationFn, {
    onError: () => {},
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
    }
  })

  return mutation
}
