import API from './axios'

export interface ContactMessageRecord {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  company: string
  message?: string
  status: string
  inquiryType: string
  createdAt: string
  updatedAt: string
}

export interface ContactMessagesPagination {
  page: number
  limit: number
  totalItems: number
  totalPages: number
}

export interface ContactMessagesResult {
  pagination: ContactMessagesPagination
  data: ContactMessageRecord[]
}

export const formatContactMessageName = (
  message: Pick<ContactMessageRecord, 'firstName' | 'lastName'>,
) => `${message.firstName ?? ''} ${message.lastName ?? ''}`.trim()

export const getContactMessages = async (
  page = 1,
  limit = 20,
): Promise<ContactMessagesResult> => {
  try {
    const res = await API.get('/business/contact_us', {
      params: { page, limit },
    })

    const messages: ContactMessageRecord[] = Array.isArray(res.data.data?.data)
      ? res.data.data.data
      : []

    const pagination: ContactMessagesPagination = res.data.data?.pagination ?? {
      page,
      limit,
      totalItems: messages.length,
      totalPages: 1,
    }

    return {
      pagination,
      data: messages,
    }
  } catch (err) {
    console.error('Failed to fetch contact messages', err)
    throw err
  }
}

export const getContactMessage = async (
  id: string,
): Promise<ContactMessageRecord> => {
  const res = await API.get(`/business/contact_us/${id}`)
  return res.data.data
}

export const updateContactMessageStatus = async (
  messageId: string,
  status: string,
): Promise<ContactMessageRecord> => {
  const res = await API.put('/business/contact_us/status_update', {
    messageId,
    status,
  })

  return res.data.data
}

export const getContactUsStatuses = async (): Promise<string[]> => {
  const res = await API.get('/types/contact_us_statuses')
  return Array.isArray(res.data.data) ? res.data.data : []
}

export const getContactUsInquiries = async (): Promise<string[]> => {
  const res = await API.get('/types/contact_us_inquiries')
  return Array.isArray(res.data.data) ? res.data.data : []
}
