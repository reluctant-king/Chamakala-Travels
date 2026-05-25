import React from 'react';

/**
 * Simple modal with backdrop and slide‑in animation.
 * Props:
 * - open: boolean – whether the modal is visible
 * - onClose: () => void – called when backdrop or close button is clicked
 * - children: ReactNode – modal content
 */
export const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl shadow-lg max-w-lg w-full mx-4 p-6 relative animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

// Tailwind animation (add to index.css or global styles)
// .animate-slide-up { animation: slide-up 0.2s ease-out; }
// @keyframes slide-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
