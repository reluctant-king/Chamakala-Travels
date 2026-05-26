import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldCheck } from 'lucide-react';
import { API_URL } from '../../config';
import { useAdmin } from './AdminContext';

const Settings = () => {
  const { adminInfo } = useAdmin();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    email: adminInfo?.email || '',
    password: '',
    confirmPassword: '',
  });
  const [profileStatus, setProfileStatus] = useState({ success: '', error: '' });

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
          Authorization: `Bearer ${adminInfo.token}`,
        },
        body: JSON.stringify({
          email: profileData.email,
          password: profileData.password || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setProfileStatus({ success: 'Credentials updated successfully! Logging out in 3 seconds...', error: '' });
        setTimeout(() => {
          localStorage.removeItem('adminInfo');
          navigate('/login');
        }, 3000);
      } else {
        setProfileStatus({ success: '', error: data.message || 'Failed to update credentials' });
      }
    } catch {
      setProfileStatus({ success: '', error: 'Error connecting to the server' });
    }
  };

  return (
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
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
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
              onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
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
              onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
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
  );
};

export default Settings;
