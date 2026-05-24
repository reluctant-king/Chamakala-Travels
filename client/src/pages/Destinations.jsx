import DestinationCards from '../components/DestinationCards';

const Destinations = () => {
  return (
    <div className="pt-20 min-h-screen bg-brand-dark">
      <div className="bg-brand-blue py-12 text-center border-b border-white/10">
        <h1 className="text-4xl font-bold text-white mb-4">Our <span className="text-brand-green">Destinations</span></h1>
        <p className="text-gray-300">Discover handpicked destinations around the globe.</p>
      </div>
      <DestinationCards />
    </div>
  );
};

export default Destinations;
