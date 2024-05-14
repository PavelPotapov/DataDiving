import { createApi, fetchBaseQuery, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import UserDataService from '@/shared/services/userService'
import { UserType } from '@/shared/types'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Users'],
  endpoints: builder => ({
    getUsers: builder.query<UserType[], void>({
      async queryFn() {
        try {
          const users = await UserDataService.getUsers()
          return { data: users }
        } catch (error: any) {
          console.error(error.message)
          return { error: error.message }
        }
      },
      providesTags: ['Users']
    }),
    addUser: builder.mutation({
      async queryFn({ avatar, name, surname, middlename, email, about }) {
        try {
          const isEmailUnique = await UserDataService.checkEmailUniqueness(email)
          if (!isEmailUnique) {
            throw new Error('Email уже используется другим пользователем.')
          }
          await UserDataService.createUser({ avatar, name, surname, middlename, email, about })
          return { data: null }
        } catch (error: any) {
          return { error: String(error.message) }
        }
      },
      invalidatesTags: ['Users']
    }),
    deleteUser: builder.mutation({
      async queryFn(userId) {
        try {
          await UserDataService.deleteUser(userId)
          return { data: userId }
        } catch (error: any) {
          return { error: String(error.message) }
        }
      },
      invalidatesTags: ['Users']
    }),
    deleteUsers: builder.mutation({
      async queryFn(userIds: string[]) {
        try {
          await UserDataService.deleteUsers(userIds)
          return { data: userIds }
        } catch (error: any) {
          return { error: String(error.message) }
        }
      },
      invalidatesTags: ['Users']
    }),
    getUserById: builder.query<UserType, string>({
      async queryFn(userId) {
        try {
          const user = await UserDataService.getUserById(userId)
          if (user) {
            return { data: user }
          } else {
            throw new Error('User not found')
          }
        } catch (error: any) {
          console.error(error.message)
          return { error: error.message }
        }
      },
      providesTags: (result, error, userId) => [{ type: 'Users', id: userId }]
    }),
    updateUser: builder.mutation({
      async queryFn({ userId, avatar, name, surname, middlename, email, about }) {
        try {
          const isEmailUnique = await UserDataService.checkEmailUniquenessWithId(email, userId)
          if (!isEmailUnique) {
            throw new Error('Email уже используется другим пользователем.')
          }
          const newData = { avatar, name, surname, middlename, email, about }
          const res = await UserDataService.updateUserById(userId, newData)
          return { data: userId }
        } catch (error: any) {
          return { error: String(error.message) }
        }
      },
      invalidatesTags: ['Users']
    })
  })
})

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useDeleteUsersMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation
} = usersApi
