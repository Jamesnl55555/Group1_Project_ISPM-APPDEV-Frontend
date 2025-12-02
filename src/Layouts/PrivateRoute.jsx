import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../api/axios';

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Make request to /api/user to see if session exists
        const response = await axios.get('/api/user', { withCredentials: true });

        if (response.status === 200 && response.data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
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
