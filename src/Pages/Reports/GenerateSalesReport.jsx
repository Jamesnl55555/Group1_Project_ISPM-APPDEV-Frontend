import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function GenerateSalesReportCustom() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [from, setFrom] = useState(queryParams.get("from") || "");
  const [to, setTo] = useState(queryParams.get("to") || "");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch the custom report whenever from/to changes
  useEffect(() => {
    const fetchCustomReport = async () => {
      if (!from || !to) return;

      setLoading(true);
      setError("");
      try {
        const response = await axios.get("/api/fetch-custom", {
          params: { from, to },
        });

        if (response.data.success) {
          setReportData(response.data.custom_sales);
        } else {
          setReportData(null);
          setError(response.data.message || "No sales records found.");
        }
      } catch (err) {
        setReportData(null);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomReport();
  }, [from, to]);

  const handleRegenerate = () => {
    if (!from || !to) {
      alert("Please select both start and end dates.");
      return;
    }
    navigate(`/generate-sales-report/custom?from=${from}&to=${to}`);
  };

  return (
    <AuthenticatedLayout>
      {/* PAGE HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 7rem",
          marginTop: "-1.5rem",
          marginBottom: "1rem",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 800,
            lineHeight: 1.3,
            WebkitTextStroke: ".8px #000",
            backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Custom Sales Report
        </h1>
        <button
          onClick={() => navigate("/sales-report")}
          style={{
            backgroundColor: "#4b2e17",
            color: "white",
            padding: "0.5rem 1.5rem",
            borderRadius: "0.375rem",
            fontSize: "1rem",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2c1b0e")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4b2e17")}
        >
          ← Back
        </button>
      </div>

      <div style={{ maxWidth: "68rem", margin: "2.5rem auto", fontFamily: "sans-serif" }}>
        {/* DATE SELECTION CARD */}
        <div
          style={{
            backgroundColor: "#f3e6d9",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            border: "1px solid #d7bfa0",
            marginBottom: "1rem",
          }}
        >
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
                  boxSizing: "border-box",
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
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Generate Button */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleRegenerate}
              style={{
                padding: "0.5rem 1.5rem",
                fontWeight: "bold",
                backgroundColor: "#4b2e17",
                color: "#fff",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#39210f")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4b2e17")}
            >
              Generate Report
            </button>
          </div>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
          <button
            onClick={() => navigate("/generate-sales-report/daily")}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "0.375rem",
              backgroundColor: "#c5a888",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Daily
          </button>
          <button
            onClick={() => navigate("/generate-sales-report/weekly")}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "0.375rem",
              backgroundColor: "#c5a888",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Weekly
          </button>
          <button
            onClick={() => navigate("/generate-sales-report/monthly")}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "0.375rem",
              backgroundColor: "#c5a888",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Monthly
          </button>
        </div>

        {/* REPORT DISPLAY */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            border: "1px solid #d7bfa0",
            textAlign: "center",
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : reportData ? (
            <>
              <p>
                <strong>User:</strong> {reportData.user}
              </p>
              <p>
                <strong>Action:</strong> {reportData.action}
              </p>
              <p>
                <strong>Date Range:</strong> {reportData.from} → {reportData.to}
              </p>
              <p style={{ marginTop: "1rem", fontWeight: "bold", color: "green" }}>
                Total Sales: ₱ {reportData.amount}
              </p>
            </>
          ) : (
            <p>No sales records found for the selected date range.</p>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
