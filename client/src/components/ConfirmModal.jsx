import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ open, onClose, onConfirm, title, message, confirmText, cancelText, variant }) => {
  if (!open) return null;
  const isDanger = variant === 'danger';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl shadow-lg max-w-md w-full mx-4 p-6 relative border border-white/10 animate-slide-up">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition">
          <X className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center text-center gap-3">
          {isDanger && <AlertTriangle className="h-10 w-10 text-red-400" />}
          <h3 className="text-lg font-bold text-white">{title || 'Confirm'}</h3>
          <p className="text-sm text-gray-400">{message || 'Are you sure?'}</p>
          <div className="flex gap-3 mt-2">
            <button onClick={onClose} className="px-5 py-2 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 transition text-sm">
              {cancelText || 'Cancel'}
            </button>
            <button onClick={onConfirm} className={`px-5 py-2 rounded-lg text-white text-sm font-semibold transition ${isDanger ? 'bg-red-500 hover:bg-red-600' : 'bg-brand-gold text-brand-dark hover:bg-yellow-500'}`}>
              {confirmText || 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
