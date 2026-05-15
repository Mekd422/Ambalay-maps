import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'
import ForgotPasswordForm from '../Components/ui/auth/ForgotPasswordForm'

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Navbar />

      <main className="flex flex-grow items-center justify-center px-6 py-28">
        <div className="mx-auto w-full max-w-7xl">
          <ForgotPasswordForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
