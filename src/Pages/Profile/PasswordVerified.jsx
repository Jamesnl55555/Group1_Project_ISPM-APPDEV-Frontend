import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "react-router-dom";

export default function PasswordVerified() {
  return (
    <AuthenticatedLayout
      header={
        <div>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 800,
              lineHeight: 1.3,
              marginLeft: "5rem",
              WebkitTextStroke: ".8px #000000",
              backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            Profile Settings
          </h1>

          <p
            style={{
              marginLeft: "5rem",
              marginTop: "-2rem",
              fontSize: "0.875rem",
              color: "#4b5563",
              letterSpacing: "2px",
            }}
          >
            Manage your account information and security settings
          </p>
        </div>
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "3rem",
          paddingBottom: "3rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#fdf6ee",
            width: "90%",
            maxWidth: "69rem",
            borderRadius: "1rem",
            border: "1px solid #e2cdbf",
            padding: "2.5rem",
            marginTop: "-2rem",
          }}
        >
          <p style={{ fontWeight: "semi-bold", fontSize:"2rem", marginTop:"-.5rem", color:"#444444ff" }}>Password Verified!</p>
              <p
            style={{
              marginTop: "-1.5rem",
              fontSize: "0.875rem",
              color: "#4b5563",
              letterSpacing:"2px",
              marginBottom:"2rem"
            }}
          >
            To proceed to profile information, click the button.
          </p>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link to="/profile">
  <button
    style={{
      padding: "0.6rem 1.5rem",
      backgroundColor: "#553522ff",
      color: "#ffffff",
      fontWeight: "bold",
      borderRadius: "0.2rem",
      border: "none",
      cursor: "pointer",
      width: "7.2rem",
      transition: "background-color .3s",
      marginTop: "5rem",
      lineHeight: ".6rem",
    }}
    onMouseEnter={(e) =>
      (e.currentTarget.style.backgroundColor = "#261107")
    }
    onMouseLeave={(e) =>
      (e.currentTarget.style.backgroundColor = "#553522ff")
    }
  >
    Proceed
  </button>
</Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}


