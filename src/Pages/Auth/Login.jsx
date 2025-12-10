import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "@/api/axios";
import TextInput from "../../Components/TextInput";
import InputLabel from "../../Components/InputLabel";
import InputError from "../../Components/InputError";
import PrimaryButton from "../../Components/PrimaryButton";
import Checkbox from "../../Components/Checkbox";
import { IconMail, IconLock } from "@tabler/icons-react";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const getBackgroundColor = (field) =>
    errors[field] ? "#ffe5e5" : data[field] ? "#fff4e5ff" : "#ffffff";

  const inputHandlers = (field) => ({
    onFocus: (e) => {
      e.target.style.borderColor = "#563d28";
      e.target.style.backgroundColor = "#fff4e5ff";
    },
    onBlur: (e) => {
      e.target.style.borderColor = errors[field] ? "red" : "#D1D5DB";
      e.target.style.backgroundColor = getBackgroundColor(field);
      e.target.style.color = errors[field] ? "red" : "#111827";
    },
    onMouseEnter: (e) => {
      if (document.activeElement !== e.target) {
        e.target.style.borderColor = "#563d28";
        e.target.style.backgroundColor = "#fff4e5ff";
      }
    },
    onMouseLeave: (e) => {
      if (document.activeElement !== e.target) {
        e.target.style.borderColor = errors[field] ? "red" : "#D1D5DB";
        e.target.style.backgroundColor = getBackgroundColor(field);
      }
    },
  });

  const iconForField = (field) => {
    switch (field) {
      case "email":
        return (
          <IconMail
            size={18}
            style={{
              position: "absolute",
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              color: errors[field] ? "red" : "#555",
            }}
          />
        );
      case "password":
        return (
          <IconLock
            size={18}
            style={{
              position: "absolute",
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              color: errors[field] ? "red" : "#555",
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/images/1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Poppins, sans-serif",
        padding: "2rem",
        flexDirection: "column",
      }}
    >
      {/* Logo stays large as in original */}
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

      {/* Form Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "rgba(255,255,255,0.98)",
          borderRadius: "12px",
          boxShadow: "4px 8px 20px rgba(0, 0, 0, 0.4)",
          padding: "3rem 2rem 2rem 2rem",
          textAlign: "left",
          zIndex: 1,
          borderBottom: "2px solid rgba(0,0,0,0.8)",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginTop: "1rem",
            marginBottom: "2rem",
            textAlign: "center",
            textShadow: "0 2px 4px rgba(0,0,0,0.25)",
          }}
        >
          SIGN IN
        </h2>

        {errors.general && (
          <div style={{ color: "red", marginBottom: "1rem" }}>{errors.general}</div>
        )}

        <form onSubmit={submit}>
          {["email", "password"].map((field) => {
            const labelText = field.charAt(0).toUpperCase() + field.slice(1);
            const isPassword = field === "password";

            return (
              <div key={field} style={{ marginBottom: "1rem", position: "relative" }}>
                <InputLabel htmlFor={field} value={labelText} />
                <div style={{ position: "relative", width: "100%" }}>
                  {iconForField(field)}
                  <TextInput
                    id={field}
                    type={isPassword ? "password" : "text"}
                    value={data[field]}
                    onChange={(e) => setDataField(field, e.target.value)}
                    {...inputHandlers(field)}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      paddingLeft: "2rem",
                      borderRadius: "4px",
                      border: `1px solid ${errors[field] ? "red" : "#D1D5DB"}`,
                      backgroundColor: getBackgroundColor(field),
                      color: errors[field] ? "red" : "#111827",
                      transition: "all 0.2s",
                      height: "2.5rem",
                    }}
                  />
                </div>
                <InputError message={errors[field]} />
              </div>
            );
          })}

          {/* Remember Me */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              color: "gray",
            }}
          >
            <Checkbox
              checked={data.remember}
              onChange={(e) => setDataField("remember", e.target.checked)}
              style={{ accentColor: "#4a2f26", cursor: "pointer" }}
            />
            <label
              style={{
                marginLeft: "0.25rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#8d8d8dff",
              }}
            >
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
            <PrimaryButton
              type="submit"
              disabled={loading}
              style={{
                width: "150px",
                padding: "0.6rem 0",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#fff",
                background: "linear-gradient(to bottom, #4a2f26, #2f1c14)",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                textAlign: "center",
                boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
              }}
            >
              SIGN IN
            </PrimaryButton>
          </div>

          {/* Register Link */}
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
