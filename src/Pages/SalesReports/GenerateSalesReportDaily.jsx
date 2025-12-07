import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "react-router-dom";
import axios from "axios";

export default function GenerateSalesReportDaily() {
  const [dailySales, setDailySales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDaily = async () => {
      try {
        const response = await axios.get("/api/fetch-daily");
        console.log("API response:", response.data);
        if (response.data.success) {
          setDailySales(response.data.daily_sales);
        }
      } catch (error) {
        console.error("Error fetching daily sales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDaily();
  }, []);

  // Format date as "MMM DD, YYYY"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Compute overall total
  const overallTotal = dailySales.reduce(
    (sum, s) => sum + Number(s.amount),
    0
  );

  return (
    <AuthenticatedLayout user={user}>
      {/* PAGE HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "7rem",
          paddingRight: "7rem",
          marginTop: "-1.5rem",
          marginBottom: "1rem",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 800,
            lineHeight: 1.3,
            WebkitTextStroke: ".8px #000000",
            backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Daily Sales Report
        </h1>

        <Link
          to="/generate-sales-report"
          style={{
            backgroundColor: "#4b2e17",
            color: "white",
            padding: "0.5rem 1.5em",
            borderRadius: "0.375rem",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            textDecoration: "none",
            marginTop: "1rem",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2c1b0e")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4b2e17")}
        >
          ← Back
        </Link>
      </div>

      <div style={{ maxWidth: "68rem", margin: "2.5rem auto", fontFamily: "sans-serif" }}>
        {/* SUMMARY CARD */}
        <div
          style={{
            marginTop: "-3.4rem",
            backgroundColor: "#f3e6d9",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            border: "1px solid #d7bfa0",
            marginBottom: "2rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span>Total Sales Used</span>
            <span>₱ {overallTotal}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span>Net Profit/Loss</span>
            <span>₱ {overallTotal}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{
                padding: "0.5rem 1.5rem",
                backgroundColor: "#4b2e17",
                color: "#fff",
                border: "none",
                borderRadius: "0.375rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#39210f")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4b2e17")}
            >
              Export Report
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #d7bfa0",
            borderRadius: "0.75rem",
            padding: "1rem",
            overflowX: "auto",
            marginBottom: "2rem",
          }}
        >
          <h3
            style={{
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#4b2e17",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Sales Summary</span>
            <span>Daily</span>
          </h3>

          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
            <thead style={{ backgroundColor: "#f3e6d9", color: "#4b2e17" }}>
              <tr>
                <th style={{ width: "30%" }}>Date</th>
                <th style={{ width: "25%" }}>User</th>
                <th style={{ width: "25%" }}>Action</th>
                <th style={{ width: "20%" }}>Amount</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" style={{ padding: "1rem" }}>
                    Loading...
                  </td>
                </tr>
              ) : dailySales.length ? (
                dailySales.map((s, index) => (
                  <tr key={index}>
                    <td>{formatDate(s.date)}</td>
                    <td>{s.user}</td>
                    <td>{s.action}</td>
                    <td>₱ {s.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "1rem" }}>
                    No sales records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* OVERALL TOTAL */}
        <div
          style={{
            backgroundColor: "#f1f1f1",
            padding: "1rem",
            borderRadius: "0.75rem",
            border: "1px solid #d7bfa0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Overall Total Sales</span>
          <span style={{ color: "green", fontWeight: "bold" }}>₱ {overallTotal}</span>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
