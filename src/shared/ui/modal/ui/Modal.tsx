import React from 'react'
import styles from './Modal.module.scss'
import { MouseEventHandler } from 'react'
import type * as T from './Modal.types'
import { ScrollManagement } from '@/shared/lib'
import CloseIcon from '@/shared/assets/icons/close.svg'

const Modal = ({ isActive, onClose, children }: T.ModalProps) => {
  const handleClickOutside = () => {
    if (typeof onClose === 'function') onClose()
  }

  const handleClickContent: MouseEventHandler<HTMLDivElement> = event => {
    event.stopPropagation()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (typeof onClose === 'function') onClose()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  React.useEffect(() => {
    isActive ? ScrollManagement.getInstance().lock() : ScrollManagement.getInstance().unlock()
  }, [isActive])

  return (
    <div
      className={`${styles.modal} ${isActive ? styles.isActive : ''}`}
      onClick={handleClickOutside}
    >
      <div className={styles.content} onClick={handleClickContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          <CloseIcon width={'100%'} height={'100%'} color="black" />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
