import { motion } from 'framer-motion';

const destinations = [
  {
    id: 1,
    name: 'Dubai',
    country: 'UAE',
    price: 'From ₹8,499',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    featured: true,
  },
  {
    id: 2,
    name: 'Singapore',
    country: 'Singapore',
    price: 'From ₹12,999',
    img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80',
  },
  {
    id: 3,
    name: 'Goa',
    country: 'India',
    price: 'From ₹2,499',
    img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80',
  },
  {
    id: 4,
    name: 'Munnar',
    country: 'Kerala, India',
    price: 'From ₹1,299',
    img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
  },
  {
    id: 5,
    name: 'Riyadh',
    country: 'Saudi Arabia',
    price: 'From ₹9,750',
    img: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=600&q=80',
  },
];

const DestinationCards = () => {
  return (
    <section className="py-16">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative overflow-hidden rounded-[2rem] bg-cover bg-center"
          style={{ backgroundImage: `url('${destinations[0].img}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 p-10 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-brand-gold">{destinations[0].country}</p>
            <h3 className="mt-3 text-4xl font-semibold">{destinations[0].name}</h3>
            <p className="mt-3 text-sm text-gray-200">{destinations[0].price}</p>
          </div>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {destinations.slice(1).map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[2rem] h-80 bg-cover bg-center"
              style={{ backgroundImage: `url('${dest.img}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-gold">{dest.country}</p>
                <h3 className="mt-3 text-2xl font-semibold">{dest.name}</h3>
                <p onClick={() => window.location.href = "/inquiry"} className="mt-2 text-sm text-gray-200 opacity-0 transition group-hover:opacity-100">{dest.price} · Book Now →</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationCards;
