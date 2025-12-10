import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '@/Components/TextInput';

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

  const setDataField = (field, value) => setData((prev) => ({ ...prev, [field]: value }));

  const submit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!data.name) newErrors.name = 'Username is required';
    if (!data.email) newErrors.email = 'Email is required';
    if (!data.password) newErrors.password = 'Password is required';
    if (data.password !== data.password_confirmation)
      newErrors.password_confirmation = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert(`Registered successfully!\nUsername: ${data.name}\nEmail: ${data.email}\nRemember Me: ${data.remember ? 'Yes' : 'No'}`);
    setData({ name: '', email: '', password: '', password_confirmation: '', remember: false });
    setErrors({});
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = '#563d28';
    e.target.style.backgroundColor = '#fff4e5ff';
  };

  const handleBlur = (e, value, hasError) => {
    e.target.style.borderColor = hasError ? 'red' : '#D1D5DB';
    e.target.style.backgroundColor = hasError ? '#ffe5e5' : value ? '#fff4e5ff' : '#ffffff';
    e.target.style.color = hasError ? 'red' : '#111827';
  };

  const handleHover = (e) => {
    e.target.style.borderColor = '#563d28';
    e.target.style.backgroundColor = '#fff4e5ff';
  };

  const handleHoverLeave = (e, value, hasError) => {
    e.target.style.borderColor = hasError ? 'red' : '#D1D5DB';
    e.target.style.backgroundColor = hasError ? '#ffe5e5' : value ? '#fff4e5ff' : '#ffffff';
  };

  const inputStyle = (value, hasError) => ({
    marginTop: '0.25rem',
    width: '100%',
    borderRadius: '6px',
    border: `1px solid ${hasError ? 'red' : '#D1D5DB'}`,
    padding: '0.5rem',
    backgroundColor: hasError ? '#ffe5e5' : value ? '#fff4e5ff' : '#ffffff',
    color: hasError ? 'red' : '#111827',
    transition: 'all 0.2s',
  });

  return (
    <div
      style={{
        minHeight: '95vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: "url('/images/1.png')",
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
        <img
          src="/images/2.png"
          alt="Logo"
          style={{
            width: '70%',
            height: 'auto',
            objectFit: 'contain',
            marginBottom: '-3rem',
            zIndex: 2,
          }}
        />

        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            maxHeight: '500px',
            marginTop: '3rem',
            backgroundColor: 'rgba(255,255,255,0.98)',
            borderRadius: '12px',
            boxShadow: '4px 8px 10px rgba(34, 34, 34, 0.6)',
            padding: '3rem 2rem 2rem 2rem',
            textAlign: 'left',
          }}
        >
          <h2
            style={{
              fontWeight: '700',
              color: '#000',
              fontSize: '2rem',
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0,0,0,0.25)',
              marginBottom: '1.5rem',
            }}
          >
            SIGN UP
          </h2>

          <form onSubmit={submit}>
            {/* Username */}
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="name" style={{ fontWeight: 550, color: '#3b3b3b' }}>Username</label>
              <TextInput
                id="name"
                value={data.name}
                placeholder="Username"
                onChange={(e) => setDataField('name', e.target.value)}
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, data.name, !!errors.name)}
                onMouseEnter={handleHover}
                onMouseLeave={(e) => handleHoverLeave(e, data.name, !!errors.name)}
                style={inputStyle(data.name, !!errors.name)}
              />
              {errors.name && <span style={{ color: 'red', fontSize: '0.75rem', marginLeft: '.6rem' }}>{errors.name}</span>}
            </div>

            {/* Email */}
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ fontWeight: 550, color: '#3b3b3b' }}>Email</label>
              <TextInput
                id="email"
                type="email"
                value={data.email}
                placeholder="Email"
                onChange={(e) => setDataField('email', e.target.value)}
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, data.email, !!errors.email)}
                onMouseEnter={handleHover}
                onMouseLeave={(e) => handleHoverLeave(e, data.email, !!errors.email)}
                style={inputStyle(data.email, !!errors.email)}
              />
              {errors.email && <span style={{ color: 'red', fontSize: '0.75rem', marginLeft: '.6rem' }}>{errors.email}</span>}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="password" style={{ fontWeight: 550, color: '#3b3b3b' }}>Password</label>
              <TextInput
                id="password"
                type="password"
                value={data.password}
                placeholder="Password"
                onChange={(e) => setDataField('password', e.target.value)}
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, data.password, !!errors.password)}
                onMouseEnter={handleHover}
                onMouseLeave={(e) => handleHoverLeave(e, data.password, !!errors.password)}
                style={inputStyle(data.password, !!errors.password)}
              />
              {errors.password && <span style={{ color: 'red', fontSize: '0.75rem', marginLeft: '.6rem' }}>{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="password_confirmation" style={{ fontWeight: 550, color: '#3b3b3b' }}>Confirm Password</label>
              <TextInput
                id="password_confirmation"
                type="password"
                value={data.password_confirmation}
                placeholder="Confirm Password"
                onChange={(e) => setDataField('password_confirmation', e.target.value)}
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, data.password_confirmation, !!errors.password_confirmation)}
                onMouseEnter={handleHover}
                onMouseLeave={(e) => handleHoverLeave(e, data.password_confirmation, !!errors.password_confirmation)}
                style={inputStyle(data.password_confirmation, !!errors.password_confirmation)}
              />
              {errors.password_confirmation && <span style={{ color: 'red', fontSize: '0.75rem', marginLeft: '.6rem' }}>{errors.password_confirmation}</span>}
            </div>

            {/* Remember Me */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: 'gray', gap: '0.25rem' }}>
              <input type="checkbox" checked={data.remember} onChange={(e) => setDataField('remember', e.target.checked)} style={{ accentColor: '#fff', cursor: 'pointer' }} />
              <label style={{ fontSize: '0.6rem', fontWeight: 700, color: '#8d8d8d' }}>Remember Me</label>
            </div>

            {/* Submit Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
              <button
                type="submit"
                style={{
                  width: '150px',
                  padding: '0.6rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#fff',
                  background: 'linear-gradient(to bottom, #4a2f26, #2f1c14)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                  transition: '0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'linear-gradient(to bottom, #3e2b1c, #2e1c0f)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'linear-gradient(to bottom, #4a2f26, #2f1c14)')}
              >
                SIGN UP
              </button>
            </div>

            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#4B5563', textAlign: 'center' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#2563EB', fontWeight: '500', textDecoration: 'underline' }}>
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
