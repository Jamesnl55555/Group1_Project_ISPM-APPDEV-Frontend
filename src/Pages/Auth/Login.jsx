import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '@/Components/TextInput';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert(`Email: ${email}\nPassword: ${password}\nRemember: ${remember}`);
    setPassword('');
    setErrors({});
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = '#563d28';
    e.target.style.backgroundColor = '#fff4e5ff';
  };

  const handleBlur = (e, value, hasError) => {
    e.target.style.borderColor = hasError ? 'red' : '#D1D5DB';
    e.target.style.backgroundColor = hasError
      ? '#ffe5e5'
      : value
      ? '#fff4e5ff'
      : '#ffffff';
    e.target.style.color = hasError ? 'red' : '#111827';
  };

  const handleHover = (e) => {
    e.target.style.borderColor = '#563d28';
    e.target.style.backgroundColor = '#fff4e5ff';
  };

  const handleHoverLeave = (e, value, hasError) => {
    e.target.style.borderColor = hasError ? 'red' : '#D1D5DB';
    e.target.style.backgroundColor = hasError
      ? '#ffe5e5'
      : value
      ? '#fff4e5ff'
      : '#ffffff';
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
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: "url('/images/1.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Poppins, sans-serif',
        padding: '2rem',
        position: 'relative',
      }}
    >
      {/* Logo top-left */}
      <img
        src="/images/2.png"
        alt="Logo"
        style={{
          width: '12rem',
          position: 'absolute',
          top: '1rem',
          left: '1rem',
        }}
      />

      {/* Form container */}
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
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
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '2rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.25)',
          }}
        >
          LOG IN
        </h2>

        <form onSubmit={submit}>
          {/* Email */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ fontWeight: 550, color: '#3b3b3b' }}>
              E-mail
            </label>
            <TextInput
              id="email"
              type="email"
              value={email}
              placeholder="E-mail"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: '' }));
              }}
              onFocus={handleFocus}
              onBlur={(e) => handleBlur(e, email, !!errors.email)}
              onMouseEnter={handleHover}
              onMouseLeave={(e) => handleHoverLeave(e, email, !!errors.email)}
              style={inputStyle(email, !!errors.email)}
            />
            {errors.email && (
              <span style={{ color: 'red', fontSize: '0.75rem', marginLeft: '.6rem' }}>
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" style={{ fontWeight: 550, color: '#3b3b3b' }}>
              Password
            </label>
            <TextInput
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: '' }));
              }}
              onFocus={handleFocus}
              onBlur={(e) => handleBlur(e, password, !!errors.password)}
              onMouseEnter={handleHover}
              onMouseLeave={(e) => handleHoverLeave(e, password, !!errors.password)}
              style={inputStyle(password, !!errors.password)}
            />
            {errors.password && (
              <span style={{ color: 'red', fontSize: '0.75rem' }}>
                {errors.password}
              </span>
            )}
          </div>

          {/* Remember Me */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.6rem',
              color: 'gray',
              marginBottom: '1.5rem',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={{ accentColor: '#fff', cursor: 'pointer' }}
              />
              Remember Me
            </label>
            <Link to="/forgotpassword" style={{ color: '#000', fontWeight: 750, textDecoration: 'none' }}>
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              style={{
                width: '120px',
                padding: '0.6rem',
                fontWeight: 600,
                fontSize: '1rem',
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
              SIGN IN
            </button>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#4B5563', textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#2563EB', fontWeight: '500', textDecoration: 'underline' }}>
            Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
