import Image from 'next/image'
import { Link } from 'react-router-dom'
// Importing icons from lucide-react (Standard for React/Tailwind)
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Branding section */}
          <div className="space-y-8 sm:col-span-2 lg:col-span-8">
            <div className="flex items-center gap-3">
              <Image
                src="/icons/ambalay-logo.png"
                alt="AmbaLay Maps Logo"
                width={40}
                height={20}
                className="h-5 w-10"
              />
              <h4 className="font-sora text-xl font-medium tracking-tight">
                AmbaLay Maps
              </h4>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-gray-400">
              Powerful and scalable geospatial services designed to integrate
              high-quality mapping, geocoding, routing, and location-based
              features into your applications.
            </p>

            {/* --- SOCIAL MEDIA ICONS --- */}
            <div className="flex items-center gap-4 pt-2">
              {[
                { icon: Twitter, href: 'https://x.com/ambalay_maps' },
                {
                  icon: Facebook,
                  href: 'https://www.facebook.com/ambalaymaps',
                },
                {
                  icon: Instagram,
                  href: 'https://www.instagram.com/amba.lay.maps/',
                },
                {
                  icon: Linkedin,
                  href: 'https://www.linkedin.com/company/ambalay-maps/',
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:bg-[#8cff2e] hover:text-black"
                >
                  <social.icon size={18} strokeWidth={2} />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-4 text-sm text-gray-500">
              {/* <span className="text-[#8cff2e]">♥</span> 
              <span>Designed by <span className="text-white hover:text-[#8cff2e] transition-colors cursor-pointer">Hawi Girma ©2026</span></span> */}
            </div>
          </div>

          {/* Quick Menu */}
          <div className="text-center sm:col-span-1 lg:col-span-2 lg:text-right">
            <h4 className="mb-6 text-xs font-medium uppercase tracking-widest text-white">
              Quick Menu
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link
                  to="/#how-it-works"
                  className="transition-colors hover:text-[#8cff2e]"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  to="/#features"
                  className="transition-colors hover:text-[#8cff2e]"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/#testimonials"
                  className="transition-colors hover:text-[#8cff2e]"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  to="/price"
                  className="transition-colors hover:text-[#8cff2e]"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="transition-colors hover:text-[#8cff2e]"
                >
                  Waitlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="text-center sm:col-span-1 lg:col-span-2 lg:text-right">
            <h4 className="mb-6 text-xs font-medium uppercase tracking-widest text-white">
              Information
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-[#8cff2e]"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="transition-colors hover:text-[#8cff2e]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="transition-colors hover:text-[#8cff2e]"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="transition-colors hover:text-[#8cff2e]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="transition-colors hover:text-[#8cff2e]"
                >
                  Shop
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
