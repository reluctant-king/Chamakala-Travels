import express from 'express';
import Payment from '../models/Payment.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const payments = await Payment.find().populate('bookingId').sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, async (req, res) => {
  const { bookingId, amount, method, status, transactionId } = req.body;
  try {
    const payment = await Payment.create({ bookingId, amount, method, status, transactionId });
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
