import { motion } from 'framer-motion';

const destinations = [
  { id: 1, name: 'Dubai', price: 'From ₹15,000', duration: '4 Days / 3 Nights', image: 'https://images.unsplash.com/photo-1512453979436-5a5338d35fa6?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, name: 'Singapore', price: 'From ₹25,000', duration: '5 Days / 4 Nights', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1000&auto=format&fit=crop' },
  { id: 3, name: 'Goa', price: 'From ₹8,000', duration: '3 Days / 2 Nights', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e4f2?q=80&w=1000&auto=format&fit=crop' },
  { id: 4, name: 'Bali', price: 'From ₹35,000', duration: '6 Days / 5 Nights', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop' },
];

const DestinationCards = () => {
  return (
    <section className="py-20 bg-brand-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Popular <span className="text-brand-green">Destinations</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Explore our most booked packages and breathtaking locations tailored for your perfect getaway.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group rounded-3xl overflow-hidden cursor-pointer h-96"
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-1">{dest.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{dest.duration}</p>
                <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <span className="text-brand-gold font-semibold">{dest.price}</span>
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    Inquire
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationCards;
