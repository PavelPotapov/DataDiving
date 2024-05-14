import { configureStore } from '@reduxjs/toolkit'
import { usersApi } from '@/shared/api/usersApi'

export const setupStore = () =>
  configureStore({
    reducer: {
      [usersApi.reducerPath]: usersApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usersApi.middleware)
  })

export const store = setupStore()
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
