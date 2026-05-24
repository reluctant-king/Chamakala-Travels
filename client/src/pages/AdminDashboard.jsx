import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Ticket, MessageSquare, Settings, ShieldCheck, Mail, Lock, BarChart2 } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [inquiries, setInquiries] = useState([]);
  const [fares, setFares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newFare, setNewFare] = useState({ type: 'Flight', from_location: '', to_location: '', price: '', travel_date: '' });
  const navigate = useNavigate();

  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));

  // Settings State
  const [profileData, setProfileData] = useState({ email: adminInfo?.email || '', password: '', confirmPassword: '' });
  const [profileStatus, setProfileStatus] = useState({ success: '', error: '' });

  useEffect(() => {
    fetchData();
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

    setLoading(true);
    try {
      const endpoint = activeTab === 'inquiries' ? '/api/inquiries' : '/api/fares';
      const res = await fetch(`http://localhost:5000${endpoint}`, {
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
        else setFares(Array.isArray(data) ? data : []);
      } else {
        // Non‑200 response – show empty list
        if (activeTab === 'inquiries') setInquiries([]);
        else setFares([]);
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
      await fetch(`http://localhost:5000/api/inquiries/${id}/status`, {
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
      await fetch('http://localhost:5000/api/fares', {
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
      const res = await fetch('http://localhost:5000/api/auth/profile', {
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
            onClick={() => setActiveTab('fares')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'fares' ? 'bg-brand-blue text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Ticket className="h-5 w-5" /> Fares
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
        <h1 className="text-3xl font-bold mb-8 capitalize">{activeTab === 'settings' ? 'Account Settings' : activeTab}</h1>
        
        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {activeTab === 'inquiries' ? (
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10 text-gray-300">
                  <tr>
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Contact</th>
                    <th className="p-4 font-semibold">Destination</th>
                    <th className="p-4 font-semibold">Type</th>
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
                ) : activeTab === 'analytics' ? (
                  <div className="p-6 bg-gradient-to-r from-brand-dark to-brand-blue rounded-xl shadow-lg backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-4 text-brand-gold">Contact Statistics</h2>
                    <p className="mb-4 text-gray-200">Total contacts: {inquiries.length}</p>
                    {/* Summary Cards */}
                    <div className="grid gap-4 md:grid-cols-2 mb-4">
                      <div className="bg-white/10 p-4 rounded-xl text-center">
                        <h3 className="text-brand-gold font-semibold mb-2">Total Contacts</h3>
                        <p className="text-2xl font-bold text-white">{inquiries.length}</p>
                      </div>
                      <div className="bg-white/10 p-4 rounded-xl text-center">
                        <h3 className="text-brand-gold font-semibold mb-2">Top Travel Type</h3>
                        <p className="text-xl font-medium text-white">{(() => {
                          const typeCounts = inquiries.reduce((acc, cur) => { acc[cur.travel_type] = (acc[cur.travel_type] || 0) + 1; return acc; }, {});
                          return Object.entries(typeCounts).reduce((a, b) => (b[1] > a[1] ? b : a), ['None', 0])[0];
                        })()}</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-brand-gold">Travel Type Breakdown</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {(() => {
                        const typeCounts = inquiries.reduce((acc, cur) => {
                          acc[cur.travel_type] = (acc[cur.travel_type] || 0) + 1;
                          return acc;
                        }, {});
                        const maxCount = Math.max(...Object.values(typeCounts), 0);
                        const mostCommon = Object.entries(typeCounts).reduce((a, b) => (b[1] > a[1] ? b : a), ['', 0])[0];
                        return (
                          <>
                            {Object.entries(typeCounts).map(([type, count]) => {
                              const percent = maxCount ? Math.round((count / maxCount) * 100) : 0;
                              return (
                                <div key={type} className="bg-white/5 p-4 rounded-xl shadow transition-transform transform hover:scale-105">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-200">{type}</span>
                                    <span className="text-sm font-medium text-gray-200">{count}</span>
                                  </div>
                                  <div className="w-full bg-white/10 h-4 rounded">
                                    <div className="bg-brand-gold h-4 rounded" style={{ width: `${(count / maxCount) * 100}%` }} />
                                  </div>
                                  <p className="mt-1 text-xs text-gray-400 text-center">{percent}% of max</p>
                                </div>
                              );
                            })}
                            {mostCommon && (
                              <p className="col-span-2 text-center text-gray-300 mt-4">
                                Most popular travel type: <span className="font-medium text-brand-gold">{mostCommon}</span>
                              </p>
                            )}
                          </>
                        );
                      })()}
                    </div>
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
