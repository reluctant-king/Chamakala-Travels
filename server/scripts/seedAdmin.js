import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chamakalatravels';
    await mongoose.connect(MONGO_URI);

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.log('------------------------------------------------------------');
      console.log('WARNING: ADMIN_EMAIL or ADMIN_PASSWORD not found in environment.');
      console.log('Please create a server/.env file with custom credentials for privacy.');
      console.log('Seeding default local testing admin (admin@chamakala.com / admin123)...');
      console.log('------------------------------------------------------------');
    }

    const finalEmail = email || 'admin@chamakala.com';
    const finalPassword = password || 'admin123';

    const adminExists = await Admin.findOne({ email: finalEmail });

    if (adminExists) {
      console.log(`Admin already exists for: ${finalEmail}`);
      process.exit(0);
    }

    const admin = new Admin({
      email: finalEmail,
      password: finalPassword
    });

    await admin.save();
    console.log(`Admin (${finalEmail}) seeded successfully!`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
