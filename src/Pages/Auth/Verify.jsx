import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/api/axios';

export default function Verify() {
  const [status, setStatus] = useState('Verifying...');
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');

    if (!token) {
      setStatus('Invalid verification link.');
      return;
    }

    axios
      .get(`/api/register/confirm?token=${token}`)
      .then((res) => {
        localStorage.setItem('auth_token', res.data.token);
        setStatus('Registration complete! Redirecting to dashboard...');
        setTimeout(() => navigate('/dashboard'), 1500);
      })
      .catch(() => {
        setStatus('Invalid or expired verification link.');
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'Poppins, sans-serif' }}>
      <h1>{status}</h1>
    </div>
  );
}
