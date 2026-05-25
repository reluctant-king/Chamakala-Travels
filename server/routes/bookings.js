import express from 'express';
import Booking from '../models/Booking.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all bookings (admin)
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new booking (admin can add manually)
router.post('/', protect, async (req, res) => {
  const { customerName, email, phone, type, from_location, to_location, travel_date, price } = req.body;
  const booking = new Booking({
    customerName,
    email,
    phone,
    type,
    from_location,
    to_location,
    travel_date,
    price,
  });
  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update booking status (approve, complete, cancel)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.status = req.body.status || booking.status;
    const updated = await booking.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update booking details
router.put('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const fields = ['customerName', 'email', 'phone', 'type', 'from_location', 'to_location', 'travel_date', 'price', 'status'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        booking[field] = req.body[field];
      }
    });

    const updated = await booking.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a booking
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    await booking.remove();
    res.json({ message: 'Booking removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
