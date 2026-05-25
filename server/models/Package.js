import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  destinations: [{ type: String }],
  itinerary: { type: String },
  imageUrl: { type: String }, // URL to uploaded image
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Package', packageSchema);
