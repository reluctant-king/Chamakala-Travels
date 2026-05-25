import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String, enum: ['Flight', 'Train', 'Bus', 'Tour Package', 'Hotel'], required: true },
  from_location: { type: String, required: true },
  to_location: { type: String, required: true },
  travel_date: { type: Date, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Completed', 'Cancelled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Booking', bookingSchema);
