import { useEffect, useState } from 'react'
import { getServices } from '../api/subscription'

export const useServices = () => {
  const [services, setServices] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const res = await getServices()
        setServices(res.data.data || [])
      } catch (err) {
        console.error('Failed to fetch services:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return { services, loading }
}
