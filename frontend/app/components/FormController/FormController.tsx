import { Fragment } from 'react'
import { StyleSheet, View } from 'react-native'

import { withSuspense } from '../../hocs/withSuspense'
import { useEditContext } from '../../providers/EditProvider'
import { useMutationContext } from '../../providers/MutationProvider'
import { Button } from '../Button'
import { useFormController } from './useFormController'

export const FormController = ({ controller }: FormControllerProps) => {
  const { isLoading } = useMutationContext()
  const { hasChanges, saveChanges, discardChanges } = controller

  return (
    <View style={styles.main}>
      {hasChanges && (
        <View style={{ flex: 1 }}>
          <Button
            title="Desfazer modificações"
            style={styles.button}
            disabled={isLoading}
            onPress={discardChanges}
          />
        </View>
      )}

      <View style={{ flex: 1 }}>
        <Button title="Salvar" style={styles.button} onPress={saveChanges} />
      </View>
    </View>
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
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  button: {}
})
