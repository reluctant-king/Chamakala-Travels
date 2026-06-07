import express from 'express';
import Settings from '../models/Settings.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: get promotional fares for the homepage ticker
router.get('/public', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res.json([]);
    }
    res.json(settings.promotionalFares || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve site settings / content management data
router.get('/', protect, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update site settings
router.put('/', protect, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    }

    const allowedFields = [
      'siteName',
      'contactInfo',
      'socialLinks',
      'hero',
      'banners',
      'about',
      'offers',
      'testimonials',
      'footer',
      'currency',
      'apiSettings',
      'promotionalFares'
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        settings[field] = req.body[field];
      }
    });

    const updated = await settings.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
