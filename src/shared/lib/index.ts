export { ScrollManagement } from './ScrollManagement'

export async function loadImageFromBase64(base64String: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      resolve(image)
    }
    image.onerror = error => {
      reject(error)
    }
    image.src = base64String
  })
}

export async function loadImageAsBase64(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const reader = new FileReader()
    const base64Promise: Promise<string> = new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const result = reader.result as string
        resolve(result)
      }
      reader.onerror = error => {
        reject(error)
      }
    })
    reader.readAsDataURL(blob)
    return base64Promise
  } catch (error) {
    console.error('Error loading image as Base64:', error)
    throw error
  }
}
