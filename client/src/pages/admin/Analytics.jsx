import { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import { useAdmin } from './AdminContext';

const Analytics = () => {
  const { adminInfo } = useAdmin();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      if (!adminInfo?.token) return;
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/admin/overview`, {
          headers: { Authorization: `Bearer ${adminInfo.token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setOverview(data);
        }
      } catch (err) {
        console.error('Error fetching overview:', err);
      }
      setLoading(false);
    };
    fetchOverview();
  }, [adminInfo]);

  if (loading) {
    return <div className="text-gray-400">Loading analytics...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-brand-dark to-brand-blue rounded-xl shadow-lg backdrop-blur-sm p-6">
      <h2 className="text-2xl font-bold mb-4 text-brand-gold">Dashboard Overview</h2>
      {overview ? (
        <>
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="bg-white/10 p-4 rounded-xl text-center">
              <h3 className="text-brand-gold font-semibold mb-2">Total Bookings</h3>
              <p className="text-2xl font-bold text-white">{overview.totalBookings}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl text-center">
              <h3 className="text-brand-gold font-semibold mb-2">Pending Requests</h3>
              <p className="text-2xl font-bold text-white">{overview.pendingRequests}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl text-center">
              <h3 className="text-brand-gold font-semibold mb-2">Revenue</h3>
              <p className="text-2xl font-bold text-white">₹{overview.totalRevenue}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <div className="bg-white/10 p-4 rounded-xl">
              <h3 className="text-sm text-gray-300 mb-2">Active Packages</h3>
              <p className="text-3xl font-bold text-white">{overview.activePackages}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <h3 className="text-sm text-gray-300 mb-2">Recent Enquiries</h3>
              <div className="space-y-2">
                {overview.recentEnquiries?.map((q) => (
                  <div key={q._id} className="flex justify-between items-center bg-white/5 p-2 rounded">
                    <div>
                      <div className="font-medium">{q.name}</div>
                      <div className="text-xs text-gray-300">{q.destination} • {q.travel_type}</div>
                    </div>
                    <div className="text-xs text-gray-300">{new Date(q.createdAt).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-brand-gold">Monthly Bookings (last 6 months)</h3>
            <div className="grid grid-cols-3 gap-3">
              {overview.monthlyBookings?.map((m) => (
                <div key={`${m.year}-${m.month}`} className="bg-white/5 p-3 rounded-xl text-center">
                  <div className="text-sm text-gray-300">{new Date(m.year, m.month - 1).toLocaleString('default', { month: 'short' })}</div>
                  <div className="text-2xl font-bold">{m.count}</div>
                  <div className="text-xs text-gray-400">₹{m.revenue}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="bg-white/10 p-4 rounded-xl">
              <h3 className="text-brand-gold font-semibold mb-3">Package Popularity</h3>
              {overview.packagePopularity?.length ? (
                overview.packagePopularity.map((item) => (
                  <div key={item._id} className="mb-2 flex justify-between text-sm text-gray-200">
                    <span>{item._id}</span>
                    <span>{item.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No package statistics yet.</p>
              )}
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <h3 className="text-brand-gold font-semibold mb-3">Enquiry Sources</h3>
              {overview.sourceCounts?.length ? (
                overview.sourceCounts.map((item) => (
                  <div key={item._id} className="mb-2 flex justify-between text-sm text-gray-200">
                    <span>{item._id}</span>
                    <span>{item.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No source data available.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="text-gray-200">No overview data available.</div>
      )}
    </div>
  );
};

export default Analytics;
