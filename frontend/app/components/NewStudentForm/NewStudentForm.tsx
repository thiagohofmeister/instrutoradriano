import { NewStudentFormInputs } from './NewStudentFormInputs'
import { NewStudentFormProvider } from './NewStudentFormProvider'

export const NewStudentForm = () => {
  return (
    <NewStudentFormProvider>
      <NewStudentFormInputs />
    </NewStudentFormProvider>
  )
}
