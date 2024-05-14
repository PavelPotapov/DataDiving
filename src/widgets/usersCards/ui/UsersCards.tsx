import React from 'react'
import { UserCard } from '@/entities/userCard'
import { UserType } from '@/shared/types'
import styles from './UsersCards.module.scss'
import { SelectableCard } from '@/shared/ui/selectableCard/ui/SelectableCard'
import { DeleteUsers } from '@/features/deleteUsers'

interface UserCardsProps {
  users: UserType[]
}

type StateUsersIdType = Array<string>

const UsersCards = ({ users }: UserCardsProps) => {
  const [usersId, setUsersId] = React.useState<StateUsersIdType>([])
  const [filteredUsers, setFilteredUsers] = React.useState<UserType[]>([])
  const [countSelectedCards, setCountSelectedCards] = React.useState(0)

  const onDelete = () => {
    setCountSelectedCards(0)
    setUsersId([])
  }

  const onChange = (id: string, isSelected: boolean) => {
    if (isSelected) {
      setUsersId(state => [...state, id])
    } else {
      setUsersId(state => state.filter(userId => userId !== id))
    }
  }

  React.useEffect(() => {
    const filteredUsers = users.filter(user => {
      return user.id ? usersId.includes(user.id) : user.id !== undefined
    })
    setFilteredUsers(filteredUsers) // Присваиваем результат фильтрации в состояние filteredUsers
  }, [users, usersId])

  React.useEffect(() => {
    setCountSelectedCards(usersId.length)
  }, [usersId])

  return (
    <div>
      <DeleteUsers
        label={'Список для удаления:'}
        text={'Удалить пользователей'}
        users={filteredUsers}
        usersId={usersId}
        onDelete={onDelete}
      />
      <div className={styles.countSelectedUsers}>Выбрано: {countSelectedCards}</div>
      <div className={styles.cards}>
        {users.length === 0
          ? 'Нет данных в базе'
          : users.map(user => (
              <SelectableCard
                key={user.id}
                isSelect={false}
                onChange={isSelected => {
                  user.id && onChange(user.id, isSelected)
                }}
              >
                <UserCard {...user} />
              </SelectableCard>
            ))}
      </div>
    </div>
  )
}

export default UsersCards
