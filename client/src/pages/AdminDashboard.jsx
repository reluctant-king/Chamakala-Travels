import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Ticket, MessageSquare, Settings, ShieldCheck, Mail, Lock, BarChart2 } from 'lucide-react';
import { API_URL } from '../config';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [inquiries, setInquiries] = useState([]);
  const [fares, setFares] = useState([]);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newFare, setNewFare] = useState({ type: 'Flight', from_location: '', to_location: '', price: '', travel_date: '' });
  const [newBooking, setNewBooking] = useState({
    customerName: '',
    email: '',
    phone: '',
    type: 'Flight',
    from_location: '',
    to_location: '',
    travel_date: '',
    price: ''
  });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [settings, setSettings] = useState(null);
  const [settingsStatus, setSettingsStatus] = useState({ success: '', error: '' });
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquirySource, setInquirySource] = useState('');
  const [inquiryStatus, setInquiryStatus] = useState('');
  const [contentLoading, setContentLoading] = useState(false);
  const navigate = useNavigate();

  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));

  // Settings State
  const [profileData, setProfileData] = useState({ email: adminInfo?.email || '', password: '', confirmPassword: '' });
  const [profileStatus, setProfileStatus] = useState({ success: '', error: '' });

  useEffect(() => {
    fetchData();
    if (activeTab === 'bookings') fetchBookings();
  }, [activeTab]);

  const fetchData = async () => {
    // Guard: require valid admin token
    if (!adminInfo?.token) {
      setLoading(false);
      // Not logged in – redirect to login
      navigate('/login');
      return;
    }

    if (activeTab === 'settings') {
      setLoading(false);
      return;
    }

    if (activeTab === 'content') {
      await fetchSettings();
      setLoading(false);
      return;
    }

    if (activeTab === 'bookings') {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      let endpoint = '/api/fares';
      if (activeTab === 'inquiries') {
        const params = new URLSearchParams();
        if (inquirySearch) params.set('search', inquirySearch);
        if (inquirySource) params.set('source', inquirySource);
        if (inquiryStatus) params.set('status', inquiryStatus);
        endpoint = `/api/inquiries?${params.toString()}`;
      }
      if (activeTab === 'analytics') endpoint = '/api/admin/overview';

      const res = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 401) {
        // Token invalid or expired – force re‑login
        localStorage.removeItem('adminInfo');
        navigate('/login');
        return;
      }
      const data = await res.json();
      if (res.ok) {
        if (activeTab === 'inquiries') setInquiries(Array.isArray(data) ? data : []);
        else if (activeTab === 'fares') setFares(Array.isArray(data) ? data : []);
        else if (activeTab === 'analytics') setOverview(data);
      } else {
        // Non‑200 response – clear relevant state
        if (activeTab === 'inquiries') setInquiries([]);
        else if (activeTab === 'fares') setFares([]);
        else if (activeTab === 'analytics') setOverview(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (activeTab === 'inquiries') setInquiries([]);
      else setFares([]);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/login');
  };

  const updateInquiryStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/api/inquiries/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`
        },
        body: JSON.stringify({ status })
      });
      fetchData(); // Refresh
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleAddFare = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/api/fares`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`
        },
        body: JSON.stringify(newFare)
      });
      setNewFare({ type: 'Flight', from_location: '', to_location: '', price: '', travel_date: '' });
      fetchData();
    } catch (error) {
      console.error('Error adding fare:', error);
    }
  };

  // Bookings management
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    if (!adminInfo?.token) return;
    try {
      const res = await fetch(`${API_URL}/api/bookings`, { headers: { Authorization: `Bearer ${adminInfo.token}` } });
      if (res.ok) {
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Fetch bookings error', err);
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/api/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminInfo.token}` },
        body: JSON.stringify({ status })
      });
      fetchBookings();
    } catch (err) { console.error(err); }
  };

  const deleteBooking = async (id) => {
    if (!confirm('Delete this booking?')) return;
    try {
      await fetch(`${API_URL}/api/bookings/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${adminInfo.token}` } });
      fetchBookings();
    } catch (err) { console.error(err); }
  };

  const fetchSettings = async () => {
    if (!adminInfo?.token) return;
    setContentLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/settings`, {
        headers: { Authorization: `Bearer ${adminInfo.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.error('Fetch settings error', err);
    }
    setContentLoading(false);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSettingsStatus({ success: '', error: '' });
    try {
      const res = await fetch(`${API_URL}/api/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminInfo.token}` },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (res.ok) {
        setSettings(data);
        setSettingsStatus({ success: 'Content updated successfully.', error: '' });
      } else {
        setSettingsStatus({ success: '', error: data.message || 'Update failed' });
      }
    } catch (err) {
      setSettingsStatus({ success: '', error: 'Server error' });
    }
  };

  const handleBookingSave = async (e) => {
    e.preventDefault();
    try {
      const endpoint = selectedBooking ? `${API_URL}/api/bookings/${selectedBooking._id}` : `${API_URL}/api/bookings`;
      const method = selectedBooking ? 'PUT' : 'POST';
      const body = selectedBooking ? selectedBooking : newBooking;

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminInfo.token}` },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setNewBooking({ customerName: '', email: '', phone: '', type: 'Flight', from_location: '', to_location: '', travel_date: '', price: '' });
        setSelectedBooking(null);
        fetchBookings();
      }
    } catch (err) {
      console.error('Save booking error', err);
    }
  };

  const handleSelectBooking = (booking) => {
    setSelectedBooking(booking);
    setNewBooking({
      customerName: booking.customerName,
      email: booking.email,
      phone: booking.phone,
      type: booking.type,
      from_location: booking.from_location,
      to_location: booking.to_location,
      travel_date: booking.travel_date ? booking.travel_date.slice(0, 10) : '',
      price: booking.price
    });
  };

  const clearBookingForm = () => {
    setSelectedBooking(null);
    setNewBooking({ customerName: '', email: '', phone: '', type: 'Flight', from_location: '', to_location: '', travel_date: '', price: '' });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileStatus({ success: '', error: '' });

    if (profileData.password && profileData.password.length < 6) {
      setProfileStatus({ success: '', error: 'Password must be at least 6 characters long' });
      return;
    }

    if (profileData.password !== profileData.confirmPassword) {
      setProfileStatus({ success: '', error: 'Passwords do not match' });
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`
        },
        body: JSON.stringify({
          email: profileData.email,
          password: profileData.password || undefined
        })
      });

      const data = await res.json();

      if (res.ok) {
        setProfileStatus({ success: 'Credentials updated successfully! Logging out in 3 seconds...', error: '' });
        // Clear local storage and navigate after 3 seconds
        setTimeout(() => {
          localStorage.removeItem('adminInfo');
          navigate('/login');
        }, 3000);
      } else {
        setProfileStatus({ success: '', error: data.message || 'Failed to update credentials' });
      }
    } catch (err) {
      setProfileStatus({ success: '', error: 'Error connecting to the server' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex text-white font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-brand-dark border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold flex items-center gap-2 text-brand-gold">
            <LayoutDashboard className="h-5 w-5" /> Admin Panel
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'inquiries' ? 'bg-brand-blue text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <MessageSquare className="h-5 w-5" /> Inquiries
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'bookings' ? 'bg-brand-blue text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Ticket className="h-5 w-5" /> Bookings
          </button>
          <button 
            onClick={() => setActiveTab('fares')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'fares' ? 'bg-brand-blue text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Ticket className="h-5 w-5" /> Fares
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'content' ? 'bg-brand-blue text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Settings className="h-5 w-5" /> Content
          </button>
  
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'analytics' ? 'bg-brand-blue text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <BarChart2 className="h-5 w-5" /> Analytics
          </button>

        </nav>
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8 capitalize">{activeTab === 'settings' ? 'Account Settings' : activeTab === 'content' ? 'Content Management' : activeTab}</h1>
        
        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {activeTab === 'inquiries' ? (
              <div className="p-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <input
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="Search enquiries..."
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                  />
                  <select value={inquirySource} onChange={(e) => setInquirySource(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
                    <option value="">All sources</option>
                    <option value="Contact Form">Contact Form</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Callback">Callback</option>
                    <option value="Other">Other</option>
                  </select>
                  <select value={inquiryStatus} onChange={(e) => setInquiryStatus(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
                    <option value="">All statuses</option>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button onClick={fetchData} className="bg-brand-gold text-brand-dark rounded-xl px-4 py-3 font-semibold">Search</button>
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
                          onChange={(e) => updateInquiryStatus(inq._id, e.target.value)}
                          className={`bg-transparent border rounded px-2 py-1 text-sm focus:outline-none ${inq.status === 'New' ? 'border-brand-gold text-brand-gold' : inq.status === 'In Progress' ? 'border-blue-400 text-blue-400' : 'border-green-400 text-green-400'}`}
                        >
                          <option className="bg-brand-dark" value="New">New</option>
                          <option className="bg-brand-dark" value="In Progress">In Progress</option>
                          <option className="bg-brand-dark" value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && (
                    <tr><td colSpan="6" className="p-8 text-center text-gray-500">No inquiries found.</td></tr>
                  )}
                </tbody>
              </table>
                </div>
              </div>
            ) : activeTab === 'bookings' ? (
              <div className="p-6 space-y-6">
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="text-xl font-bold">Bookings</h3>
                      <button onClick={fetchBookings} className="text-sm bg-white/5 px-3 py-1 rounded">Refresh</button>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                      <h4 className="text-lg font-semibold mb-4">{selectedBooking ? 'Edit Booking' : 'Add Booking'}</h4>
                      <form onSubmit={handleBookingSave} className="grid gap-4 md:grid-cols-3">
                        <input required value={newBooking.customerName} onChange={(e) => setNewBooking({ ...newBooking, customerName: e.target.value })} placeholder="Customer Name" className="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
                        <input type="email" required value={newBooking.email} onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })} placeholder="Email" className="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
                        <input required value={newBooking.phone} onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })} placeholder="Phone" className="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
                        <select required value={newBooking.type} onChange={(e) => setNewBooking({ ...newBooking, type: e.target.value })} className="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white">
                          <option value="Flight">Flight</option>
                          <option value="Train">Train</option>
                          <option value="Bus">Bus</option>
                          <option value="Tour Package">Tour Package</option>
                          <option value="Hotel">Hotel</option>
                        </select>
                        <input required value={newBooking.from_location} onChange={(e) => setNewBooking({ ...newBooking, from_location: e.target.value })} placeholder="From" className="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
                        <input required value={newBooking.to_location} onChange={(e) => setNewBooking({ ...newBooking, to_location: e.target.value })} placeholder="To" className="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
                        <input required type="date" value={newBooking.travel_date} onChange={(e) => setNewBooking({ ...newBooking, travel_date: e.target.value })} className="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
                        <input required type="number" value={newBooking.price} onChange={(e) => setNewBooking({ ...newBooking, price: e.target.value })} placeholder="Price" className="bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
                        <div className="md:col-span-3 flex gap-3">
                          <button type="submit" className="bg-brand-gold text-brand-dark rounded-xl px-6 py-3 font-semibold">{selectedBooking ? 'Save Changes' : 'Create Booking'}</button>
                          {selectedBooking && <button type="button" onClick={clearBookingForm} className="bg-white/10 text-white rounded-xl px-6 py-3">Cancel</button>}
                        </div>
                      </form>
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
                              <td className="p-3">{b.phone} • {b.email}</td>
                              <td className="p-3">{b.from_location} → {b.to_location}</td>
                              <td className="p-3">{b.type}</td>
                              <td className="p-3">₹{b.price}</td>
                              <td className="p-3">{b.status}</td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  {b.status !== 'Approved' && <button onClick={() => updateBookingStatus(b._id, 'Approved')} className="px-2 py-1 text-sm bg-green-500 text-white rounded">Approve</button>}
                                  {b.status !== 'Completed' && <button onClick={() => updateBookingStatus(b._id, 'Completed')} className="px-2 py-1 text-sm bg-blue-500 text-white rounded">Complete</button>}
                                  {b.status !== 'Cancelled' && <button onClick={() => updateBookingStatus(b._id, 'Cancelled')} className="px-2 py-1 text-sm bg-red-500 text-white rounded">Cancel</button>}
                                  <button onClick={() => deleteBooking(b._id)} className="px-2 py-1 text-sm bg-white/5 rounded">Delete</button>
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
                  </div>
                ) : activeTab === 'content' ? (
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">Website Content</h3>
                        <p className="text-sm text-gray-400">Edit homepage banners, hero section, about, offers, testimonials, contact details and footer.</p>
                      </div>
                      <button onClick={fetchSettings} className="bg-white/5 px-4 py-2 rounded-lg text-sm">Reload</button>
                    </div>

                    {contentLoading ? (
                      <div className="p-6 text-center text-gray-400">Loading content settings…</div>
                    ) : settings ? (
                      <form onSubmit={handleSaveSettings} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Site Name</label>
                            <input value={settings.siteName || ''} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Currency</label>
                            <input value={settings.currency || ''} onChange={(e) => setSettings({ ...settings, currency: e.target.value })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Hero Title</label>
                            <input value={settings.hero?.title || ''} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, title: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Hero Subtitle</label>
                            <input value={settings.hero?.subtitle || ''} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, subtitle: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Hero CTA Text</label>
                            <input value={settings.hero?.ctaText || ''} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, ctaText: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Hero CTA Link</label>
                            <input value={settings.hero?.ctaLink || ''} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, ctaLink: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-300 mb-2">About Title</label>
                          <input value={settings.about?.title || ''} onChange={(e) => setSettings({ ...settings, about: { ...settings.about, title: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">About Description</label>
                          <textarea value={settings.about?.description || ''} onChange={(e) => setSettings({ ...settings, about: { ...settings.about, description: e.target.value } })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white min-h-[120px]" />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Contact Phone</label>
                            <input value={settings.contactInfo?.phone || ''} onChange={(e) => setSettings({ ...settings, contactInfo: { ...settings.contactInfo, phone: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Contact Email</label>
                            <input value={settings.contactInfo?.email || ''} onChange={(e) => setSettings({ ...settings, contactInfo: { ...settings.contactInfo, email: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Contact Address</label>
                          <input value={settings.contactInfo?.address || ''} onChange={(e) => setSettings({ ...settings, contactInfo: { ...settings.contactInfo, address: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Footer Text</label>
                            <input value={settings.footer?.text || ''} onChange={(e) => setSettings({ ...settings, footer: { ...settings.footer, text: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Social Links (comma separated)</label>
                            <input value={(settings.socialLinks || []).join(',')} onChange={(e) => setSettings({ ...settings, socialLinks: e.target.value.split(',').map((link) => link.trim()) })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Banner Image URLs (comma separated)</label>
                            <input value={(settings.banners || []).join(',')} onChange={(e) => setSettings({ ...settings, banners: e.target.value.split(',').map((url) => url.trim()) })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">About Image URL</label>
                            <input value={settings.about?.imageUrl || ''} onChange={(e) => setSettings({ ...settings, about: { ...settings.about, imageUrl: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Offer 1 Title</label>
                            <input value={settings.offers?.[0]?.title || ''} onChange={(e) => setSettings({ ...settings, offers: [{ ...(settings.offers?.[0] || {}), title: e.target.value }, ...(settings.offers?.slice(1) || [])] })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Offer 1 Subtitle</label>
                            <input value={settings.offers?.[0]?.subtitle || ''} onChange={(e) => setSettings({ ...settings, offers: [{ ...(settings.offers?.[0] || {}), subtitle: e.target.value }, ...(settings.offers?.slice(1) || [])] })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Testimonial 1 Name</label>
                            <input value={settings.testimonials?.[0]?.name || ''} onChange={(e) => setSettings({ ...settings, testimonials: [{ ...(settings.testimonials?.[0] || {}), name: e.target.value }, ...(settings.testimonials?.slice(1) || [])] })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Testimonial 1 Quote</label>
                            <input value={settings.testimonials?.[0]?.quote || ''} onChange={(e) => setSettings({ ...settings, testimonials: [{ ...(settings.testimonials?.[0] || {}), quote: e.target.value }, ...(settings.testimonials?.slice(1) || [])] })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
                          </div>
                        </div>

                        {settingsStatus.error && <div className="text-red-400">{settingsStatus.error}</div>}
                        {settingsStatus.success && <div className="text-green-400">{settingsStatus.success}</div>}

                        <button type="submit" className="bg-brand-gold text-brand-dark rounded-xl px-6 py-3 font-semibold">Save Content</button>
                      </form>
                    ) : (
                      <div className="p-6 text-gray-400">No content settings found.</div>
                    )}
                  </div>
                ) : activeTab === 'analytics' ? (
                  <div className="p-6 bg-gradient-to-r from-brand-dark to-brand-blue rounded-xl shadow-lg backdrop-blur-sm">
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
                              {overview.recentEnquiries.map((q) => (
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
                            {overview.monthlyBookings.map((m) => (
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
            ) : activeTab === 'fares' ? (
              <div className="p-6">
                <div className="mb-8 bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Add New Fare</h3>
                  <form onSubmit={handleAddFare} className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <select required value={newFare.type} onChange={(e) => setNewFare({...newFare, type: e.target.value})} className="bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white">
                      <option value="Flight">Flight</option>
                      <option value="Train">Train</option>
                      <option value="Bus">Bus</option>
                    </select>
                    <input required type="text" placeholder="From" value={newFare.from_location} onChange={(e) => setNewFare({...newFare, from_location: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2" />
                    <input required type="text" placeholder="To" value={newFare.to_location} onChange={(e) => setNewFare({...newFare, to_location: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2" />
                    <input required type="number" placeholder="Price (₹)" value={newFare.price} onChange={(e) => setNewFare({...newFare, price: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2" />
                    <input required type="date" value={newFare.travel_date} onChange={(e) => setNewFare({...newFare, travel_date: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 [color-scheme:dark]" />
                    <button type="submit" className="bg-brand-gold hover:bg-yellow-500 text-brand-dark font-bold rounded-lg py-2 transition-colors">Add Fare</button>
                  </form>
                </div>

                <p className="text-gray-400 mb-6">Manage manual ticket fares here. Fares added here will be displayed on the homepage.</p>
                {/* Simplified view for fares */}
                <div className="grid gap-4">
                  {fares.map((fare) => (
                    <div key={fare._id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <div>
                        <h3 className="font-semibold">{fare.from_location} → {fare.to_location}</h3>
                        <p className="text-sm text-gray-400">{fare.type} | Date: {new Date(fare.travel_date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-xl font-bold text-brand-gold">
                        ₹{fare.price}
                      </div>
                    </div>
                  ))}
                  {fares.length === 0 && (
                    <div className="text-center text-gray-500 p-4">No fares added yet.</div>
                  )}
                </div>
              </div>
            ) : (
              // Settings Tab
              <div className="p-8 max-w-xl mx-auto">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2 text-brand-gold">
                    <ShieldCheck className="h-6 w-6" /> Account Credentials
                  </h3>
                  <p className="text-gray-400 mt-2">Update the administrative username (email) and password. Changes take effect immediately.</p>
                </div>
                
                {profileStatus.success && (
                  <div className="bg-green-500/20 border border-green-500/50 text-green-400 p-4 rounded-xl mb-6 text-sm text-center">
                    {profileStatus.success}
                  </div>
                )}
                {profileStatus.error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 text-sm text-center">
                    {profileStatus.error}
                  </div>
                )}

                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Username / Admin Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input 
                        type="email" 
                        required 
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">New Password (leave blank to keep current)</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input 
                        type="password" 
                        value={profileData.password}
                        onChange={(e) => setProfileData({...profileData, password: e.target.value})}
                        className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-gold transition-colors"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input 
                        type="password" 
                        value={profileData.confirmPassword}
                        onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                        className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-gold transition-colors"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-dark font-bold text-lg rounded-xl py-3 transition-all shadow-lg hover:shadow-brand-gold/20"
                  >
                    Save & Update Credentials
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
