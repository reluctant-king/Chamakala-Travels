import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Train, Bus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const getIcon = (type) => {
  if (type === 'Train') return Train;
  if (type === 'Bus') return Bus;
  return Plane;
};

const getColor = (type) => {
  if (type === 'Train') return 'text-orange-400';
  if (type === 'Bus') return 'text-brand-green';
  return 'text-blue-400';
};

const FareCards = ({ limit }) => {
  const [fares, setFares] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFares = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/fares');
        const data = await res.json();
        setFares(limit ? data.slice(0, limit) : data);
      } catch (err) {
        console.error('Error fetching fares:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFares();
  }, [limit]);
  return (
    <section className="py-20 bg-brand-dark relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Latest <span className="text-brand-gold">Live Fares</span></h2>
            <p className="text-gray-400">Grab the best deals on trending routes.</p>
          </div>
          <Link to="/fares" className="hidden md:flex items-center gap-2 text-brand-gold hover:text-yellow-400 transition-colors font-medium">
            View All Fares <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading fares...</div>
        ) : fares.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No fares available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fares.map((fare, index) => {
              const Icon = getIcon(fare.type);
              return (
                <motion.div
                  key={fare._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group hover:-translate-y-2"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl bg-white/5 ${getColor(fare.type)}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-gray-300">
                      {new Date(fare.travel_date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-1">{fare.type} • {fare.provider}</p>
                  <h3 className="text-lg font-semibold text-white mb-4">{fare.from_location} → {fare.to_location}</h3>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <p className="text-2xl font-bold text-brand-gold">₹{fare.price}</p>
                    <button className="text-white opacity-0 group-hover:opacity-100 transition-opacity bg-brand-blue p-2 rounded-full">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
        
        <div className="mt-8 text-center md:hidden">
            <Link to="/fares" className="inline-flex items-center gap-2 text-brand-gold hover:text-yellow-400 transition-colors font-medium">
              View All Fares <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
      </div>
    </section>
  );
};

export default FareCards;
