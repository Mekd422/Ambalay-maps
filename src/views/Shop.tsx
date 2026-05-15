import { useEffect, useState } from 'react'
import Image from 'next/image'
import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'
import RecentTemplates from '../Components/ui/shop/RecentTemplates'
import SubscribeSection from '../Components/ui/shop/SubscribeSection'
import { Search, ShoppingCart } from 'lucide-react'

interface Product {
  image: string
  category: string
  title: string
  price: string | number
  sizes: string[]
}

const row1Images = [
  '/shop-s1-img1.jpg',
  '/shop-s1-img2.jpg',
  '/shop-s1-img3.jpg',
  '/shop-s1-img4.jpg',
  '/shop-s1-img5.jpg',
  '/shop-s1-img6.jpg',
]
const row2Images = [
  '/shop-s1-img7.jpg',
  '/shop-s1-img8.jpg',
  '/shop-s1-img9.jpg',
]

export default function Shop() {
  const [cart, setCart] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product])
  }

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-white font-sora transition-colors duration-300 selection:bg-[#8cff2e] selection:text-black dark:bg-black">
      <Navbar />

      <main className="pt-20">
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black px-6 pb-8 pt-24 text-center">
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#8cff2e]/10 via-transparent to-transparent blur-3xl" />

          <div className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-center gap-4">
            <div className="group relative w-[300px] md:w-[400px]">
              <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                <Search className="h-4 w-4 text-gray-500 transition-colors group-focus-within:text-black" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border-none bg-white py-3 pl-10 pr-6 text-base font-medium text-black shadow-xl transition-all placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#8cff2e]/40"
              />
            </div>

            <div className="relative">
              <button
                className="relative rounded-full bg-white p-2 transition hover:bg-gray-100"
                onClick={() => setCartOpen((prev) => !prev)}
              >
                <ShoppingCart className="h-6 w-6 text-black" />
                {cart.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#8cff2e] text-[10px] font-bold text-black">
                    {cart.length}
                  </span>
                )}
              </button>

              {cartOpen && (
                <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  {cart.length === 0 ? (
                    <p className="text-sm text-black dark:text-white">
                      Your cart is empty.
                    </p>
                  ) : (
                    <ul className="max-h-64 space-y-2 overflow-auto">
                      {cart.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-between text-sm text-black dark:text-white"
                        >
                          <span>{item.title}</span>
                          <button
                            className="text-xs text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveFromCart(idx)}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-4xl">
            Ambalay Maps Store makes navigation and{' '}
            <br className="hidden md:block" />
            location insights{' '}
            <span className="text-[#8cff2e]">simple and powerful.</span>
          </h1>
        </section>

        <section className="overflow-hidden bg-black py-10">
          <ScrollingRow images={row1Images} direction="left" />
          <ScrollingRow images={row2Images} direction="right" />
        </section>

        <RecentTemplates
          searchTerm={searchTerm}
          onAddToCart={handleAddToCart}
        />

        <SubscribeSection />

        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-left { animation: scroll-left 15s linear infinite; }
          .animate-scroll-right { animation: scroll-right 15s linear infinite; }
          .animate-scroll-left:hover, .animate-scroll-right:hover { animation-play-state: paused; }
        `,
          }}
        />
      </main>

      <Footer />
    </div>
  )
}

const ScrollingRow: React.FC<{
  images: string[]
  direction: 'left' | 'right'
}> = ({ images, direction }) => {
  const scrollClass =
    direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'

  return (
    <div className="flex select-none gap-6 overflow-hidden py-4">
      <div className={`flex min-w-full flex-nowrap gap-6 ${scrollClass}`}>
        {[...images, ...images].map((src, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] w-[250px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-[#8cff2e]/50 md:w-[350px]"
          >
            <Image
              src={src}
              alt="Product"
              fill
              sizes="(min-width: 768px) 350px, 250px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
