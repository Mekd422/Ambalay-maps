import type { Metadata } from 'next'
import Script from 'next/script'
import Providers from './providers'
import '../src/index.css'

const umamiEnabled = process.env.NEXT_PUBLIC_UMAMI_ENABLED === 'true'
const umamiScriptSrc = process.env.NEXT_PUBLIC_UMAMI_SRC
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

export const metadata: Metadata = {
  title: 'AmbaLay Maps',
  description: 'AmbaLay Maps dashboard and documentation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {umamiEnabled && umamiScriptSrc && umamiWebsiteId ? (
          <Script
            defer
            src={umamiScriptSrc}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        ) : null}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
