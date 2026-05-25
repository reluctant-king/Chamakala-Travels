const About = () => {
  return (
    <div className="pt-20 min-h-screen bg-brand-dark text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="rounded-[2rem] border border-white/10 bg-[#081426] p-10 shadow-xl shadow-black/20">
          <div className="max-w-3xl">
            <p className="text-brand-gold uppercase tracking-[0.28em] text-sm font-semibold">Our Story</p>
            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">Trusted travel services from Kottayam to the world.</h1>
            <p className="mt-6 text-gray-300 leading-8">
              Chamakkala Travels has been helping families, groups, and business travellers book flights, trains, buses, and curated packages for over a decade. Based in Kottayam, our local team combines deep regional knowledge with global ticketing expertise.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold text-white">What we do</h2>
                <p className="mt-4 text-gray-400 leading-7">
                  We book the best fares, create customised itineraries, handle visa support, and provide 24/7 travel assistance from booking to return.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold text-white">Why choose us</h2>
                <p className="mt-4 text-gray-400 leading-7">
                  With a strong focus on service, reliability and value, our customers trust us for hassle-free travel planning across India, Gulf and worldwide destinations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
