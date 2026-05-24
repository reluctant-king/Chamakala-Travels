import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fareRoutes from './routes/fares.js';
import inquiryRoutes from './routes/inquiries.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/fares', fareRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Chamakala Travels API is running' });
});

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chamakalatravels';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
