import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '@/api/axios';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setData({ ...data, [field]: e.target.value });

  const setDataField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post('/api/register', data);

      if (response.data?.token) {
        localStorage.setItem('auth_token', response.data.token);
      }

      navigate('/dashboard');
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: err.response?.data?.message || 'Something went wrong' });
      }
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundColor = (value) => (value ? '#fff4e5ff' : '#ffffff');

  const createInputHandlers = (field) => ({
    onFocus: (e) => {
      e.target.style.borderColor = '#563d28';
      e.target.style.backgroundColor = '#fff4e5ff';
    },
    onBlur: (e) => {
      e.target.style.borderColor = '#D1D5DB';
      e.target.style.backgroundColor = getBackgroundColor(data[field]);
    },
    onMouseEnter: (e) => {
      if (document.activeElement !== e.target) {
        e.target.style.borderColor = '#563d28';
        e.target.style.backgroundColor = '#fff4e5ff';
      }
    },
    onMouseLeave: (e) => {
      if (document.activeElement !== e.target) {
        e.target.style.borderColor = '#D1D5DB';
        e.target.style.backgroundColor = getBackgroundColor(data[field]);
      }
    },
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("/images/1.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {/* Logo */}
      <img
        src="/images/2.png"
        alt="Logo"
        style={{
          width: '200px',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
        }}
      />

      {/* Form Card */}
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          padding: '2rem',
          borderRadius: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#000',
          }}
        >
          SIGN UP
        </h2>

        {errors.general && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>{errors.general}</div>
        )}

        <form onSubmit={submit}>
          {/* Name */}
          <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <InputLabel htmlFor="name" value="Username" />
            <TextInput
              id="name"
              name="name"
              value={data.name || ''}
              autoComplete="name"
              onChange={(e) => setDataField('name', e.target.value)}
              required
              {...createInputHandlers('name')}
              style={{
                marginTop: '0.25rem',
                width: '100%',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                padding: '0.5rem',
                backgroundColor: getBackgroundColor(data.name),
                transition: 'all 0.2s',
              }}
            />
            <InputError message={errors.name} />
          </div>

          {/* Email */}
          <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email || ''}
              autoComplete="username"
              onChange={(e) => setDataField('email', e.target.value)}
              required
              {...createInputHandlers('email')}
              style={{
                marginTop: '0.25rem',
                width: '100%',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                padding: '0.5rem',
                backgroundColor: getBackgroundColor(data.email),
                transition: 'all 0.2s',
              }}
            />
            <InputError message={errors.email} />
          </div>

          {/* Password */}
          <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <InputLabel htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password || ''}
              autoComplete="new-password"
              onChange={(e) => setDataField('password', e.target.value)}
              required
              {...createInputHandlers('password')}
              style={{
                marginTop: '0.25rem',
                width: '100%',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                padding: '0.5rem',
                backgroundColor: getBackgroundColor(data.password),
                transition: 'all 0.2s',
              }}
            />
            <InputError message={errors.password} />
          </div>

          {/* Confirm Password */}
          <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
            <TextInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={data.password_confirmation || ''}
              autoComplete="new-password"
              onChange={(e) => setDataField('password_confirmation', e.target.value)}
              required
              {...createInputHandlers('password_confirmation')}
              style={{
                marginTop: '0.25rem',
                width: '100%',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                padding: '0.5rem',
                backgroundColor: getBackgroundColor(data.password_confirmation),
                transition: 'all 0.2s',
              }}
            />
            <InputError message={errors.password_confirmation} />
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <PrimaryButton
              type="submit"
              disabled={loading}
              style={{
                width: '120px',
                backgroundColor: '#422912ff',
                color: '#fff',
                fontWeight: '600',
                fontSize: '1rem',
                borderRadius: '6px',
                padding: '0.6rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#2e1e0fff';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#422912ff';
              }}
            >
              SIGN UP
            </PrimaryButton>
          </div>

          {/* Sign In Link */}
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#4B5563' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#2563EB', fontWeight: '500', textDecoration: 'underline' }}>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
