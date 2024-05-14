import { ALLOWED_IMAGE_EXTENSIONS } from '../config/constants'

export function isImageFile(fileName: string): boolean {
  const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'))
  return ALLOWED_IMAGE_EXTENSIONS.includes(extension)
}
