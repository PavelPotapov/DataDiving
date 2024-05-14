export interface ToastOptions {
  position:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left'
  hideProgressBar: boolean
  autoClose: number | false
  closeOnClick: boolean
  pauseOnHover: boolean
  draggable: boolean
  progress?: undefined
  theme: 'light' | 'dark'
}
