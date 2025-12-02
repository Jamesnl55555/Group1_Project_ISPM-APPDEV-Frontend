import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from '@/api/axios';
import TextInput from '../../Components/TextInput';
import InputLabel from '../../Components/InputLabel';
import InputError from '../../Components/InputError';
import PrimaryButton from '../../Components/PrimaryButton';
import Checkbox from '../../Components/Checkbox';

export default function Login() {
    const [data, setData] = useState({ email: "", password: "", remember: false });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [canResetPassword] = useState(true);

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setShowModal(false);

        try {
            await axios.get("/sanctum/csrf-cookie");
            const response = await axios.post("/api/login", data);

            if (response.data?.token) {
                const storage = data.remember ? localStorage : sessionStorage;
                storage.setItem("auth_token", response.data.token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
            }

            navigate("/dashboard");
        } catch (err) {
            if (err.response?.status === 401) {
                // Invalid credentials
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

    const inputBaseStyle = {
        marginTop: "0.25rem",
        width: "22.5rem",
        borderRadius: "6px",
        border: "1px solid #D1D5DB",
        padding: "0.5rem",
        transition: "all 0.2s",
        color: "#111827",
    };

    const handleInputFocus = (e) => {
        e.target.style.borderColor = "#563d28";
        e.target.style.backgroundColor = "#fff4e5ff";
        e.target.placeholder = "";
    };

    const handleInputBlur = (e, value, placeholder) => {
        e.target.style.borderColor = value ? "#D1D5DB" : "#D1D5DB";
        e.target.style.backgroundColor = value ? "#fff4e5ff" : "#ffffff";
        e.target.placeholder = value ? "" : placeholder;
    };

    const handleInputHover = (e) => {
        e.target.style.borderColor = "#563d28";
        e.target.style.backgroundColor = "#fff4e5ff";
    };

    const handleInputHoverLeave = (e, value, hasError) => {
        e.target.style.borderColor = hasError ? "red" : "#D1D5DB";
        e.target.style.backgroundColor = hasError ? "#ffe5e5" : value ? "#fff4e5ff" : "#ffffff";
    };

    return (
        <div
            style={{
                backgroundImage: "url('/images/1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "90vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Poppins, sans-serif",
                flexDirection: "column",
                padding: "2rem",
            }}
        >
            {/* Modal for invalid credentials */}
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
                        <PrimaryButton
                            type="button"
                            onClick={() => setShowModal(false)}
                            style={{
                                marginTop: "1rem",
                                width: "100px",
                                background: "linear-gradient(to bottom, #4a2f26, #2f1c14)",
                            }}
                        >
                            OK
                        </PrimaryButton>
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
                {/* Logo */}
                <img
                    src="/images/2.png"
                    alt="Logo"
                    style={{
                        width: "50rem",
                        height: "15rem",
                        objectFit: "contain",
                        zIndex: 2,
                        marginBottom: "-90px",
                    }}
                />

                <div
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.98)",
                        borderRadius: "12px",
                        boxShadow: "4px 8px 20px rgba(0, 0, 0, 0.4)",
                        padding: "3.5rem 2rem 1.5rem 2rem",
                        width: "24rem",
                        marginTop: "-2rem",
                        zIndex: 1,
                        textAlign: "left",
                        borderBottom: "2px solid rgba(0, 0, 0, .8)",
                        height: "auto",
                    }}
                >
                    <h2
                        style={{
                            fontWeight: "700",
                            color: "#000",
                            fontSize: "2rem",
                            letterSpacing: "0.5px",
                            marginBottom: "2rem",
                            marginTop: "4rem",
                            textAlign: "center",
                            textShadow: "0 2px 4px rgba(0,0,0,0.25)",
                        }}
                    >
                        LOG IN
                    </h2>

                    <form onSubmit={submit}>
                        {/* EMAIL FIELD */}
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Email"
                                style={{ fontWeight: "550", color: "#3b3b3bff" }}
                            />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="Email"
                                autoComplete="username"
                                onChange={(e) => {
                                    setData({ ...data, email: e.target.value });
                                    setErrors((prev) => ({ ...prev, email: "" }));
                                }}
                                style={{
                                    ...inputBaseStyle,
                                    borderColor: errors.email ? "red" : undefined,
                                    backgroundColor: errors.email
                                        ? "#ffe5e5"
                                        : data.email
                                        ? "#fff4e5ff"
                                        : "#ffffff",
                                    color: errors.email ? "red" : "#111827",
                                }}
                                onFocus={handleInputFocus}
                                onBlur={(e) => handleInputBlur(e, data.email, "Email")}
                                onMouseEnter={handleInputHover}
                                onMouseLeave={(e) =>
                                    handleInputHoverLeave(e, data.email, !!errors.email)
                                }
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* PASSWORD FIELD */}
                        <div style={{ marginTop: "1rem" }}>
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                style={{ fontWeight: "550", color: "#3b3b3bff" }}
                            />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                placeholder="Password"
                                autoComplete="current-password"
                                onChange={(e) => {
                                    setData({ ...data, password: e.target.value });
                                    setErrors((prev) => ({ ...prev, password: "" }));
                                }}
                                style={{
                                    ...inputBaseStyle,
                                    borderColor: errors.password ? "red" : undefined,
                                    backgroundColor: errors.password
                                        ? "#ffe5e5"
                                        : data.password
                                        ? "#fff4e5ff"
                                        : "#ffffff",
                                    color: errors.password ? "red" : "#111827",
                                }}
                                onFocus={handleInputFocus}
                                onBlur={(e) =>
                                    handleInputBlur(e, data.password, "Password")
                                }
                                onMouseEnter={handleInputHover}
                                onMouseLeave={(e) =>
                                    handleInputHoverLeave(e, data.password, !!errors.password)
                                }
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* REMEMBER ME */}
                        <div
                            style={{
                                marginTop: "0.8rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                fontSize: "0.6rem",
                                color: "#4B5563",
                                marginLeft: "1rem",
                            }}
                        >
                            <label
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.15rem",
                                }}
                            >
                                <Checkbox
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData({ ...data, remember: e.target.checked })
                                    }
                                    style={{ accentColor: "#4d2603ff" }}
                                />
                                Remember Me
                            </label>

                            <Link
                                to="/forgot-password"
                                style={{
                                    color: "#000000",
                                    fontWeight: 700,
                                    textDecoration: "none",
                                    marginRight: "2rem",
                                    fontSize: "0.6rem",
                                }}
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* LOGIN BUTTON */}
                        <div
                            style={{
                                marginTop: "1.5rem",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <PrimaryButton
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: "120px",
                                    padding: "0.6rem",
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    color: "#fff",
                                    background: "linear-gradient(to bottom, #4a2f26, #2f1c14)",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    textAlign: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "background 0.3s",
                                    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        "linear-gradient(to bottom, #3e2b1c, #2e1c0f)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "linear-gradient(to bottom, #4a2f26, #2f1c14)";
                                }}
                            >
                                SIGN IN
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
