import express from 'express';
import Fare from '../models/Fare.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all fares
router.get('/', async (req, res) => {
  try {
    const fares = await Fare.find().sort({ createdAt: -1 });
    res.json(fares);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a fare (Protected)
router.post('/', protect, async (req, res) => {
  const fare = new Fare({
    type: req.body.type,
    from_location: req.body.from_location,
    to_location: req.body.to_location,
    price: req.body.price,
    travel_date: req.body.travel_date,
    provider: req.body.provider
  });

  try {
    const newFare = await fare.save();
    res.status(201).json(newFare);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
