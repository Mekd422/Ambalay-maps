import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const scrollToElement = () => {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        window.scrollBy(0, -80)
      } else {
        // retry if not found yet
        setTimeout(scrollToElement, 100)
      }
    }

    scrollToElement()
  }, [hash])

  return null
}
