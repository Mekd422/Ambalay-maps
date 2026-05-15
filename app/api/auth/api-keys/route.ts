import { proxyBackendRequest } from '../../../../src/server/backend'

export async function GET(request: Request) {
  return proxyBackendRequest(request, '/auth/api_keys')
}

export async function POST(request: Request) {
  const body = await request.text()

  return proxyBackendRequest(request, '/auth/generate_api_key', {
    method: 'POST',
    body,
    headers: {
      'content-type': request.headers.get('content-type') ?? 'application/json',
    },
  })
}
