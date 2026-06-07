import { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import { useAdmin } from './AdminContext';
import { Plus, Pencil, Trash2, X, Power, Save } from 'lucide-react';
import ConfirmModal from '../../components/ConfirmModal';

const EMPTY_PROMO = { origin: '', destination: '', price: '', transportType: 'flight', isActive: true };

const PromotionalFares = () => {
  const { adminInfo } = useAdmin();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ success: '', error: '' });
  const [promoForm, setPromoForm] = useState({ ...EMPTY_PROMO });
  const [editingPromoIdx, setEditingPromoIdx] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, idx: null });

  useEffect(() => {
    if (!adminInfo?.token) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/settings`, {
          headers: { Authorization: `Bearer ${adminInfo.token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (err) {
        console.error('Fetch settings error', err);
      }
      setLoading(false);
    };
    load();
  }, [adminInfo]);

  const getFares = () => settings?.promotionalFares || [];

  const persist = async (updatedFares) => {
    setSaving(true);
    setStatus({ success: '', error: '' });
    try {
      const res = await fetch(`${API_URL}/api/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminInfo.token}` },
        body: JSON.stringify({ ...settings, promotionalFares: updatedFares }),
      });
      const data = await res.json();
      if (res.ok) {
        setSettings(data);
        setStatus({ success: 'Promotional fares saved successfully.', error: '' });
      } else {
        setStatus({ success: '', error: data.message || 'Save failed' });
      }
    } catch {
      setStatus({ success: '', error: 'Server error' });
    }
    setSaving(false);
  };

  const handleAdd = () => {
    const fares = getFares();
    const updated = [...fares, { ...promoForm, price: Number(promoForm.price), lastUpdated: new Date().toISOString() }];
    setSettings({ ...settings, promotionalFares: updated });
    persist(updated);
    setPromoForm({ ...EMPTY_PROMO });
    setShowForm(false);
  };

  const handleUpdate = () => {
    const fares = getFares();
    const updated = [...fares];
    updated[editingPromoIdx] = { ...updated[editingPromoIdx], ...promoForm, price: Number(promoForm.price), lastUpdated: new Date().toISOString() };
    setSettings({ ...settings, promotionalFares: updated });
    persist(updated);
    setPromoForm({ ...EMPTY_PROMO });
    setEditingPromoIdx(null);
    setShowForm(false);
  };

  const handleDelete = () => {
    const fares = getFares();
    const updated = fares.filter((_, i) => i !== deleteConfirm.idx);
    setSettings({ ...settings, promotionalFares: updated });
    persist(updated);
    setDeleteConfirm({ open: false, idx: null });
  };

  const toggleActive = (idx) => {
    const fares = getFares();
    const updated = [...fares];
    updated[idx] = { ...updated[idx], isActive: !updated[idx].isActive };
    setSettings({ ...settings, promotionalFares: updated });
    persist(updated);
  };

  const openAdd = () => {
    setPromoForm({ ...EMPTY_PROMO });
    setEditingPromoIdx(null);
    setShowForm(true);
  };

  const openEdit = (idx) => {
    const fare = getFares()[idx];
    setPromoForm({
      origin: fare.origin || '',
      destination: fare.destination || '',
      price: fare.price || '',
      transportType: fare.transportType || 'flight',
      isActive: fare.isActive !== false,
    });
    setEditingPromoIdx(idx);
    setShowForm(true);
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-400">Loading promotional fares…</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold">Promotional Fares</h3>
          <p className="text-sm text-gray-400">Manage promotional fare cards shown on the Latest Fares page. Changes are saved automatically.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-brand-gold text-brand-dark rounded-xl px-4 py-2 font-semibold text-sm hover:bg-yellow-500 transition">
          <Plus className="h-4 w-4" /> Add Fare
        </button>
      </div>

      {status.success && (
        <div className="rounded-xl border border-brand-green/30 bg-brand-green/10 px-4 py-3 text-sm text-brand-green flex items-center gap-2">
          <Save className="h-4 w-4" /> {status.success}
        </div>
      )}
      {status.error && (
        <div className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-400">{status.error}</div>
      )}

      {showForm && (
        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">{editingPromoIdx !== null ? 'Edit Fare' : 'New Fare'}</h4>
            <button onClick={() => { setShowForm(false); setEditingPromoIdx(null); }} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <input required placeholder="Origin" value={promoForm.origin} onChange={(e) => setPromoForm({ ...promoForm, origin: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
            <input required placeholder="Destination" value={promoForm.destination} onChange={(e) => setPromoForm({ ...promoForm, destination: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
            <input required type="number" placeholder="Price (₹)" value={promoForm.price} onChange={(e) => setPromoForm({ ...promoForm, price: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
            <select value={promoForm.transportType} onChange={(e) => setPromoForm({ ...promoForm, transportType: e.target.value })} className="bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-white">
              <option value="flight">Flight ✈️</option>
              <option value="train">Train 🚂</option>
              <option value="bus">Bus 🚌</option>
            </select>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" checked={promoForm.isActive} onChange={(e) => setPromoForm({ ...promoForm, isActive: e.target.checked })} className="accent-brand-gold" />
              Active
            </label>
            <button
              onClick={editingPromoIdx !== null ? handleUpdate : handleAdd}
              disabled={saving}
              className="bg-brand-gold text-brand-dark rounded-lg px-3 py-2 text-sm font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingPromoIdx !== null ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {getFares().length === 0 ? (
          <div className="text-center text-gray-500 py-8 border border-dashed border-white/10 rounded-xl">
            No promotional fares configured. Click "Add Fare" to create one.
          </div>
        ) : (
          getFares().map((fare, idx) => (
            <div key={idx} className={`flex items-center justify-between p-4 rounded-xl border ${fare.isActive === false ? 'border-white/5 bg-white/5 opacity-60' : 'border-white/10 bg-white/5'}`}>
              <div className="flex items-center gap-4">
                <button onClick={() => toggleActive(idx)} className={`p-1.5 rounded-lg transition ${fare.isActive === false ? 'text-gray-500 hover:text-gray-300' : 'text-brand-green hover:text-green-400'}`}>
                  <Power className="h-4 w-4" />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{fare.transportType === 'flight' ? '✈️' : fare.transportType === 'train' ? '🚂' : '🚌'}</span>
                    <h3 className="font-semibold">{fare.origin} → {fare.destination}</h3>
                    {saving && <span className="text-xs text-brand-gold animate-pulse">saving…</span>}
                  </div>
                  <p className="text-sm text-gray-400">
                    <span className="text-brand-gold font-bold">₹{fare.price?.toLocaleString()}</span>
                    {fare.lastUpdated && <span className="ml-3 text-xs text-gray-500">Updated: {new Date(fare.lastUpdated).toLocaleDateString()}</span>}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(idx)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => setDeleteConfirm({ open: true, idx })} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmModal
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, idx: null })}
        onConfirm={handleDelete}
        title="Delete Fare"
        message="Are you sure you want to delete this promotional fare?"
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default PromotionalFares;
