const Contact = () => {
  return (
    <div className="pt-20 min-h-screen bg-brand-dark text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#081426] p-10 shadow-xl shadow-black/20">
            <p className="text-brand-gold uppercase tracking-[0.28em] text-sm font-semibold">Get in touch</p>
            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">Let’s plan your next trip together.</h1>
            <p className="mt-6 text-gray-300 leading-8">
              Reach out by phone, WhatsApp, or visit our office in Pravattom. We’re ready to assist with ticket bookings, package planning, visa support and custom itineraries.
            </p>
            <div className="mt-10 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">Office</p>
                <p className="mt-3 text-gray-300">Pravattom Junction <br />
Neendoor P. O<br />
Kottayam, Kerala<br />
India - 686601</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">Phone</p>
                <p className="mt-3 text-gray-300">+91 94956 84965</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">WhatsApp</p>
                <p className="mt-3 text-gray-300">Message us for instant support and booking help.</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-[#061022] shadow-xl shadow-black/20 p-8">
            <div className="h-full rounded-[1.75rem] overflow-hidden bg-gradient-to-br from-[#101b31] to-[#0a1420] p-6">
              <p className="text-brand-gold uppercase tracking-[0.24em] text-sm font-semibold">Office hours</p>
              <div className="mt-8 space-y-4 text-gray-300">
                <div>
                  <p className="font-semibold text-white">Monday – Saturday</p>
                  <p className="mt-1">9:30 AM – 8:00 PM</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Sunday</p>
                  <p className="mt-1">10:00 AM – 2:00 PM</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">Email</p>
                  <p className="mt-3 text-gray-300">chamakkalatravels@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
