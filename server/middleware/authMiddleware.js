import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const protect = async (req, res, next) => {
  // Extract token from Authorization header
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token provided, respond with unauthorized
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback_secret_key_change_me_in_prod'
    );
    // Attach admin to request
    req.admin = await Admin.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    // Token verification failed
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export { protect };
