import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Ticket, MessageSquare } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [fares, setFares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newFare, setNewFare] = useState({ type: 'Flight', from_location: '', to_location: '', price: '', travel_date: '' });
  const navigate = useNavigate();

  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === 'inquiries' ? '/api/inquiries' : '/api/fares';
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      const data = await res.json();
      if (activeTab === 'inquiries') setInquiries(data);
      else setFares(data);
    } catch (error) {
      console.error('Error fetching data:', error);
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
        <h1 className="text-3xl font-bold mb-8 capitalize">{activeTab}</h1>
        
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
            ) : (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
