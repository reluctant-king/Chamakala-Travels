import express from 'express';
import Inquiry from '../models/Inquiry.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all inquiries (for admin) - Protected
router.get('/', protect, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit a new inquiry
router.post('/', async (req, res) => {
  const inquiry = new Inquiry({
    name: req.body.name,
    phone: req.body.phone,
    destination: req.body.destination,
    travel_type: req.body.travel_type,
    passenger_count: req.body.passenger_count,
    budget: req.body.budget,
    notes: req.body.notes
  });

  try {
    const newInquiry = await inquiry.save();
    res.status(201).json(newInquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update inquiry status (Protected)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (inquiry) {
      inquiry.status = req.body.status || inquiry.status;
      const updatedInquiry = await inquiry.save();
      res.json(updatedInquiry);
    } else {
      res.status(404).json({ message: 'Inquiry not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
