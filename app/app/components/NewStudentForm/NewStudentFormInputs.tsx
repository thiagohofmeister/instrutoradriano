import { useCallback, useEffect } from 'react'
import { useController } from 'react-hook-form'

import { StudentModel } from '../../api/student/useStudent'
import { useZipCodeFindOne } from '../../api/zipCode/useZipCodeFindOne'
import { FormControllerDefault } from '../FormController/FormController'
import FormGroup from '../FormGroup'
import FormInputsContainer from '../FormInputsContainer'
import InputContainer from '../InputContainer'

export const NewStudentFormInputs = () => {
  const name = useController<StudentModel, 'name'>({ name: 'name' })
  const phone = useController<StudentModel, 'phone'>({ name: 'phone' })
  const zipCode = useController<StudentModel, 'address.zipCode'>({ name: 'address.zipCode' })
  const city = useController<StudentModel, 'address.city'>({ name: 'address.city' })
  const street = useController<StudentModel, 'address.street'>({ name: 'address.street' })
  const number = useController<StudentModel, 'address.number'>({ name: 'address.number' })
  const complement = useController<StudentModel, 'address.complement'>({
    name: 'address.complement'
  })

  const { isLoading, data } = useZipCodeFindOne(zipCode.field.value, {
    enabled: zipCode.field.value.length === 8
  })

  const handlerZipCode = useCallback(
    (value: string) => {
      const newValue = value.trim().replace(/\D/g, '').substring(0, 8)

      if (newValue === zipCode.field.value) return

      zipCode.field.onChange(newValue)

      if (newValue.length === 8) {
        console.log('Buscar endereço')
      }
    },
    [zipCode]
  )

  useEffect(() => {
    city.field.onChange(data?.city)
    street.field.onChange(data?.street)
  }, [data])

  return (
    <>
      <FormInputsContainer>
        <FormGroup>
          <InputContainer label="Nome" controller={name} isRequired />
        </FormGroup>

        <FormGroup>
          <InputContainer label="Telefone" controller={phone} isRequired />
        </FormGroup>

        <FormGroup>
          <InputContainer label="CEP" controller={zipCode} onChange={handlerZipCode} isRequired />
        </FormGroup>

        <FormGroup>
          <InputContainer label="Cidade" controller={city} isRequired />
        </FormGroup>

        <FormGroup>
          <InputContainer label="Rua" controller={street} isRequired />
          <InputContainer label="Número" controller={number} isRequired />
        </FormGroup>

        <FormGroup>
          <InputContainer label="Complemento" controller={complement} />
        </FormGroup>
      </FormInputsContainer>

      <FormControllerDefault />
    </>
  )
}
