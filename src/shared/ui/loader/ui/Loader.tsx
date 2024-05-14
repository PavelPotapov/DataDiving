import { Watch } from 'react-loader-spinner'
import styles from './Loader.module.scss'

interface LoaderProps {
  label?: string
}

export const Loader = ({ label }: LoaderProps) => {
  return (
    <div className={styles.loader}>
      {label}
      <Watch
        visible={true}
        height="80"
        width="80"
        radius="48"
        color="#99cc00"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}
