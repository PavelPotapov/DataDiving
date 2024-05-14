export const ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg']
import { ToastOptions } from '../types/index'

export const STATUS_MESSAGES = {
  errorUpload: 'Ошибка загрузки файла',
  errorFormat: `Неверный формат файла. Доступные форматы: ${ALLOWED_IMAGE_EXTENSIONS.join(' ')}`,
  emptyInput: 'Пожалуйста, заполните поле',
  emptyAvatar: 'Выберите себе автар'
}

export const URL_FOR_AVATARS = {
  cats: 'https://cataas.com/cat'
}

export const defaultToastOptions: ToastOptions = {
  position: 'bottom-left',
  hideProgressBar: false,
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light'
}
