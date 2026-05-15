import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Components/layout/Navbar';
import Footer from "../Components/layout/Footer";
import LoginForm from "../Components/ui/auth/LoginForm";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const flashMessage = (location.state as { flash?: string } | null)?.flash;

  useEffect(() => {
    if (!flashMessage) {
      return;
    }

    navigate(location.pathname, { replace: true, state: null });
  }, [flashMessage, location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-6 py-28">
        <div className="w-full max-w-7xl mx-auto">
           <LoginForm flashMessage={flashMessage} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
