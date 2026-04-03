import Navbar from '../Components/layout/Navbar';
import Footer from "../Components/layout/Footer";
import LoginForm from "../Components/ui/auth/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-6 py-28">
        <div className="w-full max-w-7xl mx-auto">
           <LoginForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}