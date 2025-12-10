import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/images/1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.1)",
          backdropFilter: "blur(3px)",
          zIndex: 10,
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          textAlign: "center",
        }}
      >
        <img
          src="/images/2.png"
          alt="88 Chocolates & More Logo"
          style={{
            width: "45vw",
            maxWidth: "450px",
            minWidth: "200px",
            marginTop: "3rem",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
          }}
        />
        <p
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            lineHeight: "1.2",
            marginTop: "1rem",
            color: "#3d1c00",
            WebkitTextStroke: ".2px white",
            WebkitTextFillColor: "#3d1c00",
            textShadow: "1px 2px rgba(0,0,0,0.5)",
            padding: "0 1rem",
          }}
        >
          "Bringing you quality chocolates at an <br />
          affordable price, always near your place."
        </p>
      </div>

      {/* Top right buttons */}
      <div
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "2.5rem",
          display: "flex",
          gap: "1rem",
          zIndex: 50,
        }}
      >
        <Link
          to="/login"
          style={{
            padding: "0.5rem 1.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            borderRadius: "0.375rem",
            border: "1px solid black",
            backgroundColor: "transparent",
            color: "black",
            textDecoration: "none",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(243,244,246,0.6)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          LOG IN
        </Link>

        <Link
          to="/register"
          style={{
            padding: "0.5rem 1.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            borderRadius: "0.375rem",
            backgroundColor: "#563d28",
            color: "white",
            textDecoration: "none",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3d1c00")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#563d28")}
        >
          SIGN UP
        </Link>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          p {
            font-size: 1.4rem !important;
          }
          img {
            width: 55vw !important;
          }
        }

        @media (max-width: 480px) {
          p {
            font-size: 1.1rem !important;
          }
          img {
            width: 65vw !important;
          }

          /* Buttons stack on mobile */
          div[style*="top: 1.5rem"] {
            flex-direction: column !important;
            right: 1rem !important;
            gap: 0.6rem !important;
          }
        }
      `}</style>
    </div>
  );
}





