import { useEffect, useState } from "react";
import Navbar from "../Components/layout/Navbar";
import Footer from "../Components/layout/Footer";
import RecentTemplates from "../Components/ui/shop/RecentTemplates";
import SubscribeSection from "../Components/ui/shop/SubscribeSection";
import { Search, ShoppingCart } from "lucide-react";

interface Product {
  image: string;
  category: string;
  title: string;
  price: string | number;
  sizes: string[];
}

const row1Images = [
  "/shop-s1-img1.jpg", "/shop-s1-img2.jpg", "/shop-s1-img3.jpg",
  "/shop-s1-img4.jpg", "/shop-s1-img5.jpg", "/shop-s1-img6.jpg"
];
const row2Images = ["/shop-s1-img7.jpg", "/shop-s1-img8.jpg", "/shop-s1-img9.jpg"];

export default function Shop() {
  const [cart, setCart] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen font-sora selection:bg-[#8cff2e] selection:text-black transition-colors duration-300">
      <Navbar />

      <main className="pt-20">
        <section className="relative w-full pt-24 pb-8 px-6 flex flex-col items-center justify-center text-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
               style={{ backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#8cff2e]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-center gap-4">
  <div className="relative group w-[300px] md:w-[400px]">
    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
      <Search className="h-4 w-4 text-gray-500 group-focus-within:text-black transition-colors" />
    </div>
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      className="w-full py-3 pl-10 pr-6 bg-white text-black rounded-full text-base font-medium placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#8cff2e]/40 transition-all border-none shadow-xl"
    />
  </div>

  <div className="relative">
    <button
      className="relative p-2 rounded-full bg-white hover:bg-gray-100 transition"
      onClick={() => setCartOpen(prev => !prev)}
    >
      <ShoppingCart className="w-6 h-6 text-black" />
      {cart.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#8cff2e] text-black w-4 h-4 flex items-center justify-center text-[10px] font-bold rounded-full">
          {cart.length}
        </span>
      )}
    </button>

    {cartOpen && (
      <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-3">
        {cart.length === 0 ? (
          <p className="text-black dark:text-white text-sm">Your cart is empty.</p>
        ) : (
          <ul className="space-y-2 max-h-64 overflow-auto">
            {cart.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center text-sm text-black dark:text-white">
                <span>{item.title}</span>
                <button
                  className="text-red-500 hover:text-red-700 text-xs"
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

          <h1 className="text-4xl md:text-4xl font-bold text-white leading-[1.1] tracking-tight mt-6">
            Ambalay Maps Store makes navigation and <br className="hidden md:block" />
            location insights <span className="text-[#8cff2e]">simple and powerful.</span>
          </h1>
        </section>

        <section className="bg-black py-10 overflow-hidden">
          <ScrollingRow images={row1Images} direction="left" />
          <ScrollingRow images={row2Images} direction="right" />
        </section>

        <RecentTemplates searchTerm={searchTerm} onAddToCart={handleAddToCart} />

        <SubscribeSection />

        <style dangerouslySetInnerHTML={{ __html: `
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
        `}} />
      </main>

      <Footer />
    </div>
  );
}

const ScrollingRow: React.FC<{ images: string[], direction: 'left' | 'right' }> = ({ images, direction }) => {
  const scrollClass = direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right';

  return (
    <div className="flex overflow-hidden select-none gap-6 py-4">
      <div className={`flex flex-nowrap gap-6 min-w-full ${scrollClass}`}>
        {[...images, ...images].map((src, index) => (
          <div key={index} className="flex-shrink-0 w-[250px] md:w-[350px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 hover:border-[#8cff2e]/50 transition-colors">
            <img src={src} alt="Product" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};