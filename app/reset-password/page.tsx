'use client'

import ResetPassword from '../../src/views/ResetPassword'
import PublicOnlyPage from '../../src/Components/routing/PublicOnlyPage'

export default function ResetPasswordRoute() {
  return (
    <PublicOnlyPage>
      <ResetPassword />
    </PublicOnlyPage>
  )
}
