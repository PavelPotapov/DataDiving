import React, { RefObject } from 'react'
import styles from './Tooltip.module.scss'
import * as T from '../types/Tooltip.types'
import * as constants from '../config/constants'

/**
 * Далее можно было бы развивать компонент, настраивать предпочитаем отображение.
 * По дефолту появляется сверху, если нет места - снизу, если родительский элемент ушел влево / вправо - подстраивается под ViewPort слева / справа
 */
export function Tooltip({ text, title, delay, customClass, children }: T.DefaultTooltipProps) {
  const [showToolTip, setShowToolTip] = React.useState(false)
  const [positionToolTip, setPositionToolTip] = React.useState<T.TooltipPos>(
    constants.topTooltipPos
  )
  const tooltipContainerRef: RefObject<HTMLDivElement> = React.useRef(null)
  const tooltipRef: RefObject<HTMLDivElement> = React.useRef(null)
  const refSetTimeout = React.useRef<NodeJS.Timeout>()
  const toolTipClasses = customClass ? `${styles.tooltip} ${customClass}` : `${styles.tooltip}` //Можно прокинуть свои дополнительные классы для новой стилизации

  const onMouseEnterHandler = () => {
    refSetTimeout.current = setTimeout(() => {
      setShowToolTip(true)
    }, delay)
  }

  const onMouseLeaveHandler = () => {
    clearTimeout(refSetTimeout.current)
    setShowToolTip(false)
  }

  const findPos = () => {
    const posTooltip = tooltipRef.current?.getBoundingClientRect()
    const posTooltipContainer = tooltipContainerRef.current?.getBoundingClientRect()
    let toolTipPos = constants.topTooltipPos //изначально подcтраиваемся под отображение сверху

    if (posTooltipContainer && posTooltip) {
      //top-bottom
      if (posTooltip.top < 0) {
        toolTipPos = constants.bottomTooltipPos
      } else if (posTooltip.bottom > window.innerHeight) {
        toolTipPos = constants.topTooltipPos
      }

      //left-right
      if (posTooltip.left < 0) {
        toolTipPos = {
          ...toolTipPos,
          transform: `${toolTipPos.transform} translateX(${-posTooltip.left}px)`
        }
      } else if (posTooltip.left + posTooltip.width > window.innerWidth) {
        toolTipPos = {
          ...toolTipPos,
          transform: `${toolTipPos.transform} translateX(${window.innerWidth - posTooltip.right}px)`
        }
      }
    }
    return toolTipPos
  }

  const handleAnimatedEnd = () => {
    //Дожидаемся заверешния анимации!!! ВАЖНО! ЕСЛИ этого не сделать, getBoundingClientRect в findPos может найти неверные координаты тултипа относительн ViewPort
    const toolTipPos = findPos()
    setPositionToolTip(toolTipPos)
  }

  return (
    <div
      className={styles.container}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      ref={tooltipContainerRef}
    >
      {children}
      {showToolTip && (
        <div
          ref={tooltipRef}
          className={toolTipClasses}
          style={positionToolTip}
          onAnimationEnd={handleAnimatedEnd}
        >
          {text}
        </div>
      )}
    </div>
  )
}
