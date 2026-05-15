const getBackendBaseUrl = () => {
  const baseUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL

  if (!baseUrl) {
    throw new Error(
      'Missing API_URL or NEXT_PUBLIC_API_URL environment variable',
    )
  }

  return baseUrl.replace(/\/$/, '')
}

const getForwardHeaders = (request: Request, init?: RequestInit) => {
  const headers = new Headers(init?.headers)
  const authorization = request.headers.get('authorization')

  if (authorization) {
    headers.set('authorization', authorization)
  }

  if (!headers.has('accept')) {
    headers.set('accept', 'application/json')
  }

  return headers
}

export const proxyBackendRequest = async (
  request: Request,
  path: string,
  init?: RequestInit,
) => {
  const response = await fetch(`${getBackendBaseUrl()}${path}`, {
    ...init,
    headers: getForwardHeaders(request, init),
    cache: 'no-store',
  })

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      'content-type':
        response.headers.get('content-type') ?? 'application/json',
    },
  })
}
