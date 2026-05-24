import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Login Admin
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      // Generate JWT
      const token = jwt.sign(
        { id: admin._id, email: admin.email },
        process.env.JWT_SECRET || 'fallback_secret_key_change_me_in_prod',
        { expiresIn: '30d' }
      );

      res.json({
        _id: admin._id,
        email: admin.email,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Admin Profile (Username/Password) - Protected
router.put('/profile', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
      if (req.body.email) {
        admin.email = req.body.email;
      }
      
      if (req.body.password) {
        // Validation: enforce at least 6 characters for security
        if (req.body.password.length < 6) {
          return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        admin.password = req.body.password;
      }

      const updatedAdmin = await admin.save();

      // Generate a new token for the updated credentials
      const token = jwt.sign(
        { id: updatedAdmin._id, email: updatedAdmin.email },
        process.env.JWT_SECRET || 'fallback_secret_key_change_me_in_prod',
        { expiresIn: '30d' }
      );

      res.json({
        _id: updatedAdmin._id,
        email: updatedAdmin.email,
        token,
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error updating admin profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
