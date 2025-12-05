import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import TextInput from '../../Components/TextInput';
import InputError from '../../Components/InputError';
import PrimaryButton from '../../Components/PrimaryButton';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setStatus(null);

        try {
            const response = await axios.post('/api/forgot-password', { email });
            setStatus(response.data.status || 'Password reset link sent!');

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
        <>
        <style>{`
              input:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px #fff4e5ff inset !important;
                -webkit-text-fill-color: #000 !important;
                transition: background-color 5000s ease-in-out 0s;
              }
              input:-webkit-autofill:focus {
                -webkit-box-shadow: 0 0 0px 1000px #fff4e5ff inset !important;
                -webkit-text-fill-color: #000 !important;
              }
              input:-webkit-autofill:hover {
                -webkit-box-shadow: 0 0 0px 1000px #fff4e5ff inset !important;
                -webkit-text-fill-color: #000 !important;
              }
            `}</style>
        <div className="forgot-password-container" 
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
            }}>
            <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

            <p className="mb-4 text-gray-600 text-sm">
                Forgot your password? No problem. Enter your email and we will send you a password reset link.
            </p>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />

                {errors.general && (
                    <div className="mt-2 text-red-600 text-sm">{errors.general}</div>
                )}

                <div className="mt-4 flex justify-end">
                    <PrimaryButton disabled={loading}>
                        {loading ? 'Sending...' : 'Email Password Reset Link'}
                    </PrimaryButton>
                </div>
            </form>
        </div>
        </>
    );
}
