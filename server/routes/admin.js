import express from 'express';
import Booking from '../models/Booking.js';
import Inquiry from '../models/Inquiry.js';
import Fare from '../models/Fare.js';
import Package from '../models/Package.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/admin/overview - aggregated dashboard data
router.get('/overview', protect, async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pendingRequests = await Booking.countDocuments({ status: 'Pending' });

    // Revenue from approved or completed bookings
    const revenueAgg = await Booking.aggregate([
      { $match: { status: { $in: ['Approved', 'Completed'] } } },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    const activePackages = await Package.countDocuments();
    const recentEnquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5);

    // Monthly bookings (last 6 months)
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 5);
    startDate.setDate(1);

    const monthlyAgg = await Booking.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          count: { $sum: 1 },
          revenue: { $sum: '$price' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Normalize months to a predictable array (last 6 months)
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ year: d.getFullYear(), month: d.getMonth() + 1 });
    }

    const monthlyBookings = months.map((m) => {
      const found = monthlyAgg.find(a => a._id.year === m.year && a._id.month === m.month);
      return {
        year: m.year,
        month: m.month,
        count: found ? found.count : 0,
        revenue: found ? found.revenue : 0
      };
    });

    const packagePopularity = await Booking.aggregate([
      { $match: { type: { $in: ['Flight', 'Train', 'Bus', 'Tour Package', 'Hotel'] } } },
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const sourceCounts = await Inquiry.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      totalBookings,
      pendingRequests,
      totalRevenue,
      activePackages,
      recentEnquiries,
      monthlyBookings,
      packagePopularity,
      sourceCounts
    });
  } catch (err) {
    console.error('Admin overview error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
