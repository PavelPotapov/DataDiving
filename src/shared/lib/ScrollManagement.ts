interface ScrollState {
  isLocked: boolean
}
/**
 * Класс помощник (SingleTone) для контроля скрола страницы. Если надо где-либо запретить скрол - lock(), разрешить снова unscroll()
 * ВАЖНО! иметь следующие стили в css, чтобы все корректно работало
 * html.noscroll {
 * position: fixed;
 * overflow-y: scroll;
 * width: 100%;
 * top: var(--st);
 * }
 */
export class ScrollManagement {
  private static instance: ScrollManagement
  private state: ScrollState
  private cssVars: Record<string, string>
  private lastPosition: number

  private constructor() {
    this.state = {
      isLocked: false
    }

    this.cssVars = {
      st: '--st'
    }

    this.lastPosition = 0
  }

  static getInstance(): ScrollManagement {
    return this.instance || (this.instance = new ScrollManagement())
  }

  lock(): void {
    this.state.isLocked = true
    this.setCSSVar(
      document.documentElement,
      this.cssVars.st,
      -1 * document.documentElement.scrollTop + 'px'
    )
    this.lastPosition = document.documentElement.scrollTop
    document.documentElement.classList.add('noscroll')
  }

  unlock(): void {
    this.state.isLocked = false
    document.documentElement.classList.remove('noscroll')
    window.scrollTo(0, this.lastPosition)
  }

  get isLocked(): boolean {
    return this.state.isLocked
  }

  private setCSSVar(element: HTMLElement, variable: string, value: string): void {
    element.style.setProperty(variable, value)
  }
}
