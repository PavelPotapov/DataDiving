import { UserType } from '@/shared/types'
import styles from './UserCard.module.scss'
import { Link } from 'react-router-dom'
import { useLoadAvatar } from '@/shared/lib/hooks'
import { Loader } from '@/shared/ui/loader'

const UserCard = ({ id, avatar, name, surname, middlename, email, about }: UserType) => {
  const { img: avatarImage, loading: isLoadingAvatar, error } = useLoadAvatar(avatar)

  return (
    <article className={`${styles.content}`}>
      <div className={styles.avatar}>
        {isLoadingAvatar ? (
          <Loader label="Загрузка фото" />
        ) : (
          avatarImage && <img src={avatarImage.src} alt={`Avatar Image for ${name}`} />
        )}
      </div>
      <div>
        <Link to={`/${id}`} className={styles.linkInfo}>
          <p>{surname}</p>
        </Link>
        <p>{name}</p>
        <p>📧: {email}</p>
      </div>
    </article>
  )
}

export default UserCard
