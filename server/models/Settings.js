import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'Chamakala Travels' },
  contactInfo: {
    phone: { type: String },
    email: { type: String },
    address: { type: String }
  },
  socialLinks: [{ type: String }],
  hero: {
    title: { type: String },
    subtitle: { type: String },
    ctaText: { type: String },
    ctaLink: { type: String },
    imageUrl: { type: String }
  },
  banners: [{ type: String }],
  about: {
    title: { type: String },
    description: { type: String },
    imageUrl: { type: String }
  },
  offers: [
    {
      title: { type: String },
      subtitle: { type: String },
      icon: { type: String },
      active: { type: Boolean, default: true }
    }
  ],
  testimonials: [
    {
      name: { type: String },
      role: { type: String },
      quote: { type: String },
      avatarUrl: { type: String }
    }
  ],
  footer: {
    text: { type: String },
    links: [{ label: String, href: String }]
  },
  currency: { type: String, default: 'INR' },
  apiSettings: { type: Map, of: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Settings', settingsSchema);
