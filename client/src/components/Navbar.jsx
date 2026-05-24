import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Plane } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Latest Fares', path: '/fares' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Inquiry', path: '/inquiry' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-brand-blue/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <Plane className="h-8 w-8 text-brand-gold" />
              <span className="text-2xl font-bold text-white tracking-wide">
                Chamakala <span className="text-brand-gold">Travels</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/inquiry"
                className="bg-brand-gold hover:bg-yellow-500 text-brand-dark px-6 py-2 rounded-full font-semibold transition-all shadow-lg hover:shadow-brand-gold/20"
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-brand-blue/95 backdrop-blur-lg border-b border-white/10 absolute w-full"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/inquiry"
                onClick={() => setIsOpen(false)}
                className="block text-center mt-4 bg-brand-gold hover:bg-yellow-500 text-brand-dark px-6 py-2 rounded-full font-semibold"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
