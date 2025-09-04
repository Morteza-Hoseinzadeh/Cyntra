// providers/AuthProvider.tsx
import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../hooks/axiosInstance';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../contexts/AuthContext';
import { getToken, clearAuthData } from '../functions/auth/service';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);

      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }

      let token = getToken();
      let storedUserData = localStorage.getItem('authentication-data');

      // ✅ If no localstorage -> call init to generate new token + user_id
      if (!token || !storedUserData) {
        const initRes = await axiosInstance.post('/api/auth/provider/init');
        if (initRes.data?.token && initRes.data?.user_id) {
          localStorage.setItem(
            'authentication-data',
            JSON.stringify({
              token: initRes.data.token,
              user_id: initRes.data.user_id,
            })
          );
          token = initRes.data.token;
          storedUserData = localStorage.getItem('authentication-data');
        }
      }

      const authentication_data = storedUserData ? JSON.parse(storedUserData)?.user_id : null;

      if (!authentication_data || !token) {
        setUser(null);
        setLoading(false);
        return;
      }

      // ✅ Verify token + get user
      const response = await axiosInstance.get(`/api/auth/provider/user/${authentication_data}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        validateStatus: (status: number) => status < 500,
      });

      if (response.status === 401 || response.status === 403) {
        clearAuthData();
        setUser(null);
        return;
      }

      setUser(response.data.user);
    } catch (error) {
      console.error('Error checking user:', error);
      clearAuthData();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <AuthContext.Provider value={{ user, loading, refetch: fetchUser }}>{children}</AuthContext.Provider>;
};
