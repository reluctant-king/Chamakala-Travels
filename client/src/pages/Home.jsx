import Hero from '../components/Hero';
import FareCards from '../components/FareCards';
import DestinationCards from '../components/DestinationCards';
import InquiryForm from '../components/InquiryForm';

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <FareCards limit={4} />
      <DestinationCards />
      <InquiryForm />

      {/* Business Overview Section */}
      <section className="bg-slate-950 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-6">
            <p className="text-brand-gold font-semibold uppercase tracking-[0.24em]">Chamakkala Travels</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Personalized travel experiences from Neendoor, Kottayam</h2>
            <p className="text-gray-300 text-lg leading-8">
              Since 2019, Chamakkala Travels has delivered tailored itineraries for solo travelers, families, and groups across Kottayam and beyond. With a strong 4.7 rating from satisfied customers, our team specializes in seamless flight bookings, custom packages, and cultural journeys that turn every trip into an unforgettable experience.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">Why choose us?</h3>
                <p className="text-gray-400 mt-3">Expert planning, flexible budgets, and personalized service from the moment you inquire until your return.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">Open daily</h3>
                <p className="text-gray-400 mt-3">Monday to Saturday: 10:00 am — 8:00 pm. Sunday: Closed.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-brand-dark/80 p-8 shadow-2xl shadow-black/30">
            <h3 className="text-2xl font-bold text-white mb-4">Visit our Neendoor office</h3>
            <p className="text-gray-400 leading-7 mb-6">Located on Ettumanoor - Neendoor Road, our local team is ready to help you discover hidden gems, plan heritage tours, and book the best travel package for your needs.</p>
            <ul className="space-y-4 text-gray-300">
              <li><span className="font-semibold text-white">Address:</span> Ettumanoor - Neendoor Rd, Neendoor, Kerala 686601</li>
              <li><span className="font-semibold text-white">Phone:</span> 094956 84965</li>
              <li><span className="font-semibold text-white">Rating:</span> 4.7 stars from 15 reviews</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services & Review Section */}
      <section className="bg-slate-950 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start mb-12">
            <div>
              <p className="text-brand-gold font-semibold uppercase tracking-[0.24em]">Our services</p>
              <h2 className="text-4xl font-bold text-white mt-4">Travel planning, ticketing, and local exploration</h2>
              <p className="text-gray-300 text-lg leading-8 mt-4">
                Chamakkala Travels combines bespoke itinerary design with seamless booking support. From flight and railway ticketing to tailored cultural tours, our team ensures every journey is smooth, memorable, and aligned with your preferences.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-brand-dark/80 p-8 shadow-2xl shadow-black/30">
              <h3 className="text-2xl font-bold text-white mb-4">Customer review</h3>
              <p className="text-gray-400 leading-7 mb-6">
                “Chamakkala Travels is an excellent travel agent offering good deals on various services. Their efficient and friendly staff ensure a smooth experience.”
              </p>
              <div className="flex items-center gap-3 text-gray-300">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold text-brand-dark font-bold">A</span>
                <div>
                  <p className="font-semibold text-white">Amru</p>
                  <p className="text-sm text-gray-400">21 Dec 2024</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: 'Travel Agents',
                description: 'Personalized vacation planning, itinerary design, and full-service booking support.',
              },
              {
                title: 'Railway Ticketing Agents',
                description: 'Train ticket booking and schedule coordination across Kerala and beyond.',
              },
              {
                title: 'Air Ticketing Agents',
                description: 'Domestic flight reservations and fare optimization for every budget.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-gray-400 mt-3">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-brand-gold font-semibold uppercase tracking-[0.24em]">Frequently Asked Questions</p>
            <h2 className="text-4xl font-bold text-white mt-4">Everything you need to know about Chamakkala Travels</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold text-white">Do travel agents help in making flight reservations?</h3>
              <p className="text-gray-400 mt-3">Yes. Chamakkala Travels helps clients book flights based on budget, schedule, and preferred travel class, ensuring a smooth reservation experience.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold text-white">Do travel agents offer travel packages?</h3>
              <p className="text-gray-400 mt-3">Yes. We offer curated travel packages for a wide range of destinations, including personalized itineraries for cultural tours, leisure trips, and family vacations.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold text-white">Can travel agents help me stay within my budget?</h3>
              <p className="text-gray-400 mt-3">Yes. Our experts evaluate your budget and customize travel options so you can enjoy a well-planned trip without overspending.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold text-white">Does Chamakkala Travels create a trip itinerary?</h3>
              <p className="text-gray-400 mt-3">Yes. We prepare custom itineraries for your trip and manage reservations for transport, accommodation, and activities.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold text-white">What are Chamakkala Travels’ business hours?</h3>
              <p className="text-gray-400 mt-3">Our office is open Monday to Saturday from 10:00 am to 8:00 pm. We remain closed on Sundays to recharge and prepare for the week ahead.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold text-white">How effective are Chamakkala Travels’ services?</h3>
              <p className="text-gray-400 mt-3">Highly effective. Our 4.7 rating from 15 reviews reflects our commitment to quality, attention to detail, and customer satisfaction on every trip.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Map Section */}
      <section className="h-[400px] w-full bg-gray-900 relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.170781301921!2d76.504137675027!3d9.6800371904096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07d5eac39f6c9b%3A0x501e196773d8f87d!2sChamakkala%20Travels!5e1!3m2!1sen!2sin!4v1779259743019!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          title="Chamakala Travels Location"
        ></iframe>
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
            <h2 className="text-3xl font-bold text-white bg-brand-dark/80 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10 shadow-xl">
                Find Us Here
            </h2>
        </div>
      </section>
    </div>
  );
};

export default Home;
