import express from 'express';
import Package from '../models/Package.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Get all packages (public)
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a package (admin only) - with image upload
router.post('/', protect, upload.single('image'), async (req, res) => {
  const { title, description, price, destinations, itinerary } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
  const pkg = new Package({
    title,
    description,
    price,
    destinations: destinations ? destinations.split(',') : [],
    itinerary,
    imageUrl,
  });
  try {
    const newPkg = await pkg.save();
    res.status(201).json(newPkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a package (admin only) - optional new image
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    const { title, description, price, destinations, itinerary } = req.body;
    if (title) pkg.title = title;
    if (description) pkg.description = description;
    if (price) pkg.price = price;
    if (destinations) pkg.destinations = destinations.split(',');
    if (itinerary) pkg.itinerary = itinerary;
    if (req.file) pkg.imageUrl = `/uploads/${req.file.filename}`;
    const updated = await pkg.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a package (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    await pkg.deleteOne();
    res.json({ message: 'Package removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
