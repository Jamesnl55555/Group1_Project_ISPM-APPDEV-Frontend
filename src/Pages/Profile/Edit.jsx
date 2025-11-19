import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit() {
    const [mustVerifyEmail] = useState(false);
    const [status] = useState(null);

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1
                        className="text-4xl font-extrabold text-[#4b2e17] drop-shadow-sm"
                        style={{
                            WebkitTextStroke: '.8px #000000',
                            backgroundImage: 'linear-gradient(to bottom, #ec8845ff, #3b1f0d)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            lineHeight: '1.3',
                            fontSize: '3rem',
                            marginLeft: '5rem',
                        }}
                    >
                        Profile Settings
                    </h1>
                    <p
                        className="text-sm text-gray-600 mt-1"
                        style={{ marginLeft: '5rem' }}
                    >
                        Manage your account information and security settings
                    </p>
                </div>
            }
        >

                    {/* Centered cards */}
            <div className="flex justify-center py-12">
                <div className="flex flex-col w-full max-w-4xl gap-8">
                    {/* PROFILE CARD */}
                    <div className="bg-white rounded-2xl shadow-inner p-8 border border-[#e2cdbf] w-full">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="flex flex-col gap-4"
                        />
                    </div>

                    {/* PASSWORD CARD */}
                    <div className="bg-white rounded-2xl shadow-inner p-8 border border-[#e2cdbf] w-full">
                        <UpdatePasswordForm className="flex flex-col gap-4" />
                    </div>

                    {/* DELETE CARD */}
                    <div className="bg-white rounded-2xl shadow-inner p-8 border border-[#e2cdbf] w-full">
                        <div className="flex justify-center">
                            <DeleteUserForm buttonClassName="w-32" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
