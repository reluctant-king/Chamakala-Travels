import { createContext, useContext } from 'react';

// Shared context so every admin sub-page can read adminInfo without prop-drilling
export const AdminContext = createContext(null);

export function useAdmin() {
  return useContext(AdminContext);
}
