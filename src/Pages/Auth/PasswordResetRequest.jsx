export default function PasswordResetCard() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#e5e5e5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', 'Inter', sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          maxWidth: 400,
          padding: "20px",
          textAlign: "center",
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Ensures children are centered horizontally
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "20px",
            letterSpacing: "1px",
          }}
        >
          Password Reset Request
        </h1>

        <p
          style={{
            fontSize: "15px",
            color: "#444",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          If you’ve lost your password or wish to reset it, <br />
          use the link below to get started.
        </p>

        <button
          style={{
            width: "180px",
            padding: "0.75rem",
            fontSize: "16px",
            fontWeight: "600",
            color: "#fff",
            letterSpacing: "0.5px",
            background: "linear-gradient(to bottom, #4a2f26, #2f1c14)",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            textAlign: "center",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 8px rgba(0,0,0,0.25)",
            fontFamily: "'Poppins', 'Inter', sans-serif",
            margin: "0 auto", // This ensures horizontal centering
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(to bottom, #3a251c, #1f1410)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(to bottom, #4a2f26, #2f1c14)";
          }}
        >
          Reset Password
        </button>

        <p
          style={{
            marginTop: "35px",
            fontSize: "12px",
            color: "#666",
            lineHeight: "1.5",
          }}
        >
          If you did not request a password reset, you can ignore this email.
          <br /> Only a person with access to your email can reset your account
          password.
        </p>
      </div>
    </div>
  );
}
