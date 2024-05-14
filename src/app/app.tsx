import { Providers } from './providers'
import { AppRouter } from './routers'
import 'react-toastify/dist/ReactToastify.css'
import './styles'

const App = () => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  )
}

export default App
