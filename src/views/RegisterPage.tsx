import Navbar from '../Components/layout/Navbar';
import Footer from "../Components/layout/Footer";
import RegisterForm from "../Components/ui/auth/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-6 py-28">
        <div className="w-full max-w-7xl mx-auto">
           <RegisterForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
