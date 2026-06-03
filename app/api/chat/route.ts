import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const chatbotBaseUrl =
      process.env.NEXT_PUBLIC_CHATBOT_URL 

    if (!chatbotBaseUrl) {
      console.error(
        'Chat API Error: missing NEXT_PUBLIC_CHATBOT_URL, NEXT_PUBLIC_API_URL, or NEXT_PUBLIC_API_BASE_URL'
      )
      return NextResponse.json(
        {
          error:
            'Chatbot backend is not configured. Set NEXT_PUBLIC_CHATBOT_URL to the chatbot service origin.',
        },
        { status: 500 }
      )
    }

    const chatbotUrl = new URL('/api/chat', chatbotBaseUrl).toString()
    const requestUrl = new URL(request.url)
    const targetUrl = new URL(chatbotUrl)

    if (
      requestUrl.origin === targetUrl.origin &&
      requestUrl.pathname === targetUrl.pathname
    ) {
      console.error(
        'Chat API Error: chatbot proxy is configured to call the same application route'
      )
      return NextResponse.json(
        {
          error:
            'Chatbot proxy is configured incorrectly. Please set NEXT_PUBLIC_API_BASE_URL or NEXT_PUBLIC_API_URL to a separate chat backend origin.',
        },
        { status: 500 }
      )
    }

    const response = await fetch(chatbotUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Chatbot API Error: ${response.status} ${errorText}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      {
        error:
          'Failed to fetch chatbot response. Check your chat backend configuration and environment variables.',
      },
      { status: 500 }
    )
  }
}
