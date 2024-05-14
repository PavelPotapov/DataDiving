import { CreateUser } from '@/features/createUser'
import { UsersCards } from '@/widgets/usersCards'
import { Loader } from '@/shared/ui/loader'
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useDeleteUsersMutation
} from '@/shared/api/usersApi'
import React from 'react'

export const RootPage = () => {
  const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery()
  
  return (
    <>
      <CreateUser />
      {isLoading ? (
        <Loader label="Ожидайте загрузки данных из Firebase, это может занять до 1 минуты" />
      ) : isError ? (
        'Нет данных в базе'
      ) : users ? (
        <UsersCards users={users} />
      ) : (
        'Нет пользователей'
      )}
    </>
  )
}
