'use client'

import ForgotPassword from '../../src/views/ForgotPassword'
import PublicOnlyPage from '../../src/Components/routing/PublicOnlyPage'

export default function ForgotPasswordRoute() {
  return (
    <PublicOnlyPage>
      <ForgotPassword />
    </PublicOnlyPage>
  )
}
