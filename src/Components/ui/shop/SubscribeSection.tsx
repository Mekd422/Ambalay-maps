import React from 'react'
import { Link } from 'react-router-dom'

const SubscribeSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center bg-white px-6 py-24 text-center">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-black md:text-5xl lg:text-4xl">
          Subscribe for New Product Alerts
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg font-medium text-black md:text-xl">
          Be the first to know when we release new merchandise
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/register">
            <button className="w-full rounded-xl bg-[#8cff2e] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#8cff2e] active:scale-95 sm:w-auto">
              Get Started
            </button>
          </Link>

          <Link to="/contact">
            <button className="w-full rounded-xl border-2 border-[#8cff2e] bg-transparent px-8 py-4 font-bold text-black shadow-lg transition-all hover:bg-[#8cff2e] active:scale-95 sm:w-auto">
              Contact Sales
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SubscribeSection
