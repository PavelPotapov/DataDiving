import logoImg from '@/shared/assets/images/brawl.png'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <a href="/">
          Хедер 😎
        </a>
      </div>
    </header>
  )
}
