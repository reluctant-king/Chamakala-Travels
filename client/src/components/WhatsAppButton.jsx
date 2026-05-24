import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/919876543210" // Replace with real number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-colors group"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute right-full mr-4 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
        Talk to Chamakala Travels
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
