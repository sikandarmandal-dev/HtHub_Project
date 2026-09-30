import { createContext, useContext, useEffect, useState } from 'react';
import api, { dataOf } from '../services/api';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('token')) { setReady(true); return; }
    api.get('/auth/me').then((r) => setUser(dataOf(r).user)).catch(() => localStorage.removeItem('token')).finally(() => setReady(true));
  }, []);
  const login = async (credentials) => { const r = await api.post('/auth/login', credentials); localStorage.setItem('token', dataOf(r).token); setUser(dataOf(r).user); return dataOf(r).user; };
  const register = async (details) => { const r = await api.post('/auth/register', details); localStorage.setItem('token', dataOf(r).token); setUser(dataOf(r).user); return dataOf(r).user; };
  const logout = () => { localStorage.removeItem('token'); setUser(null); };
  return <AuthContext.Provider value={{ user, ready, login, register, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
