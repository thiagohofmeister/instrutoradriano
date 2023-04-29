import { useCallback, useMemo } from 'react'

import { CalculatePriceModel, ClassOption } from '../api/schedule/useSchedule'
import { SelectContainer, SelectOptions } from './SelectContainer'

export const SelectClassOption: React.FC<SelectClassOptionProps> = ({ value, price, onChange }) => {
  const classOptions = useMemo<SelectOptions>(() => {
    return (
      price?.options?.map(item => ({ label: item.label, value: item.duration.toString() })) || []
    )
  }, [price])

  const handlerClassSelect = useCallback(
    (minutes: string | number | null) => {
      onChange(
        price?.options?.find(option => option.duration === parseInt((minutes as string) || '0')) ||
          null
      )
    },
    [price, onChange]
  )

  return (
    <SelectContainer
      label="Escolha a opção de aula"
      options={classOptions}
      onChange={handlerClassSelect}
      isRequired
      value={value?.duration.toString() || null}
    />
  )
}

type SelectClassOptionProps = {
  value: ClassOption | null
  price: CalculatePriceModel
  onChange: (student: ClassOption | null) => void
}
