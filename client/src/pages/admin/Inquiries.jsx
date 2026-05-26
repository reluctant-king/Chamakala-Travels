import { useState, useEffect, useRef } from 'react';
import { API_URL } from '../../config';
import { useAdmin } from './AdminContext';
import ConfirmModal from '../../components/ConfirmModal';
import { Trash2 } from 'lucide-react';

const Inquiries = () => {
  const { adminInfo } = useAdmin();
  const [inquiries, setInquiries] = useState([]);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const filtersRef = useRef({ search: '', source: '', status: '' });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  const fetchInquiries = async (searchTerm, source, status) => {
    if (!adminInfo?.token) return;
    filtersRef.current = { search: searchTerm, source, status };
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.set('search', searchTerm);
      if (source) params.set('source', source);
      if (status) params.set('status', status);
      const res = await fetch(`${API_URL}/api/inquiries?${params.toString()}`, {
        headers: { Authorization: `Bearer ${adminInfo.token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(Array.isArray(data) ? data : []);
      } else {
        setInquiries([]);
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      setInquiries([]);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchInquiries('', '', '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    fetchInquiries(search, sourceFilter, statusFilter);
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/api/inquiries/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchInquiries(search, sourceFilter, statusFilter);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteInquiry = async () => {
    if (!deleteConfirm.id) return;
    try {
      await fetch(`${API_URL}/api/inquiries/${deleteConfirm.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminInfo.token}` },
      });
      setDeleteConfirm({ open: false, id: null });
      fetchInquiries(search, sourceFilter, statusFilter);
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search enquiries..."
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
        />
        <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
          <option value="">All sources</option>
          <option value="Contact Form">Contact Form</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Callback">Callback</option>
          <option value="Other">Other</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
          <option value="">All statuses</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={handleSearch} className="bg-brand-gold text-brand-dark rounded-xl px-4 py-3 font-semibold">Search</button>
      </div>
      <div className="overflow-x-auto bg-white/5 rounded-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10 text-gray-300">
            <tr>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Contact</th>
              <th className="p-4 font-semibold">Destination</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Source</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {inquiries.map((inq) => (
              <tr key={inq._id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-sm text-gray-400">{new Date(inq.createdAt).toLocaleDateString()}</td>
                <td className="p-4">{inq.name}</td>
                <td className="p-4">{inq.phone}</td>
                <td className="p-4">{inq.destination}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-white/10 rounded-full text-xs">{inq.travel_type}</span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-white/10 rounded-full text-xs">{inq.source || 'Contact Form'}</span>
                </td>
                <td className="p-4">
                  <select
                    value={inq.status}
                    onChange={(e) => updateStatus(inq._id, e.target.value)}
                    className={`bg-transparent border rounded px-2 py-1 text-sm focus:outline-none ${inq.status === 'New' ? 'border-brand-gold text-brand-gold' : inq.status === 'In Progress' ? 'border-blue-400 text-blue-400' : 'border-green-400 text-green-400'}`}
                  >
                    <option className="bg-brand-dark" value="New">New</option>
                    <option className="bg-brand-dark" value="In Progress">In Progress</option>
                    <option className="bg-brand-dark" value="Completed">Completed</option>
                  </select>
                </td>
                <td className="p-4">
                  <button onClick={() => setDeleteConfirm({ open: true, id: inq._id })} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr><td colSpan="8" className="p-8 text-center text-gray-500">No inquiries found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={handleDeleteInquiry}
        title="Delete Inquiry"
        message="Are you sure you want to delete this inquiry? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default Inquiries;
