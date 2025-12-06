import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '@/api/axios';
import { useForm } from '@/hooks/useForm';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const [urlData, setUrlData] = useState({ token: '', email: '' });
    const [apiErrors, setApiErrors] = useState({});

    // Password requirement flags
    const [passwordRules, setPasswordRules] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        noSymbol: true,
    });

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token') || '';
        const emailFromUrl = searchParams.get('email') || '';
        setUrlData({ token: tokenFromUrl, email: emailFromUrl });
    }, [searchParams]);

    const form = useForm({
        token: urlData.token,
        email: urlData.email,
        password: '',
        password_confirmation: '',
    });

    // Validate password live
    const handlePasswordChange = (password) => {
        form.setData('password', password);

        setPasswordRules({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            noSymbol: /^[A-Za-z0-9]*$/.test(password), // true if only letters/numbers
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setApiErrors({});
        setStatus('');

        // Check rules before submitting
        const rulesPassed = Object.values(passwordRules).every((r) => r === true);
        if (!rulesPassed) {
            setLoading(false);
            return;
        }

        try {
            const payload = {
                ...form.data,
                token: urlData.token,
                email: urlData.email,
            };

            await axios.post('/api/reset-password', payload);

            setStatus('Password successfully reset!');
            navigate('/login');
        } catch (err) {
            console.error('Reset password error:', err);
            if (err.response?.status === 422 && err.response.data?.errors) {
                setApiErrors(err.response.data.errors);
            } else if (err.response?.data?.message) {
                setStatus(err.response.data.message); // e.g., token expired
            } else {
                setStatus('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = (field, value) => ({
        width: '100%',
        padding: '0.5rem',
        marginTop: '0.25rem',
        borderRadius: '6px',
        border: `1px solid ${apiErrors[field] ? 'red' : '#D1D5DB'}`,
        backgroundColor: apiErrors[field] ? '#ffe5e5' : value ? '#fff4e5ff' : '#ffffff',
        color: apiErrors[field] ? 'red' : '#111827',
        transition: 'all 0.2s',
    });

    return (
        <div style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'Poppins, sans-serif', background: 'linear-gradient(to bottom, #fae7d4ff 65%, #7e6346ff)', padding: '2rem' }}>
            <div style={{ position: 'absolute', top: '1.5rem', left: '2rem' }}>
                <img src="/images/2.png" alt="Logo" style={{ width: '170px', marginTop: '-1rem', marginLeft: '-1rem' }} />
            </div>

            <div style={{ maxWidth: '400px', width: '100%', backgroundColor: '#fff', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', textAlign: 'center' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.25rem' }}>Create New Password</h1>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '2rem' }}>Please enter your new password.</p>

                {status && <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'red' }}>{status}</div>}

                <form onSubmit={submit}>
                    {/* EMAIL */}
                    <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
                        <label htmlFor="email" style={{ fontWeight: '550', color: '#3b3b3bff' }}>Email</label>
                        <input id="email" type="email" value={urlData.email} placeholder="Email" style={inputStyle('email', urlData.email)} onChange={(e) => setUrlData((prev) => ({ ...prev, email: e.target.value }))} />
                        {apiErrors.email && <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>{apiErrors.email[0]}</p>}
                    </div>

                    {/* PASSWORD */}
                    <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
                        <label htmlFor="password" style={{ fontWeight: '550', color: '#3b3b3bff' }}>Password</label>
                        <input
                            id="password"
                            type="password"
                            value={form.data.password}
                            placeholder="Password"
                            style={inputStyle('password', form.data.password)}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                        />
                        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'red', lineHeight: '1.2' }}>
                            {!passwordRules.length && '• At least 8 characters'}
                            {!passwordRules.uppercase && '• One uppercase letter (A-Z)'}
                            {!passwordRules.lowercase && '• One lowercase letter (a-z)'}
                            {!passwordRules.number && '• One number (0-9)'}
                            {!passwordRules.noSymbol && '• No symbols allowed'}
                        </div>
                        {apiErrors.password && <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>{apiErrors.password[0]}</p>}
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
                        <label htmlFor="password_confirmation" style={{ fontWeight: '550', color: '#3b3b3bff' }}>Confirm Password</label>
                        <input
                            id="password_confirmation"
                            type="password"
                            value={form.data.password_confirmation}
                            placeholder="Confirm Password"
                            style={inputStyle('password_confirmation', form.data.password_confirmation)}
                            onChange={(e) => form.setData('password_confirmation', e.target.value)}
                        />
                        {apiErrors.password_confirmation && <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>{apiErrors.password_confirmation[0]}</p>}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                        <button type="submit" disabled={loading} style={{ width: '150px', padding: '0.6rem', fontSize: '1rem', color: '#fff', background: loading ? 'gray' : 'linear-gradient(to bottom, #4a2f26, #2f1c14)', border: 'none', borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer' }}>{loading ? 'Processing...' : 'Reset Password'}</button>
                    </div>

                    <a href="/login" style={{ display: 'block', marginTop: '1rem', fontSize: '0.75rem', color: '#1d4ed8', fontWeight: '500', textDecoration: 'underline', textAlign: 'center' }}>Back to Login</a>
                </form>
            </div>
        </div>
    );
}
