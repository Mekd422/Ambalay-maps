import React from "react";
import Image from "next/image";

interface ProductProps {
  image: string;
  category: string;
  title: string;
  price: string | number;
  sizes: string[];
}

interface RecentTemplatesProps {
  searchTerm?: string;
  onAddToCart?: (product: ProductProps) => void;
}

const ProductCard: React.FC<ProductProps & { onAddToCart?: (product: ProductProps) => void }> = ({ image, category, title, price, sizes, onAddToCart }) => {
  return (
    <div className="bg-white rounded-[28px] overflow-hidden flex flex-col h-full group transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <Image src={image} alt={title} width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
      </div>

      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">{category}</p>
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-black text-lg font-bold leading-tight">{title}</h3>
            <span className="shrink-0 bg-gray-100 px-2.5 py-1 rounded-full text-[11px] font-bold text-black border border-gray-200">
              {typeof price === 'number' ? `${price} birr` : price}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-50">
          {sizes.slice(0, 5).map((size, idx) => (
            <span key={idx} className="text-gray-400 text-[10px] font-bold uppercase">{size}</span>
          ))}
        </div>

        {onAddToCart && (
          <button
            onClick={() => onAddToCart({ image, category, title, price, sizes })}
            className="mt-4 w-full py-2 bg-[#8cff2e] text-black font-bold rounded-full hover:bg-[#6ecc1f] transition-colors"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

const RecentTemplates: React.FC<RecentTemplatesProps> = ({ searchTerm = "", onAddToCart }) => {
  const products: ProductProps[] = [
    { image: "/shop-s1-img1.jpg", category: "Clothing", title: "Pangaea T-Shirt", price: "350birr", sizes: ["S","M","L","XL","XXL"] },
    { image: "/shop-s1-img2.jpg", category: "Digital Asset", title: "Amba Cap", price: "Free", sizes: ["S","M","L","XL","XXL"] },
    { image: "/shop-s1-img3.jpg", category: "Agency", title: "Vinency", price: 1200, sizes:["S","M","L","XL","XXL"] },
    { image: "/shop-s2-img1.jpg", category: "Clothing", title: "World Explorer Notebook", price: "Free", sizes: ["S","M","L","XL","XXL"] },
    { image: "/shop-s2-img2.webp", category: "Accessories", title: "Topographic Contour Hoodie", price: 250, sizes: ["S","M","L","XL","XXL"] },
    { image: "/shop-s2-img3.webp", category: "Digital Asset", title: "Map Marker Sticker Pack", price: 800, sizes: ["S","M","L","XL","XXL"] },
    { image: "/shop-s1-img1.jpg", category: "Clothing", title: "Pangaea T-Shirt", price: "350birr", sizes: ["S","M","L","XL","XXL"] },
    { image: "/shop-s1-img2.jpg", category: "Digital Asset", title: "Amba Cap", price: "Free", sizes: ["S","M","L","XL","XXL"] }
  ];

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
    || p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-black py-16 px-6">
      <div className="max-w-7xl mx-auto"> 
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
            Recent Templates
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={idx} {...product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentTemplates;
