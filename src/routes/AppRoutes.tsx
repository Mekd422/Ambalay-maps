import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Documentation from "../pages/Documentation"
import Contact from "../pages/Contact"
import BlogS from "../pages/Blog"
import Shop from "../pages/Shop"
import Price from "../pages/Pricing"
import ScrollToHash from "../utils/ScrollToHash"
import Register from "../pages/RegisterPage"
import Login from "../pages/Login"
import UserDashboard from "../pages/UserDashboard"
import ProtectedRoute from "../Components/ProtectedRoute"
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
        <Route path="/register"element={<Register/>} />
        <Route path="/login"element={<Login/>} />
        <Route path="/dashboard/*" element={<ProtectedRoute><UserDashboard/></ProtectedRoute>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </BrowserRouter>
  )
}
