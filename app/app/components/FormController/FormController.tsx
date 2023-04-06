import { Fragment } from 'react'
import { StyleSheet } from 'react-native'

import { withSuspense } from '../../hocs/withSuspense'
import { useEditContext } from '../../providers/EditProvider'
import { useMutationContext } from '../../providers/MutationProvider'
import Button from '../Button'
import { useFormController } from './useFormController'

export const FormController = ({ controller }: FormControllerProps) => {
  const { isLoading } = useMutationContext()
  const { hasChanges, saveChanges, discardChanges } = controller

  return (
    <div style={styles.main}>
      {hasChanges && (
        <Button title="Desfazer modificações" disabled={isLoading} onPress={discardChanges} />
      )}

      <Button title="Salvar" onPress={saveChanges} />
    </div>
  )
}

export const FormControllerDefault = () => {
  const { immutableData } = useEditContext()
  const controller = useFormController(immutableData)

  return <FormController controller={controller} />
}

export const FormControllerCustom = withSuspense<{
  useController: () => FormControllerController
}>(
  ({ useController }) => {
    const controller = useController()

    return <FormController controller={controller} />
  },
  {
    fallback: <Fragment />
  }
)

export type FormControllerController = {
  hasChanges: boolean
  saveChanges: () => Promise<void>
  discardChanges: () => void
}

export type FormControllerProps = {
  controller: FormControllerController
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    display: 'flex',
    gap: 40,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})
