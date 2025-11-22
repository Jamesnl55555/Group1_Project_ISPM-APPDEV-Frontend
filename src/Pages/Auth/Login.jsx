import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from '@/api/axios';
import TextInput from '../../Components/TextInput';
import InputLabel from '../../Components/InputLabel';
import InputError from '../../Components/InputError';
import PrimaryButton from '../../Components/PrimaryButton';
import Checkbox from '../../Components/Checkbox';

export default function Login() {
    const [data, setData] = useState({ email: '', password: '', remember: false });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [canResetPassword] = useState(true);

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post('/login', data);

            if (response.data?.token) {
                localStorage.setItem('auth_token', response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
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

    return (
        <div
            style={{
                backgroundImage: "url('/images/1.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Poppins, sans-serif',
                flexDirection: 'column',
                padding: '2rem',
            }}
        >
            {/* Container */}
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
                {/* Logo (single as requested) */}
                <img
                    src="/images/2.png"
                    alt="Logo"
                    style={{
                        width: '50rem',
                        height: '12rem',
                        objectFit: 'contain',
                        zIndex: 2,
                        marginBottom: '-90px',
                    }}
                />

                {/* Login Box */}
                <div
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                        padding: '3rem 2rem 2rem 2rem',
                        width: '100%',
                        zIndex: 1,
                        textAlign: 'left',
                    }}
                >
                    <h2
                        style={{
                            fontWeight: '700',
                            color: '#000',
                            fontSize: '1.4rem',
                            letterSpacing: '0.5px',
                            marginBottom: '2rem',
                            marginTop: '3rem',
                            textAlign: 'center',
                        }}
                    >
                        LOG IN
                    </h2>

                    <form onSubmit={submit}>
                        {/* EMAIL */}
                        <div>
                            <InputLabel htmlFor="email" value="Username" style={{ fontWeight: '500' }} />

                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                style={{
                                    marginTop: '0.25rem',
                                    width: '100%',
                                    borderRadius: '6px',
                                    border: '1px solid #D1D5DB',
                                    padding: '0.5rem',
                                    backgroundColor: data.email ? '#fff4e5ff' : '#ffffff',
                                    transition: 'all 0.2s',
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#563d28';
                                    e.target.style.backgroundColor = '#fff4e5ff';
                                }}
                                onBlur={(e) => {
                                    e.target.style.backgroundColor = data.email ? '#fff4e5ff' : '#ffffff';
                                    e.target.style.borderColor = '#D1D5DB';
                                }}
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* PASSWORD */}
                        <div style={{ marginTop: '1rem' }}>
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                style={{
                                    marginTop: '0.25rem',
                                    width: '100%',
                                    borderRadius: '6px',
                                    border: '1px solid #D1D5DB',
                                    padding: '0.5rem',
                                    backgroundColor: data.password ? '#fff4e5ff' : '#ffffff',
                                    transition: 'all 0.2s',
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#563d28';
                                    e.target.style.backgroundColor = '#fff4e5ff';
                                }}
                                onBlur={(e) => {
                                    e.target.style.backgroundColor = data.password ? '#fff4e5ff' : '#ffffff';
                                    e.target.style.borderColor = '#D1D5DB';
                                }}
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* REMEMBER + FORGOT */}
                        <div
                            style={{
                                marginTop: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontSize: '0.875rem',
                                color: '#4B5563',
                            }}
                        >
                            <label style={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox
                                    checked={data.remember}
                                    onChange={(e) => setData({ ...data, remember: e.target.checked })}
                                    style={{ marginRight: '0.5rem' }}
                                />
                                Remember Me
                            </label>

                            {canResetPassword && (
                                <Link to="/forgot-password" style={{ color: '#2563EB', textDecoration: 'underline' }}>
                                    Forgot Password?
                                </Link>
                            )}
                        </div>

                        {/* LOGIN BUTTON */}
                        <div
                            style={{
                                marginTop: '1.5rem',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <PrimaryButton
                                disabled={loading}
                                type="submit"
                                style={{
                                    width: '120px',
                                    backgroundColor: '#563d28',
                                    color: '#fff',
                                    fontWeight: '600',
                                    fontSize: '1rem',
                                    borderRadius: '6px',
                                    padding: '0.6rem',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#3e2c1a';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#563d28';
                                }}
                            >
                                LOG IN
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
