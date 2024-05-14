import { FallBack } from '@/shared/ui/fallback'
import { store } from '../store/store'
import { FC } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'

interface IProviders {
  readonly children: React.ReactNode
}

export const Providers: FC<IProviders> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={FallBack}>
      <Provider store={store}>{children}</Provider>
    </ErrorBoundary>
  )
}
