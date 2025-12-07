import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";

export default function GenerateSalesReportCustom() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [customSales, setCustomSales] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const handleGenerate = async () => {
    if (!from || !to) {
      setError("Please select both 'From' and 'To' dates.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get("/api/fetch-custom", {
        params: { from, to },
      });
      
      const userRes = await axios.get("/api/user");
      setUser(userRes.data);
      if (response.data.success) {
        setCustomSales(response.data.custom_sales);
      } else {
        setCustomSales(null);
        setError(response.data.message || "No sales found for this range.");
      }
    } catch (err) {
      console.error("Error fetching custom sales:", err);
      setError("Failed to fetch sales data.");
      setCustomSales(null);
    } finally {
      setLoading(false);
    }
  };

  handleGenerate();
  } )
 

  return (
    <AuthenticatedLayout user={user}>
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
      </div>

      <div style={{ maxWidth: "68rem", margin: "2.5rem auto", fontFamily: "sans-serif" }}>
        {/* DATE SELECTION CARD */}
        <div
          style={{
            backgroundColor: "#f3e6d9",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            border: "1px solid #d7bfa0",
            marginBottom: "2rem",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: ".5rem", fontWeight: "600" }}>From:</label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                style={{ padding: "0.5rem", width: "100%", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: ".5rem", fontWeight: "600" }}>To:</label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                style={{ padding: "0.5rem", width: "100%", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }}
              />
            </div>
          </div>

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
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#39210f")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4b2e17")}
            >
              Generate Report
            </button>
          </div>
        </div>

        {/* RESULT CARD */}
        {loading && <p>Loading...</p>}

        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

        {customSales && (
          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #d7bfa0",
              borderRadius: "0.75rem",
              padding: "1.5rem",
            }}
          >
            <h3 style={{ fontWeight: "bold", marginBottom: "1rem", color: "#4b2e17" }}>
              Sales from {customSales.from} to {customSales.to}
            </h3>

            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
              <thead style={{ backgroundColor: "#f3e6d9", color: "#4b2e17" }}>
                <tr>
                  <th style={{ border: "1px solid #d7bfa0", padding: "0.5rem" }}>User</th>
                  <th style={{ border: "1px solid #d7bfa0", padding: "0.5rem" }}>Action</th>
                  <th style={{ border: "1px solid #d7bfa0", padding: "0.5rem" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: "1px solid #d7bfa0", padding: "0.5rem" }}>{customSales.user}</td>
                  <td style={{ border: "1px solid #d7bfa0", padding: "0.5rem" }}>{customSales.action}</td>
                  <td style={{ border: "1px solid #d7bfa0", padding: "0.5rem" }}>₱ {customSales.amount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
