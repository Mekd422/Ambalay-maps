interface Partner {
  name: string;
  logo: string;
}

const partners: Partner[] = [
  { name: "Zayride", logo: "../../assets/images/zayride.png" },
  { name: "Tilla", logo: "../../assets/images/Tilla.png" },
  { name: "Tewos Technology", logo: "../../assets/images/tewos.png" },
  { name: "ChipChip", logo: "../../assets/images/chip.png" },
  { name: "HB", logo: "../../assets/images/hb.png" },
  { name: "Pizza Hut", logo: "../../assets/images/pizza.png" },
  { name: "Bekyab", logo: "../../assets/images/bekyab.png" },
  { name: "Arifpay", logo: "../../assets/images/arifpay.png" },
  { name: "NVIDIA Inception", logo: "../../assets/images/nvd.png" },
];

export default function LogoCloud() {
  return (
    <section className="bg-black py-20 px-6 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.5em] opacity-80">
            Clients and Partners
          </h2>
          <div className="w-10 h-[1px] bg-[#8cff2e]/30 mx-auto mt-4" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="group relative flex items-center justify-center transition-all duration-500"
            >
              <div className="absolute inset-0 bg-[#8cff2e]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-7 md:h-8 lg:h-9 w-auto object-contain filter brightness-0 invert opacity-40 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0 transition-all duration-500 relative z-10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}