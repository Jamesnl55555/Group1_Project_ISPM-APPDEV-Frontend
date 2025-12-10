import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const data = { email, password, remember };
      const response = await axios.post("/api/login", data);

      if (response.data?.token) {
        localStorage.setItem("auth_token", response.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setErrors({ general: "Invalid credentials" });
      } else if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: "Something went wrong" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/1.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '95vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
            marginBottom: '-41rem',
            zIndex: 2,
          }}
        />

        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            maxHeight: '450px',
            marginTop: '35rem',
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
              fontSize: '1.8rem',
              letterSpacing: '0.5px',
              marginBottom: '2rem',
              marginTop: '4rem',
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0,0,0,0.25)',
            }}
          >
            LOG IN
          </h2>

          {errors.general && (
            <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
              {errors.general}
            </p>
          )}

          <form onSubmit={submit}>
            {/* EMAIL */}
            <div>
              <InputLabel htmlFor="email" value="E-mail" />
              <TextInput
                id="email"
                type="email"
                value={email}
                placeholder="E-mail"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: '' }));
                }}
                style={{
                  width: '95%',
                  border: `1px solid ${errors.email ? 'red' : '#D1D5DB'}`,
                  borderRadius: '6px',
                  padding: '0.5rem',
                  transition: 'all 0.2s',
                  backgroundColor: errors.email
                    ? '#ffe5e5'
                    : email
                    ? '#fff4e5ff'
                    : '#ffffff',
                  color: errors.email ? 'red' : '#111827',
                }}
              />
              <InputError message={errors.email} />
            </div>

            {/* PASSWORD */}
            <div style={{ marginTop: '1rem', position: 'relative' }}>
              <InputLabel htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                value={password}
                placeholder="Password"
                showToggle
                show={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: '' }));
                }}
                style={{
                  width: '95%',
                  border: `1px solid ${errors.password ? 'red' : '#D1D5DB'}`,
                  borderRadius: '6px',
                  padding: '0.5rem',
                  paddingRight: '2.5rem',
                  transition: 'all 0.2s',
                  backgroundColor: errors.password
                    ? '#ffe5e5'
                    : password
                    ? '#fff4e5ff'
                    : '#ffffff',
                  color: errors.password ? 'red' : '#111827',
                }}
              />
              <InputError message={errors.password} />
            </div>

            {/* REMEMBER ME */}
            <div
              style={{
                marginTop: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.6rem',
                color: 'gray',
                marginLeft: '1rem',
                marginRight: '1rem',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                <Checkbox
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember Me
              </label>

              <Link
                to="/forgotpassword"
                style={{
                  color: '#000000',
                  fontWeight: 750,
                  textDecoration: 'none',
                }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* SIGN IN BUTTON */}
           <div style={{ textAlign: 'center', marginTop: '2rem' }}>
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
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                transition: '0.3s',
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',      
                textAlign: 'center',       
                lineHeight: 1.2 
                }}
                onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                    'linear-gradient(to bottom, #3e2b1c, #2e1c0f)')
                }
                onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                    'linear-gradient(to bottom, #4a2f26, #2f1c14)')
                }
            >
                {loading ? 'Signing In...' : 'SIGN IN'}
            </PrimaryButton>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
