import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../api/axios';

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await axios.get('/api/user');
        if (response.status === 200) {
          setIsAuthenticated(true);
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

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
