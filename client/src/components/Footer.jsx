import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-wide">
              Chamakkala <span className="text-brand-gold">Travels</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner in exploring the world. We offer customized travel packages, best flight fares, and seamless booking experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Latest Fares', 'Destinations', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-brand-gold text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="h-5 w-5 text-brand-gold flex-shrink-0" />
                <span>Ettumanoor - Neendoor Rd, Neendoor, Kerala 686601</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="h-5 w-5 text-brand-gold flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="h-5 w-5 text-brand-gold flex-shrink-0" />
                <span>chamakkalatravels@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-white/5 p-2 rounded-full hover:bg-brand-gold hover:text-brand-dark transition-all text-gray-400 flex items-center justify-center gap-2 px-4">
                <Globe className="h-5 w-5" /> <span>Visit our Portal</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Chamakala Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
