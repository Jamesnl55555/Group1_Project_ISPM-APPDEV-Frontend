import { useNavigate } from 'react-router-dom';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@/hooks/useForm';

export default function ConfirmPassword() {
    const navigate = useNavigate();
    const form = useForm({
        password: '',
    });

    const submit = async (e) => {
        e.preventDefault();

        try {
            await form.post('/api/confirm-password');
            navigate('/dashboard');
        } catch (err) {
            console.error('Confirm password error:', err);
        }
    };

    return (
        <GuestLayout>
            <div
                className="min-h-screen flex flex-col justify-center items-center px-4"
                style={{
                    background: 'linear-gradient(to bottom, #fae7d4 65%, #7e6346)',
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                <div
                    className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 text-center"
                    style={{ boxShadow: '4px 8px 20px rgba(0,0,0,0.4)' }}
                >
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.25)', letterSpacing: '1px' }}
                    >
                        Confirm Password
                    </h2>

                    <p className="text-gray-500 text-sm mb-6">
                        This is a secure area of the application.<br />
                        Please confirm your password before continuing.
                    </p>

                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="text-left">
                            <InputLabel htmlFor="password" value="Password" className="mb-1" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={form.data.password}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 transition-colors"
                                isFocused={true}
                                onChange={(e) => form.setData('password', e.target.value)}
                                style={{
                                    backgroundColor: form.data.password ? '#fff4e5' : '#ffffff',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#fff4e5';
                                    e.currentTarget.style.borderColor = '#4a2f26';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = form.data.password ? '#fff4e5' : '#ffffff';
                                    e.currentTarget.style.borderColor = form.errors.password ? 'red' : '#D1D5DB';
                                }}
                            />
                            <InputError message={form.errors.password} className="mt-2" />
                        </div>

                        <div className="flex justify-center mt-4">
                            <PrimaryButton
                                disabled={form.processing}
                                type="submit"
                                className="px-6 py-2 rounded-md font-semibold text-white"
                                style={{
                                    width: '150px',
                                    background: 'linear-gradient(to bottom, #4a2f26, #2f1c14)',
                                    transition: 'background 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(to bottom, #3e2b1c, #2e1c0f)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(to bottom, #4a2f26, #2f1c14)';
                                }}
                            >
                                {form.processing ? 'Confirming...' : 'Confirm'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
