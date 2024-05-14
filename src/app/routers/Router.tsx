import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense } from 'react'
import { RootPage } from '@/pages/Root/RootPage'
import { UserDetails } from '@/pages/UserDetails'
import ErrorPage from '@/pages/ErrorPage/ui/ErrorPage'
import Layout from '@/pages/Layout/Layout'
import { Loader } from '@/shared/ui/loader'

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <RootPage />
        },
        {
          path: '/:id',
          element: (
            <Suspense fallback={<Loader label="Загрузка данных пользователя" />}>
              <UserDetails />
            </Suspense>
          )
        },
        {
          path: '*',
          element: <NotFoundRedirect />
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

const NotFoundRedirect = () => {
  window.location.href = '/'
  return null
}
