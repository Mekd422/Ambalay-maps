import Navbar from '../Components/layout/Navbar';
import Footer from "../Components/layout/Footer";
import ResetPasswordForm from "../Components/ui/auth/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-6 py-28">
        <div className="w-full max-w-7xl mx-auto">
          <ResetPasswordForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
