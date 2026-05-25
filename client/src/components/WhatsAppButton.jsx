import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/919495684965"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center rounded-full bg-[#25d366] p-4 text-white shadow-2xl shadow-[#25d366]/30 transition hover:bg-[#20b858]"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute right-full mr-4 hidden rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-brand-dark shadow-lg group-hover:inline-flex">
        Chat with us
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
