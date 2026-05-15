import Image from "next/image";
import { Link } from "react-router-dom";
// Importing icons from lucide-react (Standard for React/Tailwind)
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 md:px-12 py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Branding section */}
          <div className="sm:col-span-2 lg:col-span-8 space-y-8">
            <div className="flex items-center gap-3">
              <Image
                src="/icons/ambalay-logo.png"
                alt="AmbaLay Maps Logo"
                width={40}
                height={20}
                className="h-5 w-10"
              />
              <h4 className="text-xl font-medium font-sora tracking-tight">
                AmbaLay Maps
              </h4>
            </div>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm">
              Powerful and scalable geospatial services designed to integrate high-quality mapping, geocoding, routing, and location-based features into your applications.
            </p>

            {/* --- SOCIAL MEDIA ICONS --- */}
            <div className="flex items-center gap-4 pt-2">
              {[
                { icon: Twitter, href: "https://x.com/ambalay_maps" },
                { icon: Facebook, href: "https://www.facebook.com/ambalaymaps" },
                { icon: Instagram, href: "https://www.instagram.com/amba.lay.maps/" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/ambalay-maps/" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-[#8cff2e] hover:text-black transition-all duration-300"
                >
                  <social.icon size={18} strokeWidth={2} />
                </a>
              ))}
            </div>
            
            <div className="pt-4 flex items-center gap-2 text-sm text-gray-500">
              {/* <span className="text-[#8cff2e]">♥</span> 
              <span>Designed by <span className="text-white hover:text-[#8cff2e] transition-colors cursor-pointer">Hawi Girma ©2026</span></span> */}
            </div>
          </div>

          {/* Quick Menu */}
          <div className="sm:col-span-1 lg:col-span-2 text-center lg:text-right">
            <h4 className="font-medium text-white mb-6 uppercase text-xs tracking-widest">Quick Menu</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/#how-it-works" className="hover:text-[#8cff2e] transition-colors">How it works</Link></li>
              <li><Link to="/#features" className="hover:text-[#8cff2e] transition-colors">Features</Link></li>
              <li><Link to="/#testimonials" className="hover:text-[#8cff2e] transition-colors">Testimonials</Link></li>
              <li><Link to="/price" className="hover:text-[#8cff2e] transition-colors">Pricing</Link></li>
              <li><Link to="/register" className="hover:text-[#8cff2e] transition-colors">Waitlist</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div className="sm:col-span-1 lg:col-span-2 text-center lg:text-right">
            <h4 className="font-medium text-white mb-6 uppercase text-xs tracking-widest">Information</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-[#8cff2e] transition-colors">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#8cff2e] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-[#8cff2e] transition-colors">Terms</Link></li>
              <li><Link to="/blog" className="hover:text-[#8cff2e] transition-colors">Blog</Link></li>
              <li><Link to="/shop" className="hover:text-[#8cff2e] transition-colors">Shop</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
