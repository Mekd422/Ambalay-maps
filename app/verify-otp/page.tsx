'use client'

import VerifyOtp from '../../src/views/VerifyOtp'
import PublicOnlyPage from '../../src/Components/routing/PublicOnlyPage'

export default function VerifyOtpRoute() {
  return (
    <PublicOnlyPage>
      <VerifyOtp />
    </PublicOnlyPage>
  )
}
