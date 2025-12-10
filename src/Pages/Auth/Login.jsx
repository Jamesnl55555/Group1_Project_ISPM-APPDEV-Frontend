import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "@/api/axios";
import TextInput from "../../Components/TextInput";
import PrimaryButton from "../../Components/PrimaryButton";
import { IconMail, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const setDataField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setShowModal(false);

    try {
      const response = await axios.post("/api/login", data);
      if (response.data?.token) {
        localStorage.setItem("auth_token", response.data.token);
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

  const hoverEnter = (box) => {
    box.style.borderColor = "#563d28";
    box.style.backgroundColor = "#fff4e5ff";
  };

  const hoverLeave = (box, value, hasError) => {
    box.style.borderColor = hasError ? "red" : "#D1D5DB";
    box.style.backgroundColor = hasError
      ? "#ffe5e5"
      : value
      ? "#fff4e5ff"
      : "#ffffff";
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
        padding: "1rem",
      }}
    >
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
            width: "60%",
            objectFit: "contain",
            marginBottom: "-20rem",
            zIndex: 2,
          }}
        />

        {/* Form Card */}
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "rgba(255,255,255,0.98)",
            borderRadius: "12px",
            boxShadow: "4px 8px 10px rgba(34, 34, 34, 0.6)",
            padding: "3rem 2rem 2rem 2rem",
            marginTop: "20rem",
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              color: "#000",
              fontSize: "1.8rem",
              textAlign: "center",
              marginBottom: "2rem",
              marginTop: "1rem",
            }}
          >
            LOG IN
          </h2>

          {errors.general && (
            <div style={{ color: "red", marginBottom: "1rem" }}>{errors.general}</div>
          )}

          <form onSubmit={submit}>
            {/* EMAIL */}
            <div style={{ marginBottom: "1rem", position: "relative" }}>
              <label htmlFor="email" style={{ fontWeight: 550, color: "#3b3b3b" }}>
                E-mail
              </label>
              <div style={{ position: "relative" }}>
                <IconMail
                  size={18}
                  style={{
                    position: "absolute",
                    left: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: errors.email ? "red" : "#555",
                  }}
                />
                <input
                  id="email"
                  type="email"
                  value={data.email}
                  placeholder="E-mail"
                  onChange={(e) => setDataField("email", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.5rem 0.5rem 2.5rem",
                    borderRadius: "2px",
                    border: `1px solid ${errors.email ? "red" : "#D1D5DB"}`,
                    backgroundColor: errors.email ? "#ffe5e5" : data.email ? "#fff4e5ff" : "#fff",
                    color: errors.email ? "red" : "#111827",
                    transition: "all 0.2s",
                    fontSize: "0.9rem",
                  }}
                  onMouseEnter={(e) => hoverEnter(e.target)}
                  onMouseLeave={(e) => hoverLeave(e.target, data.email, !!errors.email)}
                />
                {errors.email && (
                  <span style={{ color: "red", fontSize: "0.75rem", marginLeft: "0.6rem" }}>
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* PASSWORD */}
            <div style={{ marginBottom: "1rem", position: "relative" }}>
              <label htmlFor="password" style={{ fontWeight: 550, color: "#3b3b3b" }}>
                Password
              </label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  border: errors.password ? "1px solid red" : "1px solid #D1D5DB",
                  borderRadius: "2px",
                  backgroundColor: errors.password ? "#ffe5e5" : data.password ? "#fff4e5ff" : "#fff",
                  paddingRight: "0.6rem",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => hoverEnter(e.currentTarget)}
                onMouseLeave={(e) => hoverLeave(e.currentTarget, data.password, !!errors.password)}
              >
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  placeholder="Password"
                  onChange={(e) => setDataField("password", e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    padding: "0.5rem 2.5rem",
                    background: "transparent",
                    color: errors.password ? "red" : "#111827",
                    fontSize: "0.9rem",
                  }}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    opacity: 0.7,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: errors.password ? "red" : "#555",
                  }}
                >
                  {showPassword ? <IconEye size={18} /> : <IconEyeOff size={18} />}
                </div>
              </div>
              {errors.password && (
                <span style={{ color: "red", fontSize: "0.75rem", marginLeft: "0.6rem" }}>
                  {errors.password}
                </span>
              )}
            </div>

            {/* REMEMBER ME */}
            <div
              style={{
                marginTop: "0.8rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.7rem",
                color: "gray",
                marginLeft: "1rem",
                marginRight: "1rem",
              }}
            >
              <label style={{ display: "flex", alignItems: "center", gap: "0.15rem" }}>
                <input
                  type="checkbox"
                  checked={data.remember}
                  onChange={(e) => setDataField("remember", e.target.checked)}
                  style={{ accentColor: "#fff", cursor: "pointer" }}
                />
                Remember Me
              </label>

              <Link
                to="/forgotpassword"
                style={{ color: "#000", fontWeight: 700, textDecoration: "none" }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* BUTTON */}
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <PrimaryButton
                type="submit"
                disabled={loading}
                style={{
                  width: "120px",
                  padding: "0.6rem",
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#fff",
                  background: "linear-gradient(to bottom, #4a2f26, #2f1c14)",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                SIGN IN
              </PrimaryButton>
            </div>

            {/* REGISTER LINK */}
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.7rem",
                color: "#919cafff",
                textAlign: "center",
              }}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{ color: "#2563EB", fontWeight: "500", textDecoration: "underline" }}
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Invalid Credentials Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "1rem",
              textAlign: "center",
              width: "90%",
              maxWidth: "380px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#b91c1c" }}>
              Invalid Credentials
            </h3>
            <p>Please check your email and password and try again.</p>
            <PrimaryButton
              onClick={() => setShowModal(false)}
              style={{
                padding: "0.6rem 1.2rem",
                borderRadius: "6px",
                background: "#422912",
                color: "white",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Close
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}
