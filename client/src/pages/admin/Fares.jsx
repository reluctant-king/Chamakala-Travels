import { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import { useAdmin } from './AdminContext';
import ConfirmModal from '../../components/ConfirmModal';
import { Pencil, Trash2, X } from 'lucide-react';

const initialFare = { type: 'Flight', from_location: '', to_location: '', price: '', travel_date: '' };

const Fares = () => {
  const { adminInfo } = useAdmin();
  const [fares, setFares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newFare, setNewFare] = useState({ ...initialFare });
  const [editingFare, setEditingFare] = useState(null);
  const [editForm, setEditForm] = useState({ ...initialFare });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  const fetchFares = async () => {
    if (!adminInfo?.token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/fares`, {
        headers: { Authorization: `Bearer ${adminInfo.token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setFares(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error fetching fares:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFares();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddFare = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/api/fares`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminInfo.token}` },
        body: JSON.stringify(newFare),
      });
      setNewFare({ ...initialFare });
      fetchFares();
    } catch (err) {
      console.error('Error adding fare:', err);
    }
  };

  const openEditModal = (fare) => {
    setEditingFare(fare);
    setEditForm({
      type: fare.type,
      from_location: fare.from_location,
      to_location: fare.to_location,
      price: fare.price,
      travel_date: fare.travel_date ? fare.travel_date.slice(0, 10) : '',
    });
    setEditModalOpen(true);
  };

  const handleEditFare = async (e) => {
    e.preventDefault();
    if (!editingFare) return;
    try {
      await fetch(`${API_URL}/api/fares/${editingFare._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminInfo.token}` },
        body: JSON.stringify(editForm),
      });
      setEditModalOpen(false);
      setEditingFare(null);
      fetchFares();
    } catch (err) {
      console.error('Error updating fare:', err);
    }
  };

  const handleDeleteFare = async () => {
    if (!deleteConfirm.id) return;
    try {
      await fetch(`${API_URL}/api/fares/${deleteConfirm.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminInfo.token}` },
      });
      setDeleteConfirm({ open: false, id: null });
      fetchFares();
    } catch (err) {
      console.error('Error deleting fare:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8 bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Add New Fare</h3>
        <form onSubmit={handleAddFare} className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <select required value={newFare.type} onChange={(e) => setNewFare({ ...newFare, type: e.target.value })} className="bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white">
            <option value="Flight">Flight</option>
            <option value="Train">Train</option>
            <option value="Bus">Bus</option>
          </select>
          <input required type="text" placeholder="From" value={newFare.from_location} onChange={(e) => setNewFare({ ...newFare, from_location: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2" />
          <input required type="text" placeholder="To" value={newFare.to_location} onChange={(e) => setNewFare({ ...newFare, to_location: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2" />
          <input required type="number" placeholder="Price (₹)" value={newFare.price} onChange={(e) => setNewFare({ ...newFare, price: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2" />
          <input required type="date" value={newFare.travel_date} onChange={(e) => setNewFare({ ...newFare, travel_date: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 [color-scheme:dark]" />
          <button type="submit" className="bg-brand-gold hover:bg-yellow-500 text-brand-dark font-bold rounded-lg py-2 transition-colors">Add Fare</button>
        </form>
      </div>

      <p className="text-gray-400 mb-6">Manage manual ticket fares here. Fares added here will be displayed on the homepage.</p>
      <div className="grid gap-4">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10 animate-pulse">
              <div className="flex-1">
                <div className="h-5 w-48 bg-white/10 rounded mb-2" />
                <div className="h-4 w-36 bg-white/10 rounded" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-7 w-20 bg-white/10 rounded" />
                <div className="h-8 w-8 bg-white/10 rounded-lg" />
                <div className="h-8 w-8 bg-white/10 rounded-lg" />
              </div>
            </div>
          ))
        ) : fares.length === 0 ? (
          <div className="text-center text-gray-500 p-4">No fares added yet.</div>
        ) : (
          fares.map((fare) => (
            <div key={fare._id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div>
                <h3 className="font-semibold">{fare.from_location} &rarr; {fare.to_location}</h3>
                <p className="text-sm text-gray-400">{fare.type} | Date: {new Date(fare.travel_date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xl font-bold text-brand-gold">₹{fare.price}</div>
                <button onClick={() => openEditModal(fare)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => setDeleteConfirm({ open: true, id: fare._id })} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-xl shadow-lg max-w-lg w-full mx-4 p-6 relative border border-white/10 animate-slide-up">
            <button onClick={() => { setEditModalOpen(false); setEditingFare(null); }} className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold mb-4">Edit Fare</h3>
            <form onSubmit={handleEditFare} className="space-y-4">
              <select required value={editForm.type} onChange={(e) => setEditForm({ ...editForm, type: e.target.value })} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white">
                <option value="Flight">Flight</option>
                <option value="Train">Train</option>
                <option value="Bus">Bus</option>
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="From" value={editForm.from_location} onChange={(e) => setEditForm({ ...editForm, from_location: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2" />
                <input required type="text" placeholder="To" value={editForm.to_location} onChange={(e) => setEditForm({ ...editForm, to_location: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required type="number" placeholder="Price (₹)" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2" />
                <input required type="date" value={editForm.travel_date} onChange={(e) => setEditForm({ ...editForm, travel_date: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 [color-scheme:dark]" />
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => { setEditModalOpen(false); setEditingFare(null); }} className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 transition text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-brand-gold text-brand-dark font-semibold text-sm hover:bg-yellow-500 transition">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={handleDeleteFare}
        title="Delete Fare"
        message="Are you sure you want to delete this fare? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default Fares;
