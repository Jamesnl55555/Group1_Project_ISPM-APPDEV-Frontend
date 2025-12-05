import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import axios from '@/api/axios';
import { useForm } from '@/hooks/useForm';

export default function VerifyEmail() {
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);
    const form = useForm({});

    const submit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/email/verification-notification', form.data);
            setStatus('verification-link-sent');
        } catch (err) {
            console.error('Resend error:', err);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
            localStorage.removeItem('auth_token');
            delete axios.defaults.headers.common['Authorization'];
            navigate('/login');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    return (
        <GuestLayout>
            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={form.processing}>
                        Resend Verification Email
                    </PrimaryButton>

                    <button
                        onClick={handleLogout}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Log Out
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
