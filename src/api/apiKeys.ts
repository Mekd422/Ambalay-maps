import { BFF_API } from './axios'

export interface ApiKey {
  id: string
  label: string
  secret: string
  status: 'ACTIVE' | 'REVOKED'
  services: string[]
  createdAt: string
  expiresAt: string | null
}

interface BackendApiKey {
  id: string
  label: string
  secret: string
  allowedServices: string[]
  createdAt: string
  revokedAt: string | null
  expiresAt: string | null
}

interface ApiResponse<T> {
  data: T
}

const mapApiKey = (key: BackendApiKey): ApiKey => ({
  id: key.id,
  label: key.label,
  secret: key.secret,
  status: key.revokedAt ? 'REVOKED' : 'ACTIVE',
  services: key.allowedServices || [],
  createdAt: key.createdAt,
  expiresAt: key.expiresAt,
})

export const getApiKeys = async () => {
  const res = await BFF_API.get<ApiResponse<BackendApiKey[]>>('/auth/api-keys')
  return (res.data.data || []).map(mapApiKey)
}

export const createApiKey = async (data: {
  label: string
  allowedServices: string[]
}) => {
  const res = await BFF_API.post<ApiResponse<BackendApiKey>>(
    '/auth/api-keys',
    data,
  )
  return mapApiKey(res.data.data)
}
