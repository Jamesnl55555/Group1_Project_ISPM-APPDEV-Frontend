export default function DeleteUserCard() {
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
          width: "100%",
          maxWidth: "450px",
          padding: "20px",
          textAlign: "center",
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
          margin: "0 auto",
          
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
          Delete Account
        </h1>

        <p
          style={{
            fontSize: "15px",
            color: "#444",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          Account deleted successfully.<br />
          Your account does not exist anymore.
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
            marginBottom:"2rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(to bottom, #3a251c, #1f1410)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(to bottom, #4a2f26, #2f1c14)";
          }}

          // 🔥 your delete action here
          onClick={() => alert("Account deleted")}
        >
          Back to Start
        </button>

       
      </div>
    </div>
  );
}
