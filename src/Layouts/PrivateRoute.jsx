import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../api/axios';
import Loading from '@/Pages/Loading';

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const localToken = localStorage.getItem('auth_token');
        if (!localToken) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

      try {
        const response = await axios.get('/api/user', { withCredentials: true });

        if (response.status === 200 && response.data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
        localStorage.removeItem('auth_token'); 
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
