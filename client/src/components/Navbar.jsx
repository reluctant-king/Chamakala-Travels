import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Plane } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Live Fares', to: '/fares' },
  { name: 'Destinations', to: '/destinations' },
  { name: 'Plan a Trip', to: '/inquiry' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const renderLink = (link, onClick) => (
    <Link
      key={link.name}
      to={link.to}
      onClick={onClick}
      className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full text-sm font-medium transition-all"
    >
      {link.name}
    </Link>
  );

  return (
    <nav className="fixed w-full z-50 bg-brand-blue/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <Plane className="h-8 w-8 text-brand-gold" />
            <Link to="/" className="text-2xl font-bold text-white tracking-wide">
              Chamakkala <span className="text-brand-gold">Travels</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => renderLink(link))}
            <Link
              to="/admin"
              className="ml-4 rounded-full bg-brand-gold px-6 py-2 text-sm font-semibold text-brand-dark shadow-lg shadow-brand-gold/20 transition hover:bg-yellow-400"
            >
              Admin Login
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-full bg-white/5 p-2 text-gray-300 hover:text-white hover:bg-white/10 transition"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="md:hidden bg-brand-blue/95 border-t border-white/10"
          >
            <div className="space-y-1 px-4 pb-6 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block rounded-full bg-brand-gold px-6 py-3 text-center text-brand-dark font-semibold transition hover:bg-yellow-400"
              >
                Admin Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
