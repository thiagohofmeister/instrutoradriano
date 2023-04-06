import { ComponentType, FC, Suspense, SuspenseProps } from 'react'

export const withSuspense = <Props extends object = {}>(
  WrappedComponent: ComponentType<Props>,
  suspenseProps: SuspenseProps
): FC<Props> => {
  return props => (
    <Suspense {...suspenseProps}>
      <WrappedComponent {...props} />
    </Suspense>
  )
}
