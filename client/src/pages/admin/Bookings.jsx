import { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import { useAdmin } from './AdminContext';
import ConfirmModal from '../../components/ConfirmModal';
import { X, Plus } from 'lucide-react';

const initialBooking = {
  customerName: '',
  email: '',
  phone: '',
  type: 'Flight',
  from_location: '',
  to_location: '',
  travel_date: '',
  price: '',
};

const loadBookings = async (adminInfo, setter) => {
  if (!adminInfo?.token) return;
  try {
    const res = await fetch(`${API_URL}/api/bookings`, {
      headers: { Authorization: `Bearer ${adminInfo.token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setter(Array.isArray(data) ? data : []);
    }
  } catch (err) {
    console.error('Fetch bookings error', err);
  }
};

const Bookings = () => {
  const { adminInfo } = useAdmin();
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({ ...initialBooking });
  const [editingBooking, setEditingBooking] = useState(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  useEffect(() => {
    loadBookings(adminInfo, setBookings);
  }, [adminInfo]);

  const fetchBookings = () => loadBookings(adminInfo, setBookings);

  const openAddModal = () => {
    setEditingBooking(null);
    setFormData({ ...initialBooking });
    setFormModalOpen(true);
  };

  const openEditModal = (booking) => {
    setEditingBooking(booking);
    setFormData({
      customerName: booking.customerName,
      email: booking.email,
      phone: booking.phone,
      type: booking.type,
      from_location: booking.from_location,
      to_location: booking.to_location,
      travel_date: booking.travel_date ? booking.travel_date.slice(0, 10) : '',
      price: booking.price,
    });
    setFormModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const endpoint = editingBooking
        ? `${API_URL}/api/bookings/${editingBooking._id}`
        : `${API_URL}/api/bookings`;
      const method = editingBooking ? 'PUT' : 'POST';
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminInfo.token}` },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormModalOpen(false);
        setEditingBooking(null);
        fetchBookings();
      }
    } catch (err) {
      console.error('Save booking error', err);
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/api/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminInfo.token}` },
        body: JSON.stringify({ status }),
      });
      fetchBookings();
    } catch (err) { console.error(err); }
  };

  const handleDeleteBooking = async () => {
    if (!deleteConfirm.id) return;
    try {
      await fetch(`${API_URL}/api/bookings/${deleteConfirm.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminInfo.token}` },
      });
      setDeleteConfirm({ open: false, id: null });
      fetchBookings();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Bookings</h3>
        <div className="flex gap-2">
          <button onClick={fetchBookings} className="text-sm bg-white/5 px-3 py-1 rounded">Refresh</button>
          <button onClick={openAddModal} className="text-sm bg-brand-gold text-brand-dark px-3 py-1 rounded font-semibold flex items-center gap-1">
            <Plus className="h-4 w-4" /> Add Booking
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10 text-gray-300">
            <tr>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Customer</th>
              <th className="p-3 font-semibold">Contact</th>
              <th className="p-3 font-semibold">Route</th>
              <th className="p-3 font-semibold">Type</th>
              <th className="p-3 font-semibold">Price</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {bookings.map((b) => (
              <tr key={b._id} className="hover:bg-white/5 transition-colors">
                <td className="p-3 text-sm text-gray-400">{new Date(b.createdAt).toLocaleDateString()}</td>
                <td className="p-3">{b.customerName}</td>
                <td className="p-3">{b.phone} &bull; {b.email}</td>
                <td className="p-3">{b.from_location} &rarr; {b.to_location}</td>
                <td className="p-3">{b.type}</td>
                <td className="p-3">₹{b.price}</td>
                <td className="p-3">{b.status}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    {b.status !== 'Approved' && <button onClick={() => updateBookingStatus(b._id, 'Approved')} className="px-2 py-1 text-sm bg-green-500 text-white rounded">Approve</button>}
                    {b.status !== 'Completed' && <button onClick={() => updateBookingStatus(b._id, 'Completed')} className="px-2 py-1 text-sm bg-blue-500 text-white rounded">Complete</button>}
                    {b.status !== 'Cancelled' && <button onClick={() => updateBookingStatus(b._id, 'Cancelled')} className="px-2 py-1 text-sm bg-red-500 text-white rounded">Cancel</button>}
                    <button onClick={() => openEditModal(b)} className="px-2 py-1 text-sm bg-yellow-500/20 text-yellow-400 rounded">Edit</button>
                    <button onClick={() => setDeleteConfirm({ open: true, id: b._id })} className="px-2 py-1 text-sm bg-white/5 rounded">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr><td colSpan="8" className="p-8 text-center text-gray-500">No bookings found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {formModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-xl shadow-lg max-w-2xl w-full mx-4 p-6 relative border border-white/10 animate-slide-up">
            <button onClick={() => { setFormModalOpen(false); setEditingBooking(null); }} className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold mb-4">{editingBooking ? 'Edit Booking' : 'Add Booking'}</h3>
            <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-3">
              <input required value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} placeholder="Customer Name" className="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" className="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
              <input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone" className="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
              <select required value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white">
                <option value="Flight">Flight</option>
                <option value="Train">Train</option>
                <option value="Bus">Bus</option>
                <option value="Tour Package">Tour Package</option>
                <option value="Hotel">Hotel</option>
              </select>
              <input required value={formData.from_location} onChange={(e) => setFormData({ ...formData, from_location: e.target.value })} placeholder="From" className="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
              <input required value={formData.to_location} onChange={(e) => setFormData({ ...formData, to_location: e.target.value })} placeholder="To" className="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
              <input required type="date" value={formData.travel_date} onChange={(e) => setFormData({ ...formData, travel_date: e.target.value })} className="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
              <input required type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="Price" className="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
              <div className="md:col-span-3 flex gap-3 justify-end">
                <button type="button" onClick={() => { setFormModalOpen(false); setEditingBooking(null); }} className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 transition text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-brand-gold text-brand-dark font-semibold text-sm hover:bg-yellow-500 transition">{editingBooking ? 'Save Changes' : 'Create Booking'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={handleDeleteBooking}
        title="Delete Booking"
        message="Are you sure you want to delete this booking? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default Bookings;
