import { useCallback, useMemo } from 'react'
import { CalculatePriceModel, ClassOption } from '../api/schedule/useSchedule'
import SelectContainer, { SelectOptions } from './SelectContainer'

export const SelectClassOption: React.FC<SelectClassOptionProps> = ({ price, onChange }) => {
  const classOptions = useMemo<SelectOptions>(() => {
    return (
      price?.options?.map(item => ({ label: item.label, value: item.duration.toString() })) || []
    )
  }, [price])

  const handlerClassSelect = useCallback(
    (minutes: string) => {
      onChange(price?.options?.find(option => option.duration === parseInt(minutes)) || null)
    },
    [price, onChange]
  )

  return (
    <SelectContainer
      label="Escolha o aluno"
      options={classOptions}
      onChange={handlerClassSelect}
      isRequired
    />
  )
}

type SelectClassOptionProps = {
  price: CalculatePriceModel
  onChange: (student: ClassOption | null) => void
}
