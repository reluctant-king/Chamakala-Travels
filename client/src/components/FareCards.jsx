import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plane, Train, Bus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

const typeConfig = {
  all: { label: 'All', color: 'bg-white/10 text-white border-white/10' },
  Flight: { label: 'Flights', color: 'bg-[#2b6cb0] text-white border-[#2b6cb0]' },
  Train: { label: 'Trains', color: 'bg-[#f97316] text-white border-[#f97316]' },
  Bus: { label: 'Buses', color: 'bg-[#10b981] text-white border-[#10b981]' },
};

const getIcon = (type) => {
  if (type === 'Train') return Train;
  if (type === 'Bus') return Bus;
  return Plane;
};

const FareCards = ({ limit }) => {
  const [fares, setFares] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFares = async () => {
      try {
        const res = await fetch(`${API_URL}/api/fares`);
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

  const filteredFares = useMemo(() => {
    if (filter === 'all') return fares;
    return fares.filter((fare) => fare.type === filter);
  }, [filter, fares]);

  return (
    <section id="fares" className="relative overflow-hidden bg-[#090f1d] py-20 text-white">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#e6c07b]/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#10b981]/10 blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-4 py-2 text-sm uppercase tracking-[0.28em] text-brand-gold">
              Live Fare Board
            </span>
            <h2 className="mt-6 text-4xl font-bold text-white">Latest promotional fares</h2>
            <p className="mt-4 text-gray-400">Browse our most popular routes and choose the perfect travel option for your itinerary.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {Object.keys(typeConfig).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${filter === key ? typeConfig[key].color : 'border-white/10 text-gray-300 hover:border-white/20 hover:text-white'}`}
              >
                {typeConfig[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-gray-300">Loading fares...</div>
          ) : filteredFares.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-gray-300">No fares available for this category.</div>
          ) : (
            filteredFares.map((fare, index) => {
              const Icon = getIcon(fare.type);
              return (
                <motion.div
                  key={fare._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-brand-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-300">{fare.type}</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm uppercase tracking-[0.24em] text-gray-400">{fare.provider}</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{fare.from_location} → {fare.to_location}</h3>
                  </div>
                  <div className="flex items-end justify-between gap-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-3xl font-bold text-brand-gold">₹{fare.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">per person</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-400">{new Date(fare.travel_date).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/fares" className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-dark transition hover:bg-yellow-400">
            View full fare board <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FareCards;
