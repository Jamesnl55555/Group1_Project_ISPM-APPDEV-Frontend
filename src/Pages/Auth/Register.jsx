import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
  setData(prev => ({ ...prev, [field]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

  try {
    await axiosInstance.get(import.meta.env.VITE_SANCTUM_CSRF_COOKIE);
    console.log('Sending registration data:', data); // Debug log
    const response = await axios.post('/api/register', data);
    
    console.log('Registration response:', response.data); // Debug log
    
    // Store token if returned
    if (response.data?.token) {
      localStorage.setItem('auth_token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    
    navigate('/dashboard');
  } catch (err) {
    console.error('Registration error:', err.response?.data || err.message); // Debug log
    if (err.response?.data?.errors) {
      setErrors(err.response.data.errors);
    } else {
      setErrors({ general: err.response?.data?.message || 'Something went wrong' });
    }
  } finally {
    setLoading(false);
  }
  };

  const getBackgroundColor = (value) => (value ? '#f5e0c3' : '#ffffff');

  const createInputHandlers = (field) => ({
    onFocus: (e) => {
      e.target.style.borderColor = '#563d28';
      e.target.style.backgroundColor = '#f5e0c3';
    },
    onBlur: (e) => {
      e.target.style.backgroundColor = getBackgroundColor(data[field]);
      e.target.style.borderColor = '#D1D5DB';
    },
    onMouseEnter: (e) => {
      if (document.activeElement !== e.target) {
        e.target.style.borderColor = '#563d28';
        e.target.style.backgroundColor = '#f5e0c3';
      }
    },
    onMouseLeave: (e) => {
      if (document.activeElement !== e.target) {
        e.target.style.backgroundColor = getBackgroundColor(data[field]);
        e.target.style.borderColor = '#D1D5DB';
      }
    },
  });

  return (
    <>
      {/* Autofill override styles */}
      <style>{`
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #fff4e5ff inset !important;
          -webkit-text-fill-color: #000 !important;
          transition: background-color 5000s ease-in-out 0s;
        }
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #fff4e5ff inset !important;
        }
      `}</style>

      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: 'url("/images/1.png")' }}
      >
        <header title="Register" />

        {/* Logo */}
        <div className="absolute top-6 left-8">
          <img
            src="/images/2.png"
            alt="888 Chocolates & More Logo"
            className="drop-shadow-lg"
            style={{ width: '200px' }}
          />
        </div>

        {/* Form Card */}
        <div
          className="bg-white bg-opacity-95 p-8 rounded-2xl shadow-lg w-full max-w-md text-center"
          style={{ marginTop: '3rem' }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">SIGN UP</h2>

          <form onSubmit={submit}>
            {/* Name */}
            <div className="text-left">
              <InputLabel htmlFor="name" value="Username" />
              <TextInput
                id="name"
                name="name"
                value={data.name || ''}
                className="mt-1 block w-full rounded-md border border-gray-300 transition-colors"
                autoComplete="name"
                isFocused={true}
                onChange={(e) => setDataField('name', e.target.value)}
                required
                {...createInputHandlers('name')}
                style={{
                  backgroundColor: getBackgroundColor(data.name),
                }}
              />
              <InputError message={errors.name} className="mt-2" />
            </div>

            {/* Email */}
            <div className="mt-4 text-left">
              <InputLabel htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email || ''}
                className="mt-1 block w-full rounded-md border border-gray-300 transition-colors"
                autoComplete="username"
                onChange={(e) => setDataField('email', e.target.value)}
                required
                {...createInputHandlers('email')}
                style={{
                  backgroundColor: getBackgroundColor(data.email),
                }}
              />
              <InputError message={errors.email} className="mt-2" />
            </div>

            {/* Password */}
            <div className="mt-4 text-left">
              <InputLabel htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password || ''}
                className="mt-1 block w-full rounded-md border border-gray-300 transition-colors"
                autoComplete="new-password"
                onChange={(e) => setDataField('password', e.target.value)}
                required
                {...createInputHandlers('password')}
                style={{
                  backgroundColor: getBackgroundColor(data.password),
                }}
              />
              <InputError message={errors.password} className="mt-2" />
            </div>

            {/* Confirm Password */}
            <div className="mt-4 text-left">
              <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
              <TextInput
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation || ''}
                className="mt-1 block w-full rounded-md border border-gray-300 transition-colors"
                autoComplete="new-password"
                onChange={(e) => setDataField('password_confirmation', e.target.value)}
                required
                {...createInputHandlers('password_confirmation')}
                style={{
                  backgroundColor: getBackgroundColor(data.password_confirmation),
                }}
              />
              <InputError message={errors.password_confirmation} className="mt-2" />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <PrimaryButton
                className="py-2 rounded-md flex justify-center items-center text-white font-semibold text-base"
                disabled={loading}
                style={{
                  fontSize: '15px',
                  width: '120px',
                  backgroundColor: '#422912ff',
                  transition: 'background 0.3s',
                  cursor: loading ? 'not-allowed' : 'pointer',
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
            <p className="text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <Link
                to ="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
