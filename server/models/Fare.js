import mongoose from 'mongoose';

const fareSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Flight', 'Train', 'Bus']
  },
  from_location: {
    type: String,
    required: true
  },
  to_location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  travel_date: {
    type: Date,
    required: true
  },
  provider: {
    type: String,
    default: 'Chamakala Travels'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Fare', fareSchema);
