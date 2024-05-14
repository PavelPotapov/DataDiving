import React from 'react'
import Input from '../../input/ui/Input'
import styles from './SelectableCard.module.scss'

interface SelectableCard {
  isSelect: boolean
  readonly children: React.ReactNode
  onChange: (isSelected: boolean) => void
}

export const SelectableCard = ({ isSelect, children, onChange }: SelectableCard) => {
  const [isSelected, setIsSelected] = React.useState(isSelect)
  const handleChange = () => {
    setIsSelected(state => !state)
  }

  React.useEffect(() => {
    onChange(isSelected)
  }, [isSelected])

  return (
    <div className={styles.selectableCard}>
      <Input
        type="checkbox"
        customClass={styles.checkbox}
        checked={isSelected}
        onChange={handleChange}
      />
      {children}
    </div>
  )
}
