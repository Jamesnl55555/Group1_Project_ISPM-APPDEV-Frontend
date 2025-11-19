import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import axios from '@/api/axios';
import useForm from '@/hooks/useForm';
import { useEffect, useState } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail = false,
    status: initialStatus = null,
    className = '',
}) {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState(initialStatus);

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: '',
            email: '',
        });

    useEffect(() => {
        let mounted = true;
        axios
            .get('/api/user')
            .then((res) => {
                if (!mounted) return;
                setUser(res.data);
                setData('name', res.data.name || '');
                setData('email', res.data.email || '');
            })
            .catch(() => {});

        return () => (mounted = false);
    }, [setData]);

    const submit = (e) => {
        e.preventDefault();

        // Patch user profile via API endpoint
        patch('/api/profile', {
            onSuccess: () => setStatus('profile-updated'),
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-2xl font-bold text-[#4b2e17] mb-4">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <button
                                type="button"
                                onClick={async () => {
                                    try {
                                        await axios.post('/api/email/verification-notification');
                                        setStatus('verification-link-sent');
                                    } catch (e) {
                                        // ignore for now
                                    }
                                }}
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </button>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="w-full flex flex-col items-center mt-6 space-y-2">
    <PrimaryButton
        disabled={processing}
        className="bg-gradient-to-b from-green-500 to-green-700 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:from-green-600 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
        Save Changes
    </PrimaryButton>

    <Transition
        show={recentlySuccessful}
        enter="transition ease-in-out"
        enterFrom="opacity-0"
        leave="transition ease-in-out"
        leaveTo="opacity-0"
    >
        <p className="text-sm text-gray-600 text-center">Saved.</p>
    </Transition>
</div>

            </form>
        </section>
    );
}
