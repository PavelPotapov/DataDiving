import { useState, useEffect } from 'react'
import { loadImageFromBase64 } from '..'

export const useLoadAvatar = (userAvatar: string) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [img, setImg] = useState<HTMLImageElement>()

  useEffect(() => {
    loadImageFromBase64(userAvatar)
      .then(img => {
        setImg(img)
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [userAvatar])

  return { img, loading, error }
}
