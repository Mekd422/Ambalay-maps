import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'
import VerifyOtpForm from '../Components/ui/auth/VerifyOtpForm'

export default function VerifyOtp() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Navbar />

      <main className="flex flex-grow items-center justify-center px-6 py-28">
        <div className="mx-auto w-full max-w-7xl">
          <VerifyOtpForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
