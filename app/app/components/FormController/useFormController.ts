import { isEqual } from 'lodash'
import { useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { useMutationContext } from '../../providers/MutationProvider'
import { FormControllerController } from './FormController'

export const useFormController = (immutableDataQuery: any): FormControllerController => {
  const { mutateAsync } = useMutationContext()

  const { watch, reset, handleSubmit, getValues } = useFormContext()

  const data = watch()

  const immutableData = useMemo(
    () => immutableDataQuery || getValues(),
    [immutableDataQuery, getValues]
  )

  const hasChanges = useMemo(() => !isEqual(immutableData, data), [immutableData, data])

  const saveChanges = useCallback(async () => {
    !!data && mutateAsync(data!)
  }, [data, mutateAsync])

  const discardChanges = useCallback(() => {
    if (!!immutableData) reset(immutableData)
    else reset()
  }, [immutableData, reset])

  return {
    hasChanges,
    saveChanges: handleSubmit(saveChanges, e => console.error(e)),
    discardChanges
  }
}
