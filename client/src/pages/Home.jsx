import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import FareCards from '../components/FareCards';
import DestinationCards from '../components/DestinationCards';
import InquiryForm from '../components/InquiryForm';

const TICKER_DATA = [
  { route: 'Kochi → Dubai', price: '₹8,499', icon: '✈️' },
  { route: 'Kochi → Singapore', price: '₹12,999', icon: '✈️' },
  { route: 'Kottayam → Mumbai', price: '₹1,250', icon: '🚂' },
  { route: 'Trivandrum → Riyadh', price: '₹9,750', icon: '✈️' },
  { route: 'Kottayam → Bangalore', price: '₹650', icon: '🚌' },
  { route: 'Kochi → Abu Dhabi', price: '₹7,899', icon: '✈️' },
  { route: 'Ernakulam → Delhi', price: '₹2,100', icon: '🚂' },
  { route: 'Kochi → Muscat', price: '₹6,499', icon: '✈️' },
  { route: 'Kottayam → Chennai', price: '₹850', icon: '🚌' },
];

const whyCards = [
  {
    title: 'Local Expertise',
    description: 'Kottayam-based travel specialists with deep Kerala and Gulf market knowledge.',
  },
  {
    title: 'Trusted & Secure',
    description: 'A licensed travel agency with a decade of trusted service for families and groups.',
  },
  {
    title: '24/7 Support',
    description: 'Always available via WhatsApp and phone before, during and after your journey.',
  },
  {
    title: 'Best Price Promise',
    description: 'We compare fares across airlines, trains and buses to deliver the best value.',
  },
];

const testimonials = [
  {
    quote: 'Chamakkala Travels arranged our entire Dubai family trip — flights, hotel, visa. Everything was perfect. Highly recommended!',
    author: 'Rajan Mathew',
    location: 'Neendoor, Kottayam',
    initials: 'RM',
  },
  {
    quote: 'Got the best train fare for our Varanasi pilgrimage. The team was so helpful and responsive on WhatsApp throughout the journey.',
    author: 'Suja Antony',
    location: 'Ettumanoor, Kottayam',
    initials: 'SA',
  },
  {
    quote: 'Booked our Goa honeymoon package through them. The itinerary was beautifully planned and the price was unbeatable. Thank you!',
    author: 'Priya & Jijo',
    location: 'Changanacherry',
    initials: 'PJ',
  },
  {
    quote: 'Very professional service. They handled our group booking of 12 people to Singapore without any hassle. Will use again!',
    author: 'Thomas Kurian',
    location: 'Pala, Kottayam',
    initials: 'TK',
  },
];

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        window.requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }
  }, [location.hash]);

  return (
    <div className="w-full bg-brand-dark text-white">
      <section id="hero" className="scroll-mt-24">
        <Hero />
      </section>

      <section id="fares" className="scroll-mt-24 bg-slate-950 border-t border-white/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-[#0a1520] px-4 py-3 text-sm uppercase tracking-[0.24em] text-brand-gold shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
            <span className="inline-flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
              Live Fares
            </span>
            <span className="text-gray-400">Promotional routes from Kottayam, Kochi, and Trivandrum.</span>
          </div>
        </div>
      </section>

      <section className="bg-[#081426] py-8 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="ticker-scroll absolute inset-0" />
          <div className="relative flex min-h-[70px] items-center gap-6 overflow-hidden text-sm text-gray-300">
            {TICKER_DATA.concat(TICKER_DATA).map((item, index) => (
              <div key={`${item.route}-${index}`} className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-3">
                <span>{item.icon}</span>
                <span className="font-semibold text-white">{item.route}</span>
                <span className="text-brand-gold">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FareCards limit={6} />

      <section id="destinations" className="scroll-mt-24 bg-[#0b162c] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-gold font-semibold uppercase tracking-[0.24em]">Explore</p>
            <h2 className="mt-4 text-4xl font-bold text-white">Popular Destinations</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">From the misty hills of Munnar to the golden shores of Goa — we take you there.</p>
          </div>
          <DestinationCards />
        </div>
      </section>

      <section id="inquiry" className="scroll-mt-24">
        <InquiryForm />
      </section>

      <section id="about" className="scroll-mt-24 bg-[#081426] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-gold font-semibold uppercase tracking-[0.24em]">Why Chamakkala</p>
            <h2 className="text-4xl font-bold text-white">Travel with Confidence</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {whyCards.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-white/20 hover:bg-white/10">
                <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-7">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b162c] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-gold font-semibold uppercase tracking-[0.24em]">Traveller Stories</p>
            <h2 className="text-4xl font-bold text-white">What Our Customers Say</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {testimonials.map((item) => (
              <div key={item.author} className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <div className="text-brand-gold mb-4">★★★★★</div>
                <p className="text-gray-300 leading-7 mb-6">{item.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-brand-dark font-semibold">{item.initials}</div>
                  <div>
                    <p className="font-semibold text-white">{item.author}</p>
                    <p className="text-sm text-gray-400">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-[#030914] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] items-start">
            <div>
              <p className="text-brand-gold font-semibold uppercase tracking-[0.24em]">Find Us</p>
              <h2 className="mt-4 text-4xl font-bold text-white">Visit Our Office</h2>
              <p className="mt-4 text-gray-400 leading-8 text-lg">We’re located on the Ettumanoor – Neendoor Road, easily accessible from Kottayam town. Visit us for help booking flights, trains, buses, or customized trip planning.</p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-brand-gold mb-3">Address</p>
                  <p className="text-gray-300">Ettumanoor – Neendoor Road,<br />Neendoor, Kottayam, Kerala – 686 612</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-brand-gold mb-3">Contact</p>
                  <p className="text-gray-300">+91 94956 84965</p>
                  <p className="text-gray-400 mt-3">Mon – Sat: 9:00 AM – 7:00 PM<br />Sunday: 10:00 AM – 2:00 PM</p>
                </div>
              </div>

              <a href="https://wa.me/919495684965" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#25d366] px-6 py-4 text-brand-dark font-semibold shadow-2xl shadow-[#25d366]/25 transition hover:bg-[#20b858]">
                <span>Chat on WhatsApp</span>
                <span className="text-white text-lg">→</span>
              </a>
            </div>

            <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-[#061022] shadow-2xl shadow-black/25">
              <div className="relative h-[420px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.5!2d76.5!3d9.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMzYnMDAuMCJOIDc2wrAzMCcwMC4wIkU!5e0!3m2!1sen!2sin!4v1234567890"
                  title="Chamakkala Travels Office Location"
                  className="absolute inset-0 w-full h-full border-0 filter grayscale contrast-125 transition duration-500 hover:grayscale-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#030914]/95 via-transparent to-transparent">
                  <div className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-sm text-gray-300 uppercase tracking-[0.2em]">Chamakkala Travels</p>
                      <p className="text-sm text-brand-gold">Click to explore</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
