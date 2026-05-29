import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroBanner from '../assets/hero2.png';

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a1520] via-[#0d1b2a] to-[#152336]">
      
      {/* Background Glow Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(230,192,123,0.18),_transparent_35%)] pointer-events-none" />
      <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#e6c07b]/20 blur-3xl" />
      <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-[#c9956b]/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#f0d49a]/10 blur-3xl" />

      {/* Background Logo Image - Large & Faded */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <img
          src={heroBanner}
          alt=""
          className="w-full h-auto object-contain mix-blend-screen opacity-60"
        />
      </motion.div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        
        {/* Content */}
        <div className="max-w-4xl text-center space-y-8">
          
          {/* Location Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm uppercase tracking-[0.24em] text-brand-gold backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
            Neendoor · Kottayam · Kerala
          </div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight drop-shadow-2xl">
              <span className="block">Your Journey</span>

              <span className="block italic bg-gradient-to-r from-[#f9f3eb] via-[#f0d49a] to-[#e6c07b] bg-clip-text text-transparent">
                Begins Here
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-200 sm:text-xl drop-shadow-lg">
              Bespoke travel experiences crafted with care — flights,
              trains, buses & custom tours from the heart of Kerala.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="/inquiry"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-gold px-8 py-4 text-sm font-semibold text-brand-dark transition hover:bg-yellow-400 shadow-lg"
            >
              Plan My Trip <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="/fares"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/10 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/20 backdrop-blur-sm"
            >
              View Live Fares
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            {[
              { value: '2000+', label: 'Happy Travellers' },
              { value: '50+', label: 'Destinations' },
              { value: '10+', label: 'Years of Trust' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-center backdrop-blur-md"
              >
                <p className="text-3xl font-bold text-brand-gold">
                  {stat.value}
                </p>

                <p className="mt-2 text-sm uppercase tracking-[0.14em] text-gray-300">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;