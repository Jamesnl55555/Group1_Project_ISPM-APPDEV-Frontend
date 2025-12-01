import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useNavigate } from "react-router-dom";

export default function GenerateSalesReportCustom() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleGenerate = () => {
    if (!from || !to) return;
    navigate(`/generate-sales-report/custom?from=${from}&to=${to}`);
  };

  return (
    <AuthenticatedLayout>
      {/* PAGE HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 7rem",
        marginTop: "-1.5rem",
        marginBottom: "1rem"
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: 800,
          lineHeight: 1.3,
          WebkitTextStroke: ".8px #000",
          backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Custom Sales Report
        </h1>
        <button
          onClick={() => navigate("/generate-sales-report")}
          style={{
            backgroundColor: "#4b2e17",
            color: "white",
            padding: "0.5rem 1.5rem",
            borderRadius: "0.375rem",
            fontSize: "1rem",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#2c1b0e"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4b2e17"}
        >
          ← Back
        </button>
      </div>

      <div style={{ maxWidth: "68rem", margin: "2.5rem auto", fontFamily: "sans-serif" }}>
        {/* DATE SELECTION CARD */}
        <div style={{
          backgroundColor: "#f3e6d9",
          padding: "1.5rem",
          borderRadius: "0.75rem",
          border: "1px solid #d7bfa0",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: ".5rem", fontWeight: "600" }}>From:</label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                style={{
                  padding: "0.5rem",
                  width: "100%",
                  borderRadius: "0.375rem",
                  border: "1px solid #d7bfa0",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: ".5rem", fontWeight: "600" }}>To:</label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                style={{
                  padding: "0.5rem",
                  width: "100%",
                  borderRadius: "0.375rem",
                  border: "1px solid #d7bfa0",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>

          {/* Generate Button */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleGenerate}
              style={{
                padding: "0.5rem 1.5rem",
                fontWeight: "bold",
                backgroundColor: "#4b2e17",
                color: "#fff",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#39210f"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4b2e17"}
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
