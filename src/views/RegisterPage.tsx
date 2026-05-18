import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'
import RegisterForm from '../Components/ui/auth/RegisterForm'

export default function Register() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Navbar />

      <main className="flex flex-grow items-center justify-center px-6 py-28">
        <div className="mx-auto w-full max-w-7xl">
          <RegisterForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
