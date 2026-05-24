import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', destination: '', travel_type: 'Flight', passenger_count: 1, budget: '', notes: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const res = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('Inquiry submitted successfully! We will contact you soon.');
        setFormData({ name: '', phone: '', destination: '', travel_type: 'Flight', passenger_count: 1, budget: '', notes: '' });
      } else {
        setStatus('Failed to submit. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error submitting form.');
    }
  };

  return (
    <section className="py-20 bg-brand-blue relative">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-dark/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Plan Your <span className="text-brand-gold">Custom Trip</span></h2>
            <p className="text-gray-400">Tell us where you want to go, and our experts will craft the perfect itinerary for you.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Destination</label>
                <input type="text" name="destination" required value={formData.destination} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Travel Type</label>
                <select name="travel_type" value={formData.travel_type} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors [&>option]:bg-brand-dark">
                  <option value="Flight">Flight</option>
                  <option value="Train">Train</option>
                  <option value="Bus">Bus</option>
                  <option value="Package">Complete Package</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Number of Passengers</label>
                <input type="number" name="passenger_count" min="1" required value={formData.passenger_count} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Estimated Budget</label>
                <input type="text" name="budget" placeholder="e.g., ₹50,000" value={formData.budget} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Special Requirements / Notes</label>
              <textarea name="notes" rows="4" value={formData.notes} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none"></textarea>
            </div>

            {status && (
              <div className={`p-4 rounded-xl text-center font-medium ${status.includes('successfully') ? 'bg-green-500/20 text-green-400' : 'bg-brand-gold/20 text-brand-gold'}`}>
                {status}
              </div>
            )}

            <button type="submit" className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-dark font-bold text-lg rounded-xl py-4 flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-brand-gold/20">
              <Send className="h-5 w-5" />
              Submit Inquiry
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default InquiryForm;
