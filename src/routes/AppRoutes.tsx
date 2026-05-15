import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../views/Home"
import Documentation from "../views/Documentation"
import Contact from "../views/Contact"
import BlogS from "../views/Blog"
import Shop from "../views/Shop"
import Price from "../views/Pricing"
import ScrollToHash from "../utils/ScrollToHash"
import Register from "../views/RegisterPage"
import Login from "../views/Login"
import VerifyOtp from "../views/VerifyOtp"
import ForgotPassword from "../views/ForgotPassword"
import ResetPassword from "../views/ResetPassword"
import UserDashboard from "../views/UserDashboard"
import ProtectedRoute from "../Components/ProtectedRoute"
import PublicOnlyRoute from "../Components/PublicOnlyRoute"
import PrivacyPolicy from "../Components/ui/PrivacyPolicy"
import TermsOfService from "../Components/ui/TermsOfService"


export default function AppRoutes() {
  return (
    <BrowserRouter>

      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<BlogS />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/price"element={<Price/>} />
        <Route path="/register"element={<PublicOnlyRoute><Register/></PublicOnlyRoute>} />
        <Route path="/login"element={<PublicOnlyRoute><Login/></PublicOnlyRoute>} />
        <Route path="/verify-otp" element={<PublicOnlyRoute><VerifyOtp /></PublicOnlyRoute>} />
        <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute>} />
        <Route path="/reset-password" element={<PublicOnlyRoute><ResetPassword /></PublicOnlyRoute>} />
        <Route path="/dashboard/*" element={<ProtectedRoute><UserDashboard/></ProtectedRoute>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </BrowserRouter>
  )
}
