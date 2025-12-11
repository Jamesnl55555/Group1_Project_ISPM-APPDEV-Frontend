import React from "react";

const Loading = () => {
  const text = "Loading...";

  const bounceStyle = {
    display: "inline-block",
    animationName: "bounce",
    animationDuration: "0.6s",
    animationIterationCount: "infinite",
    animationDirection: "alternate",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#e8d4b8",
      }}
    >
      <div style={{ fontSize: "3rem", fontWeight: "bold", display: "flex", gap: "0.25rem", color:"#3d261f" }}>
        {text.split("").map((letter, index) => (
          <span
            key={index}
            style={{
              ...bounceStyle,
              animationDelay: `${index * .1}s`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Keyframes injected directly */}
      <style>
        {`
          @keyframes bounce {
            0% { transform: translateY(0); }
            100% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
