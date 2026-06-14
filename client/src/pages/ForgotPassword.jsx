import { useState } from 'react';
import { API_URL } from '../config';
import { Mail } from 'lucide-react';
import { Seo } from '../components/Seo';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ ok: '', err: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ ok: '', err: '' });
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        // show token to admin (local testing)
        setStatus({ ok: `Reset token: ${data.token}` , err: '' });
      } else {
        setStatus({ ok: '', err: data.message || 'Error generating token' });
      }
    } catch (err) {
      setStatus({ ok: '', err: 'Server error' });
    }
  };

  return (
    <>
      <Seo title="Forgot Password" description="Admin password reset for Chamakkala Travels dashboard." path="/forgot" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <p className="text-sm text-gray-500 mb-4">Enter admin email to generate a reset token (for local testing).</p>

        {status.err && <div className="text-sm text-red-500 mb-3">{status.err}</div>}
        {status.ok && <div className="text-sm text-green-600 mb-3 break-words">{status.ok}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-3 py-2 border rounded" placeholder="admin email" />
            </div>
          </div>
          <button className="w-full bg-indigo-600 text-white py-2 rounded">Generate Token</button>
        </form>
      </div>
    </div>
    </>
  );
}
