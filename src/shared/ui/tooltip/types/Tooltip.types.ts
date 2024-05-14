import { ReactNode } from 'react'

export type DefaultTooltipProps = {
  title: string
  text: string
  delay: number
  customClass?: string
  children?: ReactNode
}

export type TooltipPos = {
  top?: string
  bottom?: string
  right?: string
  left?: string
  transform: string
}
