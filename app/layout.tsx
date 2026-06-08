import type { Metadata } from 'next'
import Script from 'next/script' 
import Providers from './providers'
import '../src/index.css'

const umamiEnabled = process.env.NEXT_PUBLIC_UMAMI_ENABLED === 'true'
const umamiScriptSrc = process.env.NEXT_PUBLIC_UMAMI_SRC
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
const shouldLoadUmami =
  process.env.NODE_ENV !== 'development' &&
  umamiEnabled &&
  !!umamiScriptSrc &&
  !!umamiWebsiteId

export const metadata: Metadata = {
  title: 'AmbaLay Maps',
  description: 'AmbaLay Maps dashboard and documentation',
  icons: {
    icon: '/icons/ambalay.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var theme=localStorage.getItem('theme');if(theme==='dark'||(!theme&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`,
          }}
        />
        
        {shouldLoadUmami ? (
          <Script
            defer
            src={umamiScriptSrc!}
            data-website-id={umamiWebsiteId!}
            strategy="afterInteractive"
          />
        ) : null}
        
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}