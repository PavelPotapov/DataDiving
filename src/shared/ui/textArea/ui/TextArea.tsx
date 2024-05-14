import styles from './TextArea.module.scss'
import type * as T from './TextArea.types'

export const TextArea = ({
  form,
  label,
  errorMsg,
  customClass,
  ...extraAttrs
}: T.CustomInputProps) => {
  const inputClasses = customClass ? `${styles.textarea} ${customClass}` : `${styles.textarea}` //Можно прокинуть свои дополнительные классы для новой стилизации
  return (
    <>
      <label className={inputClasses}>
        {label}
        <textarea form={form} {...extraAttrs}></textarea>
        <span className={styles.errorMsg}>{errorMsg}</span>
      </label>
    </>
  )
}
