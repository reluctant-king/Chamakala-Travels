import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-brand-dark/70 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
        >
          Your Journey <span className="text-brand-gold italic">Starts Here</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl"
        >
          Discover the world with premium travel assistance, lowest fares, and unforgettable experiences.
        </motion.p>

        {/* Search Widget - Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl"
        >
          <div className="flex gap-4 mb-6 border-b border-white/20 pb-4">
            {['Flight', 'Train', 'Bus'].map((type, idx) => (
              <button 
                key={type}
                className={`px-6 py-2 rounded-full font-medium transition-all ${idx === 0 ? 'bg-brand-gold text-brand-dark' : 'text-white hover:bg-white/10'}`}
              >
                {type}
              </button>
            ))}
          </div>

          <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder="From" 
                className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder="To" 
                className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="date" 
                className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-gold transition-colors [color-scheme:dark]"
              />
            </div>
            <button 
              type="button"
              className="bg-brand-green hover:bg-emerald-400 text-white font-bold rounded-xl py-3 flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-brand-green/30"
            >
              <Search className="h-5 w-5" />
              Search Fares
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
