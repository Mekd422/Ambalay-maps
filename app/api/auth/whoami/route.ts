import { proxyBackendRequest } from '../../../../src/server/backend'

export async function GET(request: Request) {
  return proxyBackendRequest(request, '/auth/whoami')
}
