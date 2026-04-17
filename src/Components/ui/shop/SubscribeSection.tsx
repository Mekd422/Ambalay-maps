import React from "react";
import { Link } from "react-router-dom";

const SubscribeSection: React.FC = () => {
  return (
    <section className="bg-white py-24 px-6 flex flex-col items-center justify-center text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl lg:text-4xl font-bold text-black tracking-tight mb-6">
          Subscribe for New Product Alerts
        </h2>

        <p className="text-black text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">
          Be the first to know when we release new merchandise
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register">
          <button className="w-full sm:w-auto px-8 py-4 bg-[#8cff2e] hover:bg-[#8cff2e] text-white rounded-xl font-bold transition-all shadow-lg active:scale-95">
            Get Started
          </button>
          </Link>

          <Link to="/contact">
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#8cff2e] text-black border-2 border-[#8cff2e] rounded-xl font-bold transition-all shadow-lg active:scale-95">
              Contact Sales
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;