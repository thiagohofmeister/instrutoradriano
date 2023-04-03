import { useForm } from 'react-hook-form'
import { Button } from 'react-native'

import FormInputsContainer from './FormInputsContainer'
import Input from './Input'

const StudentForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<StudentFormFields>({
    mode: 'onSubmit',
    defaultValues: { name: '' }
  })
  const onSubmit = (data: any) => console.log(data)

  return (
    <form>
      <FormInputsContainer>
        <Input name="name" label="Nome" control={control} isRequired />
        <Input name="zipCode" label="CEP" control={control} isRequired />
      </FormInputsContainer>

      <Button title="Cadastrar" onPress={handleSubmit(onSubmit)} />
    </form>
  )
}

type StudentFormFields = {
  name: string
}

export default StudentForm
