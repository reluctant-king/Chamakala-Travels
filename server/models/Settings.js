import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'Chamakala Travels' },
  contactInfo: {
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    address: { type: String, default: '' }
  },
  socialLinks: { type: [{ type: String }], default: [] },
  hero: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    ctaText: { type: String, default: '' },
    ctaLink: { type: String, default: '' },
    imageUrl: { type: String, default: '' }
  },
  banners: { type: [{ type: String }], default: [] },
  about: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' }
  },
  offers: {
    type: [
      {
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        icon: { type: String, default: '' },
        active: { type: Boolean, default: true }
      }
    ],
    default: []
  },
  testimonials: {
    type: [
      {
        name: { type: String, default: '' },
        role: { type: String, default: '' },
        quote: { type: String, default: '' },
        avatarUrl: { type: String, default: '' }
      }
    ],
    default: []
  },
  footer: {
    text: { type: String, default: '' },
    links: { type: [{ label: String, href: String }], default: [] }
  },
  promotionalFares: {
    type: [
      {
        origin: { type: String, default: '' },
        destination: { type: String, default: '' },
        price: { type: Number, default: 0 },
        transportType: { type: String, enum: ['flight', 'train', 'bus'], default: 'flight' },
        isActive: { type: Boolean, default: true },
        lastUpdated: { type: Date, default: null }
      }
    ],
    default: []
  },
  currency: { type: String, default: 'INR' },
  apiSettings: { type: Map, of: String, default: new Map() },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Settings', settingsSchema);
