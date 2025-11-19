import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import axios from '@/api/axios';
import { useForm } from '@/hooks/useForm';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    
    const form = useForm({
        token: token || '',
        email: email || '',
        password: '',
        password_confirmation: '',
    });

    const submit = async (e) => {
        e.preventDefault();

        try {
            await form.post('/api/reset-password');
            navigate('/login');
        } catch (err) {
            console.error('Reset password error:', err);
        }
    };

    return (
        <GuestLayout>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={form.data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => form.setData('email', e.target.value)}
                    />

                    <InputError message={form.errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={form.data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => form.setData('password', e.target.value)}
                    />

                    <InputError message={form.errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={form.data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            form.setData('password_confirmation', e.target.value)
                        }
                    />

                    <InputError
                        message={form.errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={form.processing}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
