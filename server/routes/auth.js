import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

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

export default router;
