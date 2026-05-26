import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark border-t border-white/10 pt-16 pb-8 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr] mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-wide">
              Chamakkala <span className="text-brand-gold">Travels</span>
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted travel partner in Kerala, offering custom tour planning, railway and flight bookings, and personalized support for every journey.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Home', href: '/#hero' },
                { label: 'Live Fares', href: '/#fares' },
                { label: 'Destinations', href: '/#destinations' },
                { label: 'Plan a Trip', href: '/#inquiry' },
                { label: 'Contact', href: '/#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-brand-gold transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-sm">
              {['Flight Booking', 'Train Tickets', 'Bus Booking', 'Holiday Packages', 'Visa Assistance'].map((service) => (
                <li key={service} className="hover:text-brand-gold transition-colors">{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-gold" />
                <div>
                  <span className="block font-medium text-white">Address</span>
                  <span>Neendoor, Kottayam, Kerala 686601</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-brand-gold" />
                <div>
                  <span className="block font-medium text-white">Phone</span>
                  <a href="tel:+919495684965" className="hover:text-brand-gold transition-colors">+91 94956 84965</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-brand-gold" />
                <div>
                  <span className="block font-medium text-white">Email</span>
                  <a href="mailto:chamakkalatravels@gmail.com" className="hover:text-brand-gold transition-colors">chamakkalatravels@gmail.com</a>
                </div>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://wa.me/919495684965" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-gray-200 hover:bg-brand-gold hover:text-brand-dark transition">
                <Globe className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Chamakkala Travels. All rights reserved. | Neendoor, Kottayam, Kerala</p>
          <p className="text-gray-400 mt-2">Licensed Travel Agency · ISC License</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
