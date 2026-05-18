'use client'

import Login from '../../src/views/Login'
import PublicOnlyPage from '../../src/Components/routing/PublicOnlyPage'

export default function LoginRoute() {
  return (
    <PublicOnlyPage>
      <Login />
    </PublicOnlyPage>
  )
}
