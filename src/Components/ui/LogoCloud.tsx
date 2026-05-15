import Image from 'next/image'

interface Partner {
  name: string
  logo: string
}

const partners: Partner[] = [
  { name: 'Zayride', logo: '/images/partners/zayride.png' },
  { name: 'Tilla', logo: '/images/partners/tilla.png' },
  { name: 'Tewos Technology', logo: '/images/partners/tewos.png' },
  { name: 'ChipChip', logo: '/images/partners/chip.png' },
  { name: 'HB', logo: '/images/partners/hb.png' },
  { name: 'Pizza Hut', logo: '/images/partners/pizza.png' },
  { name: 'Arifpay', logo: '/images/partners/arifpay.png' },
  { name: 'NVIDIA Inception', logo: '/images/partners/nvd.png' },
]

export default function LogoCloud() {
  return (
    <section className="border-y border-white/5 bg-black px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-500 opacity-80">
            Clients and Partners
          </h2>
          <div className="mx-auto mt-4 h-[1px] w-10 bg-[#8cff2e]/30" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group relative flex items-center justify-center transition-all duration-500"
            >
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[#8cff2e]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={144}
                height={36}
                className="relative z-10 h-7 w-auto object-contain opacity-40 brightness-0 invert filter transition-all duration-500 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0 md:h-8 lg:h-9"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
