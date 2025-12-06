import { useState, useEffect } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function PasswordInput({ formData, setFormData, errors = {}, setErrors }) {
  const [localErrors, setLocalErrors] = useState({ password: '', password_confirmation: '' });

  // Handle password change
  const handlePasswordChange = (value) => {
    setFormData('password', value);
    validatePassword(value, formData.password_confirmation);
  };

  // Handle confirm password change
  const handleConfirmChange = (value) => {
    setFormData('password_confirmation', value);
    validatePassword(formData.password, value);
  };

  // Password validation
  const validatePassword = (password, confirm) => {
    let passwordError = '';
    let confirmError = '';

    if (!password) {
      passwordError = '';
    } else if (password.length < 8) {
      passwordError = 'Password must be at least 8 characters.';
    } else if (!/[A-Z]/.test(password)) {
      passwordError = 'Password must contain at least one uppercase letter.';
    } else if (!/[a-z]/.test(password)) {
      passwordError = 'Password must contain at least one lowercase letter.';
    } else if (!/[0-9]/.test(password)) {
      passwordError = 'Password must contain at least one number.';
    } else if (/[^A-Za-z0-9]/.test(password)) {
      passwordError = 'Password cannot contain symbols.';
    }

    if (confirm && password !== confirm) {
      confirmError = 'Passwords do not match.';
    }

    setLocalErrors({ password: passwordError, password_confirmation: confirmError });

    if (setErrors) {
      setErrors((prev) => ({ ...prev, password: passwordError, password_confirmation: confirmError }));
    }
  };

  // Style function
  const inputStyle = (field, value, error) => ({
    width: '100%',
    padding: '0.5rem',
    marginTop: '0.25rem',
    borderRadius: '6px',
    border: `1px solid ${error ? 'red' : '#D1D5DB'}`,
    backgroundColor: error ? '#ffe5e5' : value ? '#fff4e5ff' : '#ffffff',
    color: error ? 'red' : '#111827',
    transition: 'all 0.2s',
  });

  const handleFocus = (e) => {
    e.target.style.borderColor = '#563d28';
    e.target.style.backgroundColor = '#fff4e5ff';
    e.target.placeholder = '';
  };

  const handleBlur = (e, field, placeholder, value, error) => {
    e.target.style.borderColor = error ? 'red' : '#D1D5DB';
    e.target.style.backgroundColor = error ? '#ffe5e5' : value ? '#fff4e5ff' : '#ffffff';
    e.target.style.color = error ? 'red' : '#111827';
    e.target.placeholder = value ? '' : placeholder;
  };

  const handleHover = (e) => {
    e.target.style.borderColor = '#563d28';
    e.target.style.backgroundColor = '#fff4e5ff';
  };

  const handleHoverLeave = (e, field, value, error) => {
    e.target.style.borderColor = error ? 'red' : '#D1D5DB';
    e.target.style.backgroundColor = error ? '#ffe5e5' : value ? '#fff4e5ff' : '#ffffff';
    e.target.style.color = error ? 'red' : '#111827';
  };

  return (
    <>
      {/* Password */}
      <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
        <InputLabel htmlFor="password" value="Password" />
        <input
          id="password"
          type="password"
          value={formData.password || ''}
          placeholder="Password"
          style={inputStyle('password', formData.password, localErrors.password || errors.password)}
          onChange={(e) => handlePasswordChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={(e) => handleBlur(e, 'password', 'Password', formData.password, localErrors.password || errors.password)}
          onMouseEnter={handleHover}
          onMouseLeave={(e) => handleHoverLeave(e, 'password', formData.password, localErrors.password || errors.password)}
        />
        <InputError message={localErrors.password || errors.password} />
      </div>

      {/* Confirm Password */}
      <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
        <input
          id="password_confirmation"
          type="password"
          value={formData.password_confirmation || ''}
          placeholder="Confirm Password"
          style={inputStyle('password_confirmation', formData.password_confirmation, localErrors.password_confirmation || errors.password_confirmation)}
          onChange={(e) => handleConfirmChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={(e) =>
            handleBlur(
              e,
              'password_confirmation',
              'Confirm Password',
              formData.password_confirmation,
              localErrors.password_confirmation || errors.password_confirmation
            )
          }
          onMouseEnter={handleHover}
          onMouseLeave={(e) =>
            handleHoverLeave(
              e,
              'password_confirmation',
              formData.password_confirmation,
              localErrors.password_confirmation || errors.password_confirmation
            )
          }
        />
        <InputError message={localErrors.password_confirmation || errors.password_confirmation} />
      </div>
    </>
  );
}
