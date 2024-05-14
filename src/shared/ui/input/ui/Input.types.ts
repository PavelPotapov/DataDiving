import { InputHTMLAttributes } from 'react'

export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  extraAttrs?: string
  errorMsg?: string
  label?: string
  customClass?: string
}
