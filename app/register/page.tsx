'use client'

import RegisterPage from '../../src/views/RegisterPage'
import PublicOnlyPage from '../../src/Components/routing/PublicOnlyPage'

export default function RegisterRoute() {
  return (
    <PublicOnlyPage>
      <RegisterPage />
    </PublicOnlyPage>
  )
}
