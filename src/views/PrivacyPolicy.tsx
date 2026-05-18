import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'
import { useEffect } from 'react'
import PrivacyPolicy from '../Components/ui/PrivacyPolicy'

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white font-sora transition-colors duration-300 selection:bg-[#8cff2e] selection:text-black dark:bg-black">
      <Navbar />

      <main className="pt-20">
        <PrivacyPolicy />
      </main>

      <Footer />
    </div>
  )
}
