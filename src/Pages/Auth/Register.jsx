import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '@/api/axios';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const setDataField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post('/api/register-pending', data);
      if (response.data.success) setShowModal(true);
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

  const getBackgroundColor = (field) =>
    errors[field] ? '#ffe5e5' : data[field] ? '#fff4e5ff' : '#ffffff';

  const inputHandlers = (field) => ({
    onFocus: (e) => {
      e.target.style.borderColor = '#563d28';
      e.target.style.backgroundColor = '#fff4e5ff';
    },
    onBlur: (e) => {
      e.target.style.borderColor = errors[field] ? 'red' : '#D1D5DB';
      e.target.style.backgroundColor = getBackgroundColor(field);
      e.target.style.color = errors[field] ? 'red' : '#111827';
    },
    onMouseEnter: (e) => {
      if (document.activeElement !== e.target) {
        e.target.style.borderColor = '#563d28';
        e.target.style.backgroundColor = '#fff4e5ff';
      }
    },
    onMouseLeave: (e) => {
      if (document.activeElement !== e.target) {
        e.target.style.borderColor = errors[field] ? 'red' : '#D1D5DB';
        e.target.style.backgroundColor = getBackgroundColor(field);
      }
    },
  });

  return (
    <div
      style={{
        minHeight: '95vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("/images/1.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Poppins, sans-serif',
        padding: '1rem',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        {/* Logo */}
        <img
          src="/images/2.png"
          alt="Logo"
          style={{
            width: '70%',
            height: 'auto',
            objectFit: 'contain',
            marginBottom: '-41rem',
            zIndex: 2,
          }}
        />

        {/* Card */}
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            maxHeight: 'auto',
            marginTop: '35rem',
            backgroundColor: 'rgba(255,255,255,0.98)',
            borderRadius: '12px',
            boxShadow: '4px 8px 10px rgba(34,34,34,0.6)',
            padding: '3rem 2rem 2rem 2rem',
            textAlign: 'left',
          }}
        >
          <h2
            style={{
              fontWeight: '700',
              color: '#000',
              fontSize: '1.8rem',
              letterSpacing: '0.5px',
              marginBottom: '2rem',
              marginTop: '4rem',
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0,0,0,0.25)',
            }}
          >
            SIGN UP
          </h2>

          {errors.general && (
            <div style={{ color: 'red', marginBottom: '1rem' }}>{errors.general}</div>
          )}

          <form onSubmit={submit}>
            {/* Username */}
            <div style={{ marginBottom: '1rem' }}>
              <InputLabel htmlFor="name" value="Username" />
              <TextInput
                id="name"
                name="name"
                value={data.name}
                onChange={(e) => setDataField('name', e.target.value)}
                {...inputHandlers('name')}
                style={{
                  marginTop: '0.25rem',
                  width: '95%',
                  borderRadius: '6px',
                  border: `1px solid ${errors.name ? 'red' : '#D1D5DB'}`,
                  padding: '0.5rem',
                  backgroundColor: getBackgroundColor('name'),
                  transition: 'all 0.2s',
                }}
              />
              <InputError message={errors.name} />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '1rem' }}>
              <InputLabel htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setDataField('email', e.target.value)}
                {...inputHandlers('email')}
                style={{
                  marginTop: '0.25rem',
                  width: '95%',
                  borderRadius: '6px',
                  border: `1px solid ${errors.email ? 'red' : '#D1D5DB'}`,
                  padding: '0.5rem',
                  backgroundColor: getBackgroundColor('email'),
                  transition: 'all 0.2s',
                }}
              />
              <InputError message={errors.email} />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1rem' }}>
              <InputLabel htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                onChange={(e) => setDataField('password', e.target.value)}
                {...inputHandlers('password')}
                style={{
                  marginTop: '0.25rem',
                  width: '95%',
                  borderRadius: '6px',
                  border: `1px solid ${errors.password ? 'red' : '#D1D5DB'}`,
                  padding: '0.5rem',
                  backgroundColor: getBackgroundColor('password'),
                  transition: 'all 0.2s',
                }}
              />
              <InputError message={errors.password} />
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '1rem' }}>
              <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
              <TextInput
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                onChange={(e) => setDataField('password_confirmation', e.target.value)}
                {...inputHandlers('password_confirmation')}
                style={{
                  marginTop: '0.25rem',
                  width: '95%',
                  borderRadius: '6px',
                  border: `1px solid ${
                    errors.password_confirmation ? 'red' : '#D1D5DB'
                  }`,
                  padding: '0.5rem',
                  backgroundColor: getBackgroundColor('password_confirmation'),
                  transition: 'all 0.2s',
                }}
              />
              <InputError message={errors.password_confirmation} />
            </div>

            {/* Remember Me */}
            <div
              style={{
                marginTop: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                color: 'gray',
                fontSize: '0.6rem',
              }}
            >
              <input
                type="checkbox"
                checked={data.remember}
                onChange={(e) => setDataField('remember', e.target.checked)}
                style={{ accentColor: '#fff', cursor: 'pointer' }}
              />
              <label style={{ marginLeft: '0.25rem' }}>Remember Me</label>
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: 'center', marginTop: '2rem', display: "flex", justifyContent: "center" }}>
              <PrimaryButton
                type="submit"
                disabled={loading}
                style={{
                  width: '120px',
                  padding: '0.6rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: '#fff',
                  background: 'linear-gradient(to bottom, #4a2f26, #2f1c14)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                  transition: '0.3s',
                }}
                onMouseEnter={(e) => {
                  if (!loading)
                    e.currentTarget.style.background = 'linear-gradient(to bottom, #3e2b1c, #2e1c0f)';
                }}
                onMouseLeave={(e) => {
                  if (!loading)
                    e.currentTarget.style.background = 'linear-gradient(to bottom, #4a2f26, #2f1c14)';
                }}
              >
                SIGN UP
              </PrimaryButton>
            </div>

            {/* Log In Link */}
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#4B5563', textAlign: 'center' }}>
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
              We sent a verification link to your email. Please check your inbox to complete registration.
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