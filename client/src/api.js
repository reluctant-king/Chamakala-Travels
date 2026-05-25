import { API_URL } from '../config';

export const api = {
  // Bookings
  getBookings: async (token) => {
    const res = await fetch(`${API_URL}/api/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
  createBooking: async (data, token) => {
    const res = await fetch(`${API_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateBookingStatus: async (id, status, token) => {
    const res = await fetch(`${API_URL}/api/bookings/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    return res.json();
  },
  deleteBooking: async (id, token) => {
    await fetch(`${API_URL}/api/bookings/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  // Packages
  getPackages: async () => {
    const res = await fetch(`${API_URL}/api/packages`);
    return res.json();
  },
  createPackage: async (formData, token) => {
    const res = await fetch(`${API_URL}/api/packages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    return res.json();
  },
  updatePackage: async (id, formData, token) => {
    const res = await fetch(`${API_URL}/api/packages/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    return res.json();
  },
  deletePackage: async (id, token) => {
    await fetch(`${API_URL}/api/packages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  // Payments
  getPayments: async (token) => {
    const res = await fetch(`${API_URL}/api/payments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
  // Settings
  getSettings: async () => {
    const res = await fetch(`${API_URL}/api/settings`);
    return res.json();
  },
  updateSettings: async (data, token) => {
    const res = await fetch(`${API_URL}/api/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
