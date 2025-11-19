import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import useForm from '@/hooks/useForm';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        // Send password update to API endpoint
        put('/api/password', {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-2xl font-bold text-[#4b2e17] mb-4">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Current Password"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="New Password" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>
                    
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
