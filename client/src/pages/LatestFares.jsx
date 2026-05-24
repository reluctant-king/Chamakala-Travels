import FareCards from '../components/FareCards';

const LatestFares = () => {
  return (
    <div className="pt-20 min-h-screen bg-brand-dark">
      <div className="bg-brand-blue py-12 text-center border-b border-white/10">
        <h1 className="text-4xl font-bold text-white mb-4">All <span className="text-brand-gold">Fares</span></h1>
        <p className="text-gray-300">Browse all available fares and find the best deals.</p>
      </div>
      <FareCards />
    </div>
  );
};

export default LatestFares;
