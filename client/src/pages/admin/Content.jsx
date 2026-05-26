import { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import { useAdmin } from './AdminContext';

const Content = () => {
  const { adminInfo } = useAdmin();
  const [settings, setSettings] = useState(null);
  const [contentLoading, setContentLoading] = useState(true);
  const [settingsStatus, setSettingsStatus] = useState({ success: '', error: '' });

  useEffect(() => {
    if (!adminInfo?.token) return;
    const load = async () => {
      setContentLoading(true);
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
      setContentLoading(false);
    };
    load();
  }, [adminInfo]);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSettingsStatus({ success: '', error: '' });
    try {
      const res = await fetch(`${API_URL}/api/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminInfo.token}` },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok) {
        setSettings(data);
        setSettingsStatus({ success: 'Content updated successfully.', error: '' });
      } else {
        setSettingsStatus({ success: '', error: data.message || 'Update failed' });
      }
    } catch {
      setSettingsStatus({ success: '', error: 'Server error' });
    }
  };

  const reload = () => {
    if (!adminInfo?.token) return;
    setContentLoading(true);
    const load = async () => {
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
      setContentLoading(false);
    };
    load();
  };

  if (contentLoading) {
    return <div className="p-6 text-center text-gray-400">Loading content settings…</div>;
  }

  if (!settings) {
    return <div className="p-6 text-gray-400">No content settings found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold">Website Content</h3>
          <p className="text-sm text-gray-400">Edit homepage banners, hero section, about, offers, testimonials, contact details and footer.</p>
        </div>
        <button onClick={reload} className="bg-white/5 px-4 py-2 rounded-lg text-sm">Reload</button>
      </div>

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
            <input value={(settings.socialLinks || []).join(',')} onChange={(e) => setSettings({ ...settings, socialLinks: e.target.value.split(',').map((s) => s.trim()) })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Banner Image URLs (comma separated)</label>
            <input value={(settings.banners || []).join(',')} onChange={(e) => setSettings({ ...settings, banners: e.target.value.split(',').map((s) => s.trim()) })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" />
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
    </div>
  );
};

export default Content;
