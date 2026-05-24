import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  travel_type: {
    type: String,
    required: true,
    enum: ['Flight', 'Train', 'Bus', 'Package', 'Other']
  },
  passenger_count: {
    type: Number,
    required: true,
    min: 1
  },
  budget: {
    type: String
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Completed'],
    default: 'New'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Inquiry', inquirySchema);
