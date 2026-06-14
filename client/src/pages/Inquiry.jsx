import { Seo } from '../components/Seo';
import InquiryForm from '../components/InquiryForm';

const Inquiry = () => {
  return (
    <>
      <Seo title="Plan Your Trip – Free Travel Inquiry" description="Tell us your travel plans and our Kottayam-based experts will craft a personalised itinerary with the best fares. Free trip inquiry for flights, trains, buses & packages." path="/inquiry" />
      <div className="pt-20 min-h-screen bg-brand-dark">
        <InquiryForm />
      </div>
    </>
  );
};

export default Inquiry;
