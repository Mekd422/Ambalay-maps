import React from 'react'
import Image from 'next/image'

interface ProductProps {
  image: string
  category: string
  title: string
  price: string | number
  sizes: string[]
}

interface RecentTemplatesProps {
  searchTerm?: string
  onAddToCart?: (product: ProductProps) => void
}

const ProductCard: React.FC<
  ProductProps & { onAddToCart?: (product: ProductProps) => void }
> = ({ image, category, title, price, sizes, onAddToCart }) => {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-grow flex-col justify-between p-5">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {category}
          </p>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold leading-tight text-black">
              {title}
            </h3>
            <span className="shrink-0 rounded-full border border-gray-200 bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-black">
              {typeof price === 'number' ? `${price} birr` : price}
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-3 border-t border-gray-50 pt-4">
          {sizes.slice(0, 5).map((size, idx) => (
            <span
              key={idx}
              className="text-[10px] font-bold uppercase text-gray-400"
            >
              {size}
            </span>
          ))}
        </div>

        {onAddToCart && (
          <button
            onClick={() =>
              onAddToCart({ image, category, title, price, sizes })
            }
            className="mt-4 w-full rounded-full bg-[#8cff2e] py-2 font-bold text-black transition-colors hover:bg-[#6ecc1f]"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}

const RecentTemplates: React.FC<RecentTemplatesProps> = ({
  searchTerm = '',
  onAddToCart,
}) => {
  const products: ProductProps[] = [
    {
      image: '/shop-s1-img1.jpg',
      category: 'Clothing',
      title: 'Pangaea T-Shirt',
      price: '350birr',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      image: '/shop-s1-img2.jpg',
      category: 'Digital Asset',
      title: 'Amba Cap',
      price: 'Free',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      image: '/shop-s1-img3.jpg',
      category: 'Agency',
      title: 'Vinency',
      price: 1200,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      image: '/shop-s2-img1.jpg',
      category: 'Clothing',
      title: 'World Explorer Notebook',
      price: 'Free',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      image: '/shop-s2-img2.webp',
      category: 'Accessories',
      title: 'Topographic Contour Hoodie',
      price: 250,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      image: '/shop-s2-img3.webp',
      category: 'Digital Asset',
      title: 'Map Marker Sticker Pack',
      price: 800,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      image: '/shop-s1-img1.jpg',
      category: 'Clothing',
      title: 'Pangaea T-Shirt',
      price: '350birr',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      image: '/shop-s1-img2.jpg',
      category: 'Digital Asset',
      title: 'Amba Cap',
      price: 'Free',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
  ]

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <section className="bg-black px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Recent Templates
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={idx} {...product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentTemplates
