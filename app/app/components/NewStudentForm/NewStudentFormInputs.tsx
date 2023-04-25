import { useController } from 'react-hook-form'

import { StudentModel } from '../../api/student/useStudent'
import { FormControllerDefault } from '../FormController/FormController'
import { FormGroup } from '../FormGroup'
import { FormInputsContainer } from '../FormInputsContainer'
import { InputContainer } from '../InputContainer'

export const NewStudentFormInputs = () => {
  const name = useController<StudentModel, 'name'>({ name: 'name' })
  const phone = useController<StudentModel, 'phone'>({ name: 'phone' })
  const zipCode = useController<StudentModel, 'address.zipCode'>({ name: 'address.zipCode' })
  const number = useController<StudentModel, 'address.number'>({ name: 'address.number' })
  const complement = useController<StudentModel, 'address.complement'>({
    name: 'address.complement'
  })

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
          <InputContainer label="CEP" controller={zipCode} isRequired />
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
