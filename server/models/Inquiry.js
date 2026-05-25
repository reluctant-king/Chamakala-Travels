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
  email: {
    type: String
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
  source: {
    type: String,
    enum: ['Contact Form', 'WhatsApp', 'Callback', 'Other'],
    default: 'Contact Form'
  },
  contacted: {
    type: Boolean,
    default: false
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
