import { UserType } from '@/shared/types'
import React from 'react'
import styles from './UserProfile.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { EditUser } from '@/features/editUser'
import { useLoadAvatar } from '@/shared/lib/hooks'
import { Loader } from '@/shared/ui/loader'

interface IUserProfileProps {
  user?: UserType
  deleteUsersSlot: React.ReactNode
  editUsersSlot: React.ReactNode
}

//Можно адаптировать компонент UserCard, сделать его более универсальным, сейчас немного нарушен принцип DRY и схожие компоненты разделены
export const UserProfile = ({
  user,
  deleteUsersSlot: DeleteUsers,
  editUsersSlot: EditUser
}: IUserProfileProps) => {
  if (user) {
    const { img: avatarImage, loading: isLoadingAvatar, error } = useLoadAvatar(user.avatar)
    return (
      <article className={styles.userProfile}>
        <div className={styles.topSection}>
          <Link to="/">
            <button className="btn">Назад</button>
          </Link>
          {EditUser}
        </div>
        {DeleteUsers}
        <div className={styles.userProfileImg}>
          {isLoadingAvatar ? (
            <Loader label="Загрузка фото" />
          ) : (
            avatarImage && <img src={avatarImage.src} alt={`Avatar Image for ${name}`} />
          )}
        </div>
        <div className={styles.userInfo}>
          <p className={styles.title}>{user.surname}</p>
          <p className={styles.title}>{user.name}</p>
          <p className={styles.title}>{user.middlename}</p>
          <p className={styles.title}>{user.about}</p>
          <p className={styles.title}>📧: {user.email}</p>
        </div>
      </article>
    )
  }
}
