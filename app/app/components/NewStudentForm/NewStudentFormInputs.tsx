import { useController, useFormContext } from 'react-hook-form'

import { StudentModel } from '../../api/student/useStudent'
import { useMutationContext } from '../../providers/MutationProvider'
import { FormControllerDefault } from '../FormController/FormController'
import FormInputsContainer from '../FormInputsContainer'
import InputContainer from '../InputContainer'

export const NewStudentFormInputs = () => {
  const { mutateAsync } = useMutationContext()
  const { handleSubmit, watch } = useFormContext<StudentModel>()
  const name = useController<StudentModel, 'name'>({ name: 'name' })
  const zipCode = useController<StudentModel, 'address.zipCode'>({ name: 'address.zipCode' })

  return (
    <>
      <FormInputsContainer>
        <InputContainer label="Nome" controller={name} />
        <InputContainer label="CEP" controller={zipCode} />
      </FormInputsContainer>

      <FormControllerDefault />
    </>
  )
}
