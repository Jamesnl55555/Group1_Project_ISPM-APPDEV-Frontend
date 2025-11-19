import { useState, useEffect } from "react";
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
    const [canResetPassword, setCanResetPassword] = useState(true); // always true for SPA

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post('/api/login', data);
            // Store token if returned
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
        <div className="login-container">
            {status && <div className="status">{status}</div>}
            <form onSubmit={submit}>
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <InputError message={errors.email} />
                <InputLabel htmlFor="password" value="Password" />
                <TextInput
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                <InputError message={errors.password} />

                <label>
                    <Checkbox
                        checked={data.remember}
                        onChange={(e) => setData({ ...data, remember: e.target.checked })}
                    />
                    Remember Me
                </label>

                {canResetPassword && (
                    <Link to="/forgot-password">Forgot Password?</Link>
                )}

                <PrimaryButton disabled={loading} type="submit">LOG IN</PrimaryButton>
            </form>
        </div>
    );
}
