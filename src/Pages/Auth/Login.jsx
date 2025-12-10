import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "@/api/axios";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Checkbox from "@/Components/Checkbox";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!data.email) newErrors.email = "Email is required";
    if (!data.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post("/api/login", data);
      if (response.data?.token) {
        localStorage.setItem("auth_token", response.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setErrors({ general: "Invalid credentials" });
      } else if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: "Something went wrong" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "#563d28";
    e.target.style.backgroundColor = "#fff4e5ff";
  };

  const handleBlur = (e, value, hasError) => {
    e.target.style.borderColor = hasError ? "red" : "#D1D5DB";
    e.target.style.backgroundColor = hasError ? "#ffe5e5" : value ? "#fff4e5ff" : "#ffffff";
    e.target.style.color = hasError ? "red" : "#111827";
  };

  const handleHover = (e) => {
    e.target.style.borderColor = "#563d28";
    e.target.style.backgroundColor = "#fff4e5ff";
  };

  const handleHoverLeave = (e, value, hasError) => {
    e.target.style.borderColor = hasError ? "red" : "#D1D5DB";
    e.target.style.backgroundColor = hasError ? "#ffe5e5" : value ? "#fff4e5ff" : "#ffffff";
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
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "400px" }}>
        {/* Logo */}
        <img
          src="/images/2.png"
          alt="Logo"
          style={{ width: "70%", height: "auto", objectFit: "contain", marginBottom: "-41rem", zIndex: 2 }}
        />

        {/* Card */}
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            maxHeight: "450px",
            marginTop: "35rem",
            backgroundColor: "rgba(255,255,255,0.98)",
            borderRadius: "12px",
            boxShadow: "4px 8px 10px rgba(34, 34, 34, 0.6)",
            padding: "3rem 2rem 2rem 2rem",
            textAlign: "left",
          }}
        >
          <h2
            style={{
              fontWeight: "700",
              color: "#000",
              fontSize: "1.8rem",
              letterSpacing: "0.5px",
              marginBottom: "2rem",
              marginTop: "4rem",
              textAlign: "center",
              textShadow: "0 2px 4px rgba(0,0,0,0.25)",
            }}
          >
            LOG IN
          </h2>

          {errors.general && <InputError message={errors.general} />}

          <form onSubmit={submit}>
            {/* Email */}
            <div>
              <InputLabel htmlFor="email" value="E-mail" />
              <TextInput
                id="email"
                type="email"
                value={data.email}
                placeholder="E-mail"
                style={{
                  marginTop: "0.25rem",
                  borderColor: errors.email ? "red" : "#D1D5DB",
                  backgroundColor: errors.email ? "#ffe5e5" : data.email ? "#fff4e5ff" : "#ffffff",
                }}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, data.email, !!errors.email)}
                onMouseEnter={handleHover}
                onMouseLeave={(e) => handleHoverLeave(e, data.email, !!errors.email)}
              />
              <InputError message={errors.email} />
            </div>

            {/* Password */}
            <div style={{ marginTop: "1rem" }}>
              <InputLabel htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                value={data.password}
                placeholder="Password"
                style={{
                  marginTop: "0.25rem",
                  width: "100%",
                  borderColor: errors.password ? "red" : "#D1D5DB",
                  backgroundColor: errors.password ? "#ffe5e5" : data.password ? "#fff4e5ff" : "#ffffff",
                }}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, data.password, !!errors.password)}
                onMouseEnter={handleHover}
                onMouseLeave={(e) => handleHoverLeave(e, data.password, !!errors.password)}
              />
              <InputError message={errors.password} />
            </div>

            {/* Remember & Forgot */}
            <div
              style={{
                marginTop: "0.8rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.6rem",
                color: "gray",
                marginLeft: "1rem",
                marginRight: "1rem",
              }}
            >
              <label style={{ display: "flex", alignItems: "center", gap: "0.15rem" }}>
                <Checkbox
                  checked={data.remember}
                  onChange={(e) => setData({ ...data, remember: e.target.checked })}
                />
                Remember Me
              </label>

              <Link to="/forgotpassword" style={{ color: "#000", fontWeight: 750, textDecoration: "none" }}>
                Forgot Password?
              </Link>
            </div>

            {/* Button */}
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <PrimaryButton type="submit" disabled={loading}>
                SIGN IN
              </PrimaryButton>
            </div>

            <p style={{ marginTop: "1rem", fontSize: "0.875rem", textAlign: "center", color: "#4B5563" }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ textDecoration: "underline", color: "#2563EB" }}>
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
