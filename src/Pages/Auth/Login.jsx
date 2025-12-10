import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "@/api/axios";

import InputError from "../../Components/InputError";
import PrimaryButton from "../../Components/PrimaryButton";

import { IconMail, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setData({ ...data, [field]: e.target.value });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post("/api/login", data);

      if (response.data?.token) {
        localStorage.setItem("auth_token", response.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: "Invalid credentials" });
      }
    } finally {
      setLoading(false);
    }
  };

  // MATCH REGISTER EXACTLY
  const inputStyle = (field) => ({
    width: "90%",
    padding: "0.5rem 2.5rem 0.5rem 2.5rem", // EXACT MATCH
    borderRadius: "4px",
    border: `1px solid ${errors[field] ? "red" : "#D1D5DB"}`,
    backgroundColor: errors[field]
      ? "#ffe5e5"
      : data[field]
      ? "#fff4e5ff"
      : "#ffffff",
    color: errors[field] ? "red" : "#111827",
    transition: "all 0.2s",
    fontSize: "0.9rem",
  });

  const handleFocus = (e) => {
    e.target.style.borderColor = "#563d28";
    e.target.style.backgroundColor = "#fff4e5ff";
  };

  const handleBlur = (e, field) => {
    e.target.style.borderColor = errors[field] ? "red" : "#D1D5DB";
    e.target.style.backgroundColor = errors[field]
      ? "#ffe5e5"
      : data[field]
      ? "#fff4e5ff"
      : "#ffffff";
  };

  const handleHover = (e) => {
    e.target.style.borderColor = "#563d28";
    e.target.style.backgroundColor = "#fff4e5ff";
  };

  const handleHoverLeave = (e, field) => {
    e.target.style.borderColor = errors[field] ? "red" : "#D1D5DB";
    e.target.style.backgroundColor = errors[field]
      ? "#ffe5e5"
      : data[field]
      ? "#fff4e5ff"
      : "#ffffff";
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
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "rgba(255,255,255,0.98)",
          borderRadius: "12px",
          boxShadow: "4px 8px 20px rgba(0,0,0,0.4)",
          padding: "3rem 2rem",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
          }}
        >
          LOG IN
        </h2>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div style={{ marginBottom: "1rem", position: "relative" }}>
            <label htmlFor="email" style={{ fontWeight: 550, color: "#3b3b3bff" }}>
              Email
            </label>

            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: errors.email ? "red" : "#555",
                }}
              >
                <IconMail size={18} />
              </div>

              <input
                id="email"
                type="email"
                value={data.email}
                placeholder="Email"
                onChange={handleChange("email")}
                style={inputStyle("email")}
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, "email")}
                onMouseEnter={handleHover}
                onMouseLeave={(e) => handleHoverLeave(e, "email")}
              />
            </div>

            <InputError message={errors.email} />
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: "1rem", position: "relative" }}>
            <label
              htmlFor="password"
              style={{ fontWeight: 550, color: "#3b3b3bff" }}
            >
              Password
            </label>

            <div style={{ position: "relative" }}>
              {/* LEFT LOCK ICON */}
              <div
                style={{
                  position: "absolute",
                  left: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: errors.password ? "red" : "#555",
                }}
              >
                <IconLock size={18} />
              </div>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={data.password}
                placeholder="Password"
                onChange={handleChange("password")}
                style={inputStyle("password")}
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, "password")}
                onMouseEnter={handleHover}
                onMouseLeave={(e) => handleHoverLeave(e, "password")}
              />

              {/* RIGHT EYE ICON */}
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "55%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: errors.password ? "red" : "#555",
                  opacity: 0.7,
                }}
              >
                {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              </div>
            </div>

            <InputError message={errors.password} />
          </div>

          {/* BUTTON */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
            <PrimaryButton
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                maxWidth: "150px",
                padding: "0.6rem",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#fff",
                background: "linear-gradient(to bottom, #4a2f26, #2f1c14)",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
              }}
            >
              SIGN IN
            </PrimaryButton>
          </div>

          {/* SWITCH TO REGISTER */}
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.7rem",
              color: "#919cafff",
              textAlign: "center",
            }}
          >
            Don’t have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#2563EB",
                fontWeight: 500,
                textDecoration: "underline",
              }}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
