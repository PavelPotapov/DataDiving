import Modal from '@/shared/ui/modal/ui/Modal'
import React from 'react'
import { UserType } from '@/shared/types'
import { Tooltip } from '@/shared/ui/tooltip'
import { useDeleteUsersMutation } from '@/shared/api/usersApi'
import styles from './DeleteUsers.module.scss'
import CloseIcon from '@/shared/assets/icons/close.svg'
import { toast } from 'react-toastify'
import * as constants from '../config/constants'
import { Loader } from '@/shared/ui/loader'

interface IDeleteUsersProps {
  label: string
  text: string
  users: UserType[]
  usersId: string[]
  onDelete: () => void
}

export const DeleteUsers = ({ label, text, users, usersId, onDelete }: IDeleteUsersProps) => {
  const [isActive, setIsActive] = React.useState(false)

  const [deleteUsers, { isLoading: isLoadingDelete, isError: isErrorDelete, error: errorDelete }] =
    useDeleteUsersMutation()

  const handleDeleteUsers = async (usersId: string[]) => {
    try {
      await deleteUsers(usersId)
      toast.success('Выбранные пользователи удалены', constants.defaultToastOptions)
      onDelete()
    } catch (e) {
      toast.error(e, constants.defaultToastOptions)
    } finally {
      onClose()
    }
  }

  const onClose = () => {
    setIsActive(false)
  }

  const onOpen = () => {
    setIsActive(true)
  }

  return (
    <>
      <div className={styles.deleteBtn}>
        <Tooltip text="Удалить выбранных пользователей" title="Я заголовок" delay={750}>
          <button className="btn" onClick={onOpen} disabled={usersId.length > 0 ? false : true}>
            {text}
          </button>
        </Tooltip>
      </div>
      <Modal isActive={isActive} onClose={onClose}>
        <button className={styles.closeBtn} onClick={onClose}>
          <CloseIcon width={'100%'} height={'100%'} color="black" />
        </button>

        <p>{label}</p>
        <div className={styles.content}>
          <ul style={{marginBottom: "7rem"}}>
            {users.map((user, index) => (
              <li key={user.id}>
                {index + 1}. {`${user.surname} ${user.name} ${user?.middlename}`}
              </li>
            ))}
          </ul>
          <button
            style={{ marginTop: 'auto' }}
            className="btn"
            onClick={() => handleDeleteUsers(usersId)}
          >
            Удалить
          </button>
        </div>
        {isLoadingDelete && <Loader label="Удаление..." />}
      </Modal>
    </>
  )
}
