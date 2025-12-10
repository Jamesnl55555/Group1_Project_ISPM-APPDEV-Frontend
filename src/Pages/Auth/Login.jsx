import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "@/api/axios";
import { IconMail, IconLock } from "@tabler/icons-react";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

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

  const inputStyle = (field) => ({
    width: "90%",
    padding: "0.5rem 2.5rem 0.5rem 2.5rem",
    borderRadius: "4px",
    border: `1px solid ${errors[field] ? "red" : "#D1D5DB"}`,
    backgroundColor: errors[field] ? "#ffe5e5" : data[field] ? "#fff4e5ff" : "#ffffff",
    color: errors[field] ? "red" : "#111827",
    transition: "all 0.2s",
    position: "relative",
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
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: 'url("/images/1.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Poppins, sans-serif",
        padding: "2rem",
        position: "relative",
      }}
    >
      {/* Logo centered above card */}
      <img
        src="/images/2.png"
        alt="Logo"
        style={{
          width: "12rem",
          height: "auto",
          position: "absolute",
          top: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "rgba(255,255,255,0.98)",
          borderRadius: "12px",
          boxShadow: "4px 8px 10px rgba(34, 34, 34, 0.6)",
          padding: "3rem 2rem 2rem 2rem",
          textAlign: "left",
          marginTop: "5rem",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginTop: "-.5rem",
            marginBottom: "1.5rem",
            textAlign: "center",
            textShadow: "0 2px 4px rgba(0,0,0,0.25)",
          }}
        >
          LOG IN
        </h2>

        <form onSubmit={submit}>
          {["email", "password"].map((field) => {
            const labelText = field === "email" ? "Email" : "Password";
            const Icon = field === "email" ? IconMail : IconLock;

            return (
              <div key={field} style={{ marginBottom: "1rem", position: "relative" }}>
                <label htmlFor={field} style={{ fontWeight: 550, color: "#3b3b3bff" }}>
                  {labelText}
                </label>

                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: errors[field] ? "red" : "#555",
                    }}
                  >
                    <Icon size={18} />
                  </div>

                  <input
                    id={field}
                    type={field === "password" ? "password" : "text"}
                    value={data[field]}
                    onChange={(e) => setData({ ...data, [field]: e.target.value })}
                    placeholder={labelText}
                    style={{ ...inputStyle(field), paddingLeft: "2rem" }}
                    onFocus={handleFocus}
                    onBlur={(e) => handleBlur(e, field)}
                    onMouseEnter={handleHover}
                    onMouseLeave={(e) => handleHoverLeave(e, field)}
                  />
                </div>

                {errors[field] && (
                  <span style={{ color: "red", fontSize: "0.75rem", marginLeft: ".6rem" }}>
                    {errors[field]}
                  </span>
                )}
              </div>
            );
          })}

          {/* Remember + Forgot Password */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
              color: "gray",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <input
                type="checkbox"
                checked={data.remember}
                onChange={(e) => setData({ ...data, remember: e.target.checked })}
                style={{ accentColor: "#4d2603ff", cursor: "pointer" }}
              />
              Remember Me
            </label>

            <Link
              to="/forgot-password"
              style={{
                color: "#000",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.7rem",
              }}
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit button */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
            <button
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
                transition: "background 0.3s",
                boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                textAlign: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(to bottom, #3e2b1c, #2e1c0f)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(to bottom, #4a2f26, #2f1c14)")}
            >
              SIGN IN
            </button>
          </div>

          {/* Register link */}
          <p style={{ marginTop: "1rem", fontSize: "0.7rem", color: "#919cafff", textAlign: "center" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#2563EB", fontWeight: "500", textDecoration: "underline" }}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
