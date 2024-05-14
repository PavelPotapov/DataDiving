import { ReactNode } from 'react'

export type ModalProps = {
  isActive: boolean
  onClose?: () => void
  children?: ReactNode
}
