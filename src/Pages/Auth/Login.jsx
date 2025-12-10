import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useNavigate, Link } from "react-router-dom";
import axios from '@/api/axios';

export default function Login() {
    const [data, setData] = useState({ email: "", password: "", remember: false });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setShowModal(false);

        if (!data.email || !data.password) {
            setErrors({
                email: !data.email ? "Email is required" : "",
                password: !data.password ? "Password is required" : "",
            });
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("/api/login", data);
            if (response.data?.token) {
                localStorage.setItem('auth_token', response.data.token);
            }
            navigate("/dashboard");
        } catch (err) {
            if (err.response?.status === 401) {
                setShowModal(true);
            } else if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ general: err.response?.data?.message || "Something went wrong" });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleFocus = (e) => {
        e.target.style.borderColor = '#563d28';
        e.target.style.backgroundColor = '#fff4e5ff';
    };

    const handleBlur = (e, value, hasError) => {
        e.target.style.borderColor = hasError ? 'red' : '#D1D5DB';
        e.target.style.backgroundColor = hasError
            ? '#ffe5e5'
            : value
            ? '#fff4e5ff'
            : '#ffffff';
        e.target.style.color = hasError ? 'red' : '#111827';
    };

    const handleHover = (e) => {
        e.target.style.borderColor = '#563d28';
        e.target.style.backgroundColor = '#fff4e5ff';
    };

    const handleHoverLeave = (e, value, hasError) => {
        e.target.style.borderColor = hasError ? 'red' : '#D1D5DB';
        e.target.style.backgroundColor = hasError
            ? '#ffe5e5'
            : value
            ? '#fff4e5ff'
            : '#ffffff';
    };

    return (
        <div
            style={{
                backgroundImage: "url('/images/1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "95vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Poppins, sans-serif",
                padding: "1rem",
            }}
        >
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "2rem",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                            minWidth: "300px",
                            textAlign: "center",
                            cursor: "default",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 style={{ color: "#b91c1c", marginBottom: "1rem" }}>Invalid Credentials</h3>
                        <p>Please check your email and password and try again.</p>
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            style={{
                                marginTop: "1rem",
                                width: "100px",
                                background: "linear-gradient(to bottom, #4a2f26, #2f1c14)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                padding: "0.5rem",
                                cursor: "pointer",
                            }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            <div
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: "400px",
                }}
            >
                <img
                    src="/images/2.png"
                    alt="Logo"
                    style={{
                        width: '70%',
                        height: 'auto',
                        objectFit: 'contain',
                        marginBottom: '-41rem',
                        zIndex: 2,
                    }}
                />

                <div
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        maxHeight: '450px',
                        marginTop: '35rem',
                        backgroundColor: 'rgba(255,255,255,0.98)',
                        borderRadius: '12px',
                        boxShadow: '4px 8px 10px rgba(34, 34, 34, 0.6)',
                        padding: '3rem 2rem 2rem 2rem',
                        textAlign: 'left',
                    }}
                >
                    <h2
                        style={{
                            fontWeight: '700',
                            color: '#000',
                            fontSize: '1.8rem',
                            letterSpacing: '0.5px',
                            marginBottom: '2rem',
                            marginTop: '4rem',
                            textAlign: 'center',
                            textShadow: '0 2px 4px rgba(0,0,0,0.25)',
                        }}
                    >
                        LOG IN
                    </h2>

                    <form onSubmit={submit}>
                        {/* EMAIL */}
                        <div>
                            <label htmlFor="email" style={{ fontWeight: 550, color: '#3b3b3b' }}>
                                E-mail
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                placeholder="E-mail"
                                onChange={(e) => {
                                    setData({ ...data, email: e.target.value });
                                    setErrors((prev) => ({ ...prev, email: '' }));
                                }}
                                style={{
                                    marginTop: '0.25rem',
                                    width: '95%',
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    border: `1px solid ${errors.email ? 'red' : '#D1D5DB'}`,
                                    backgroundColor: errors.email
                                        ? '#ffe5e5'
                                        : data.email
                                        ? '#fff4e5ff'
                                        : '#ffffff',
                                    color: errors.email ? 'red' : '#111827',
                                    transition: '0.2s',
                                }}
                                onFocus={handleFocus}
                                onBlur={(e) => handleBlur(e, data.email, !!errors.email)}
                                onMouseEnter={handleHover}
                                onMouseLeave={(e) => handleHoverLeave(e, data.email, !!errors.email)}
                            />
                            {errors.email && (
                                <span style={{ color: 'red', fontSize: '0.75rem', marginLeft: '.6rem' }}>
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div style={{ marginTop: '1rem' }}>
                            <label htmlFor="password" style={{ fontWeight: 550, color: '#3b3b3b' }}>
                                Password
                            </label>
                            <div style={{ position: 'relative', width: '95%' }}>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    placeholder="Password"
                                    onChange={(e) => {
                                        setData({ ...data, password: e.target.value });
                                        setErrors((prev) => ({ ...prev, password: '' }));
                                    }}
                                    style={{
                                        marginTop: '0.25rem',
                                        width: '100%',
                                        padding: '0.5rem 2.5rem 0.5rem 0.5rem',
                                        borderRadius: '6px',
                                        border: `1px solid ${errors.password ? 'red' : '#D1D5DB'}`,
                                        backgroundColor: errors.password
                                            ? '#ffe5e5'
                                            : data.password
                                            ? '#fff4e5ff'
                                            : '#ffffff',
                                        color: errors.password ? 'red' : '#111827',
                                        transition: '0.2s',
                                    }}
                                    onFocus={handleFocus}
                                    onBlur={(e) => handleBlur(e, data.password, !!errors.password)}
                                    onMouseEnter={handleHover}
                                    onMouseLeave={(e) => handleHoverLeave(e, data.password, !!errors.password)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '0.5rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#555',
                                    }}
                                >
                                    {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <span style={{ color: 'red', fontSize: '0.75rem', marginLeft: '.6rem' }}>
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        {/* REMEMBER ME */}
                        <div
                            style={{
                                marginTop: '0.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontSize: '0.6rem',
                                color: 'gray',
                                marginLeft: '1rem',
                                marginRight: '1rem',
                            }}
                        >
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData({ ...data, remember: e.target.checked })}
                                    style={{ accentColor: '#fff', cursor: 'pointer' }}
                                />
                                Remember Me
                            </label>

                            <Link
                                to="/forgot-password"
                                style={{
                                    color: '#000000',
                                    fontWeight: 750,
                                    textDecoration: 'none',
                                }}
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* BUTTON */}
                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '120px',
                                    padding: '0.6rem',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    color: '#fff',
                                    background: 'linear-gradient(to bottom, #4a2f26, #2f1c14)',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                                    transition: '0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        'linear-gradient(to bottom, #3e2b1c, #2e1c0f)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        'linear-gradient(to bottom, #4a2f26, #2f1c14)';
                                }}
                            >
                                SIGN IN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
