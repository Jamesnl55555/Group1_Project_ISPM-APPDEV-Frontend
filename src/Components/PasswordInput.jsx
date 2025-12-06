import { useState, useEffect } from 'react';

export default function PasswordInput({ formData, setFormData, errors, setErrors }) {
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const validatePassword = (password, confirm) => {
    let passError = '';
    let confError = '';

    // Check for minimum length
    if (password.length < 8) {
      passError = 'Password must be at least 8 characters.';
    }
    // Must include uppercase, lowercase, number
    else if (!/(?=.*[a-z])/.test(password)) {
      passError = 'Password must contain at least one lowercase letter.';
    } else if (!/(?=.*[A-Z])/.test(password)) {
      passError = 'Password must contain at least one uppercase letter.';
    } else if (!/(?=.*[0-9])/.test(password)) {
      passError = 'Password must contain at least one number.';
    }
    // Forbid symbols
    else if (/[^a-zA-Z0-9]/.test(password)) {
      passError = 'Password cannot contain symbols.';
    }

    // Confirm password match
    if (confirm && password !== confirm) {
      confError = 'Passwords do not match.';
    }

    setPasswordError(passError);
    setConfirmError(confError);

    setErrors((prev) => ({
      ...prev,
      password: passError || undefined,
      password_confirmation: confError || undefined,
    }));
  };

  const handlePasswordChange = (value) => {
    setFormData('password', value);
    validatePassword(value, formData?.password_confirmation || '');
  };

  const handleConfirmChange = (value) => {
    setFormData('password_confirmation', value);
    validatePassword(formData?.password || '', value);
  };

  // Initialize validation on mount in case values are pre-filled
  useEffect(() => {
    validatePassword(formData?.password || '', formData?.password_confirmation || '');
  }, []);

  const inputStyle = (error, value) => ({
    width: '100%',
    padding: '0.5rem',
    marginTop: '0.25rem',
    borderRadius: '6px',
    border: `1px solid ${error ? 'red' : '#D1D5DB'}`,
    backgroundColor: error ? '#ffe5e5' : value ? '#fff4e5ff' : '#ffffff',
    color: error ? 'red' : '#111827',
    transition: 'all 0.2s',
  });

  return (
    <div>
      {/* PASSWORD */}
      <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
        <label htmlFor="password" style={{ fontWeight: '550', color: '#3b3b3bff' }}>
          Password
        </label>
        <input
          id="password"
          type="password"
          value={formData?.password || ''}
          placeholder="Password"
          style={inputStyle(passwordError, formData?.password)}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        {passwordError && (
          <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {passwordError}
          </div>
        )}
      </div>

      {/* CONFIRM PASSWORD */}
      <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
        <label htmlFor="password_confirmation" style={{ fontWeight: '550', color: '#3b3b3bff' }}>
          Confirm Password
        </label>
        <input
          id="password_confirmation"
          type="password"
          value={formData?.password_confirmation || ''}
          placeholder="Confirm Password"
          style={inputStyle(confirmError, formData?.password_confirmation)}
          onChange={(e) => handleConfirmChange(e.target.value)}
        />
        {confirmError && (
          <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {confirmError}
          </div>
        )}
      </div>
    </div>
  );
}
