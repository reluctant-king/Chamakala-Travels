import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const InquiryForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    origin: '',
    destination: '',
    travelDate: '',
    returnDate: '',
    passengers: '',
    travelClass: 'economy',
    travelMode: 'flight',
    budget: '',
    remarks: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (step) => {
    if (step === 1) {
      return formData.fullName.trim() && formData.phone.trim();
    }
    return formData.origin.trim() && formData.destination.trim() && formData.travelDate.trim() && formData.passengers.trim();
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 2));
      setStatus('');
    } else {
      setStatus('Please complete all required fields before continuing.');
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setStatus('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateStep(currentStep)) {
      setStatus('Please complete all required fields before submitting.');
      return;
    }

    setStatus('Sending inquiry...');

    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phone,
          destination: formData.destination,
          travel_type: formData.travelMode === 'package' ? 'Package' : formData.travelMode.charAt(0).toUpperCase() + formData.travelMode.slice(1),
          passenger_count: Number(formData.passengers),
          budget: formData.budget,
          notes: formData.remarks,
        }),
      });

      if (response.ok) {
        setStatus('Inquiry received! Our team will contact you within 24 hours.');
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          origin: '',
          destination: '',
          travelDate: '',
          returnDate: '',
          passengers: '',
          travelClass: 'economy',
          travelMode: 'flight',
          budget: '',
          remarks: '',
        });
        setCurrentStep(1);
      } else {
        setStatus('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Could not send inquiry. Please check your connection and try again.');
    }
  };

  return (
    <section className="py-20 bg-[#081426]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 text-center mb-10">
          <span className="text-brand-gold font-semibold uppercase tracking-[0.24em]">Bespoke Planning</span>
          <h2 className="text-4xl font-bold text-white">Plan Your Dream Trip</h2>
          <p className="mx-auto max-w-2xl text-gray-400 leading-8">
            Tell us where you want to go, and our expert travel consultants will craft a personalised itinerary just for you — with the best fares, handpicked stays, and seamless transfers.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_70px_rgba(0,0,0,0.15)] backdrop-blur-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {currentStep === 1 ? (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-white/10 bg-[#071325] px-4 py-3 text-white outline-none transition focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-white/10 bg-[#071325] px-4 py-3 text-white outline-none transition focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-white/10 bg-[#071325] px-4 py-3 text-white outline-none transition focus:border-brand-gold"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full rounded-full bg-brand-gold px-6 py-4 text-base font-semibold text-brand-dark transition hover:bg-yellow-400"
                >
                  Next: Trip Details
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">From *</label>
                    <input
                      type="text"
                      name="origin"
                      value={formData.origin}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-white/10 bg-[#071325] px-4 py-3 text-white outline-none transition focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">To *</label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-white/10 bg-[#071325] px-4 py-3 text-white outline-none transition focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Travel Date *</label>
                    <input
                      type="date"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-white/10 bg-[#071325] px-4 py-3 text-white outline-none transition focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Return Date</label>
                    <input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-white/10 bg-[#071325] px-4 py-3 text-white outline-none transition focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Passengers *</label>
                    <select
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-white/10 bg-[#071325] px-4 py-3 text-white outline-none transition focus:border-brand-gold"
                    >
                      <option value="">Select</option>
                      <option value="1">1 Adult</option>
                      <option value="2">2 Adults</option>
                      <option value="3">3 Adults</option>
                      <option value="4">4 Adults</option>
                      <option value="family">Family (2A + 2C)</option>
                      <option value="group">Group (5+)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Travel Class</label>
                    <select
                      name="travelClass"
                      value={formData.travelClass}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-white/10 bg-[#071325] px-4 py-3 text-white outline-none transition focus:border-brand-gold"
                    >
                      <option value="economy">Economy</option>
                      <option value="business">Business</option>
                      <option value="first">First Class</option>
                      <option value="sleeper">Sleeper (Train)</option>
                      <option value="ac">AC (Train)</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Mode of Travel</label>
                    <select
                      name="travelMode"
                      value={formData.travelMode}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-white/10 bg-[#071325] px-4 py-3 text-white outline-none transition focus:border-brand-gold"
                    >
                      <option value="flight">✈ Flight</option>
                      <option value="train">🚂 Train</option>
                      <option value="bus">🚌 Bus</option>
                      <option value="package">📦 Full Package</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Budget (₹)</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-white/10 bg-[#071325] px-4 py-3 text-white outline-none transition focus:border-brand-gold"
                    >
                      <option value="">Any Budget</option>
                      <option value="under5k">Under ₹5,000</option>
                      <option value="5k-15k">₹5,000 – ₹15,000</option>
                      <option value="15k-30k">₹15,000 – ₹30,000</option>
                      <option value="30k-50k">₹30,000 – ₹50,000</option>
                      <option value="above50k">Above ₹50,000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Special Requests / Remarks</label>
                  <textarea
                    name="remarks"
                    rows="4"
                    value={formData.remarks}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-white/10 bg-[#071325] px-4 py-3 text-white outline-none transition focus:border-brand-gold resize-none"
                  />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button type="button" onClick={handleBack} className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-gray-200 transition hover:border-white/20">
                    ← Back
                  </button>
                  <button type="submit" className="rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-dark transition hover:bg-yellow-400">
                    <Send className="inline-block h-4 w-4" /> Submit Inquiry
                  </button>
                </div>
              </div>
            )}

            {status && (
              <div className={`rounded-3xl border px-4 py-3 text-center text-sm ${status.includes('received') ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-brand-gold/20 bg-brand-gold/10 text-brand-gold'}`}>
                {status}
              </div>
            )}

            <div className="flex items-center justify-center gap-3">
              <span className={`h-3 w-3 rounded-full ${currentStep === 1 ? 'bg-brand-gold' : 'bg-white/20'}`} />
              <span className={`h-3 w-3 rounded-full ${currentStep === 2 ? 'bg-brand-gold' : 'bg-white/20'}`} />
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default InquiryForm;
