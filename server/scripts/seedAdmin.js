import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chamakalatravels';
    await mongoose.connect(MONGO_URI);

    const adminExists = await Admin.findOne({ email: 'admin@chamakala.com' });

    if (adminExists) {
      console.log('Admin already exists');
      process.exit(1);
    }

    const admin = new Admin({
      email: 'admin@chamakala.com',
      password: 'admin123'
    });

    await admin.save();
    console.log('Admin seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
