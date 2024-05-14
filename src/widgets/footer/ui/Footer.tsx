import styles from './Footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>
        <a href="/">Футер 👋</a>
      </div>
    </footer>
  )
}
