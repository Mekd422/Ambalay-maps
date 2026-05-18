import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'
import LoginForm from '../Components/ui/auth/LoginForm'

export default function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  const flashMessage = (location.state as { flash?: string } | null)?.flash

  useEffect(() => {
    if (!flashMessage) {
      return
    }

    navigate(location.pathname, { replace: true, state: null })
  }, [flashMessage, location.pathname, navigate])

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Navbar />

      <main className="flex flex-grow items-center justify-center px-6 py-28">
        <div className="mx-auto w-full max-w-7xl">
          <LoginForm flashMessage={flashMessage} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
