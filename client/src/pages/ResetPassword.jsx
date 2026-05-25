import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ ok: '', err: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ ok: '', err: '' });
    try {
      const res = await fetch(`${API_URL}/api/auth/reset/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ ok: data.message || 'Password reset', err: '' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setStatus({ ok: '', err: data.message || 'Reset failed' });
      }
    } catch (err) {
      setStatus({ ok: '', err: 'Server error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        {status.err && <div className="text-sm text-red-500 mb-3">{status.err}</div>}
        {status.ok && <div className="text-sm text-green-600 mb-3">{status.ok}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">New Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={6} className="w-full pl-3 pr-3 py-2 border rounded" />
          </div>
          <button className="w-full bg-indigo-600 text-white py-2 rounded">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
