import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'
import ResetPasswordForm from '../Components/ui/auth/ResetPasswordForm'

export default function ResetPassword() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Navbar />

      <main className="flex flex-grow items-center justify-center px-6 py-28">
        <div className="mx-auto w-full max-w-7xl">
          <ResetPasswordForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
