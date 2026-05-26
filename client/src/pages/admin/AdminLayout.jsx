import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Ticket,
  MessageSquare,
  Settings,
  BarChart2,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { AdminContext } from './AdminContext';

const NAV = [
  { to: 'analytics',  label: 'Analytics',  Icon: BarChart2 },
  { to: 'inquiries',  label: 'Inquiries',  Icon: MessageSquare },
  { to: 'bookings',   label: 'Bookings',   Icon: Ticket },
  { to: 'fares',      label: 'Fares',      Icon: Ticket },
  { to: 'content',    label: 'Content',    Icon: Settings },
  { to: 'settings',   label: 'Settings',   Icon: ShieldCheck },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const raw = localStorage.getItem('adminInfo');
  let adminInfo = null;
  try {
    adminInfo = raw ? JSON.parse(raw) : null;
  } catch {
    adminInfo = null;
  }

  useEffect(() => {
    if (!adminInfo?.token) {
      navigate('/login');
    }
  }, [adminInfo, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/login');
  };

  return (
    <AdminContext.Provider value={{ adminInfo }}>
      <div className="min-h-screen bg-gray-900 flex text-white font-sans">
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-16'
          } bg-[#0d1117] border-r border-white/10 flex flex-col transition-all duration-300`}
        >
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            {sidebarOpen && (
              <h2 className="text-lg font-bold flex items-center gap-2 text-yellow-400">
                <LayoutDashboard className="h-5 w-5" /> Admin Panel
              </h2>
            )}
            <button
              onClick={() => setSidebarOpen((o) => !o)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {NAV.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-xl transition-colors text-sm font-medium ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && <span>{label}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="p-3 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </AdminContext.Provider>
  );
}
