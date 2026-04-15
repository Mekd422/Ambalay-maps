import videoIcon from "../../assets/icons/video-icon.svg"
import howItWorksImg1 from "../../assets/images/how-it-works-img1.png"
import howItWorksImg2 from "../../assets/images/how-it-works-img2.png"
import howItWorksImg3 from "../../assets/images/how-it-works-img3.png"
import { motion } from "framer-motion"

export default function HowItWorks() {
  const steps = [
    { img: howItWorksImg1, step: "Step 1", title: "Create your account ", desc: "Sign up and access the Ambalay Maps dashboard and API tools." },
    { img: howItWorksImg2, step: "Step 2", title: "Choose the service you need", desc: "Use geocoding, routing, places search, or static maps based on your workflow." },
    { img: howItWorksImg3, step: "Step 3", title: "Integrate and scale", desc: "Connect Ambalay Maps to your app or operations and start using location intelligence immediately." },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 }, 
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  } as const;

  return (
    <section id="about" className="px-6 md:px-12 py-24 bg-black overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-14">
          <motion.div 
            initial={{ opacity: 0, x: -80 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-3 text-[#8cff2e] mb-4"
          >
            <img src={videoIcon} alt="Video" className="h-8 w-8" style={{ filter: "invert(63%) sepia(86%) saturate(400%) hue-rotate(55deg)" }} />
            <span className="text-lg font-medium">Watch video</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, x: -80 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl md:text-4xl font-medium text-white leading-none inline-block origin-left tracking-[-0.05em] scale-x-70 scale-y-110"
          >
            How AmbaLay Maps works
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} 
          className="grid md:grid-cols-3 gap-10"
        >
          {steps.map((item) => (
            <motion.div 
              key={item.step}
              variants={cardVariants}
              className="rounded-[32px] bg-[#0A0A0A] border border-white/5 overflow-hidden transition-all hover:border-white/20 hover:translate-y-[-8px] duration-300 flex flex-col group"
            >
              <div className="relative bg-[#111] h-72 flex items-center justify-center overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              </div>

              <div className="p-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-black border border-[#8cff2e] px-4 py-1.5 text-xs text-[#8cff2e] uppercase tracking-widest mb-5 shadow-[0_0_12px_rgba(140,255,46,0.2)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8cff2e]" /> {item.step}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-base text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}