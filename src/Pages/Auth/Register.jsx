import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import PasswordInput from '@/Components/PasswordInput';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '@/api/axios';

export default function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const setDataField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post('/api/register-pending', data);

      if (response.data.success) {
        setShowModal(true); // Show verification modal
      }
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
      <img
        src="/images/2.png"
        alt="Logo"
        style={{ width: '200px', marginBottom: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}
      />

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
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#000' }}>
          SIGN UP
        </h2>

        {errors.general && <div style={{ color: 'red', marginBottom: '1rem' }}>{errors.general}</div>}

        <form onSubmit={submit}>
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

          <PasswordInput
            form={{
              data,
              setData: setDataField,
              errors,
              setError: (field, msg) => setErrors((prev) => ({ ...prev, [field]: msg })),
            }}
          />

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

          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#4B5563' }}>
            Already have an account?{' '}
            <Link
              to="/login"
              style={{ color: '#2563EB', fontWeight: '500', textDecoration: 'underline' }}
            >
              Log In
            </Link>
          </p>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              textAlign: 'center',
              width: '90%',
              maxWidth: '380px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Verification Email Sent</h3>

            <p style={{ marginBottom: '1.5rem', color: '#555' }}>
              We sent a verification link to your email. Please check your inbox to complete
              registration.
            </p>

            <PrimaryButton
              onClick={() => setShowModal(false)}
              style={{
                padding: '0.6rem 1.2rem',
                borderRadius: '6px',
                background: '#422912',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Close
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}
