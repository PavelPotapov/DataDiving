import styles from './Input.module.scss'
import type * as T from './Input.types'
import { forwardRef } from 'react'

const Input = forwardRef<HTMLInputElement, T.CustomInputProps>(
  ({ type, form, label, errorMsg, customClass, onChange, ...extraAttrs }, ref) => {
    const inputClasses = customClass ? `${styles.input} ${customClass}` : `${styles.input}`
    return (
      <>
        <label className={inputClasses}>
          {label}
          <input type={type} form={form} onChange={onChange} ref={ref} {...extraAttrs} />
          <span className={styles.errorMsg}>{errorMsg}</span>
        </label>
      </>
    )
  }
)

export default Input
