import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '@/api/axios';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { IconUser, IconMail, IconLock } from "@tabler/icons-react";

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

  const iconForField = (field) => {
    switch (field) {
      case "name":
        return <IconUser size={18} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: errors[field] ? 'red' : '#555' }} />;
      case "email":
        return <IconMail size={18} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: errors[field] ? 'red' : '#555' }} />;
      case "password":
      case "password_confirmation":
        return <IconLock size={18} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: errors[field] ? 'red' : '#555' }} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("/images/1.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Poppins, sans-serif',
        padding: '2rem',
        position: 'relative',
      }}
    >
      <img
        src="/images/2.png"
        alt="Logo"
        style={{
          width: '12rem',
          height: 'auto',
          position: 'absolute',
          top: '1rem',
          left: '1rem',
        }}
      />

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
            fontSize: '2rem',
            fontWeight: '700',
            marginTop: '-.5rem',
            marginBottom: '1.5rem',
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
          {['name', 'email', 'password', 'password_confirmation'].map((field) => {
            const isPassword = field === 'password';
            const isConfirm = field === 'password_confirmation';
            const labelText =
              field === 'name'
                ? 'Username'
                : field === 'password_confirmation'
                ? 'Confirm Password'
                : field.charAt(0).toUpperCase() + field.slice(1);

            return (
              <div key={field} style={{ marginBottom: '1rem', position: 'relative' }}>
                <InputLabel htmlFor={field} value={labelText} />

                <div style={{ position: 'relative', width: "100%" }}>
                  {iconForField(field)}

                  <TextInput
                    id={field}
                    type={isPassword || isConfirm ? 'password' : 'text'}
                    value={data[field]}
                    onChange={(e) => setDataField(field, e.target.value)}
                    {...inputHandlers(field)}
                    style={{
                      width: '100%',
                      paddingLeft: '2rem',
                      paddingRight: isPassword || isConfirm ? '2.5rem' : '0.5rem',
                      borderRadius: '4px',
                      border: `1px solid ${errors[field] ? 'red' : '#D1D5DB'}`,
                      backgroundColor: getBackgroundColor(field),
                      color: errors[field] ? 'red' : '#111827',
                      transition: 'all 0.2s',
                    }}
                  />
                  <InputError message={errors[field]} />
                </div>
              </div>
            );
          })}

          {/* Remember Me */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: 'gray' }}>
            <input
              type="checkbox"
              checked={data.remember}
              onChange={(e) => setDataField('remember', e.target.checked)}
              style={{ accentColor: '#ffffffff', cursor: 'pointer' }}
            />
            <label
              style={{
                marginLeft: '0.25rem',
                fontSize: '0.6rem',
                fontWeight: 700,
                color: '#8d8d8dff',
              }}
            >
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <PrimaryButton
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                maxWidth: '150px',
                padding: '0.6rem',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#fff',
                background: 'linear-gradient(to bottom, #4a2f26, #2f1c14)',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background 0.3s',
                boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
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
          <p
            style={{
              marginTop: '1rem',
              fontSize: '0.7rem',
              color: '#919cafff',
              textAlign: 'center',
            }}
          >
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
