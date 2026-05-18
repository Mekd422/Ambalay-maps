import API from './axios'
import type { AxiosError } from 'axios'

export interface SendMessagePayload {
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  company?: string
  inquiryType:
    | 'TECHNICAL_SUPPORT'
    | 'PARTNERSHIP_OPPORTUNITY'
    | 'SALES'
    | 'OTHER'
  message: string
}

export interface SendMessageData {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  company: string
  status: 'RECEIVED'
  inquiryType:
    | 'TECHNICAL_SUPPORT'
    | 'PARTNERSHIP_OPPORTUNITY'
    | 'SALES'
    | 'OTHER'
  message: string
  createdAt: string
  updatedAt: string
}

export interface SendMessageResponse {
  status: 'SUCCESS' | 'FAILURE'
  message: string
  data?: SendMessageData
}

export const sendMessage = async (payload: SendMessagePayload) => {
  try {
    const response = await API.post<SendMessageResponse>(
      '/business/contact_us',
      payload,
    )
    return response.data
  } catch (err: unknown) {
    console.error('Send Message Error:', err)

    if ((err as AxiosError<SendMessageResponse>).isAxiosError) {
      const axiosErr = err as AxiosError<SendMessageResponse>
      if (axiosErr.response?.data) {
        return Promise.reject(axiosErr.response.data)
      }
      return Promise.reject({ status: 'FAILURE', message: axiosErr.message })
    }

    if (err instanceof Error) {
      return Promise.reject({ status: 'FAILURE', message: err.message })
    }

    return Promise.reject({
      status: 'FAILURE',
      message: 'Something went wrong',
    })
  }
}
