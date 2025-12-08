import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useLocation } from "react-router-dom";
import axios from "@/api/axios";

export default function CapitalReportDaily() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get("date"); // passed from GenerateCapitalReport daily selection

  const [records, setRecords] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDailyCapital = async () => {
    if (!selectedDate) return;

    try {
      setLoading(true);

      // Get authenticated user
      if (!user) {
        const userRes = await axios.get("/api/user");
        setUser(userRes.data);

      }

      const response = await axios.get("/api/capital-daily", {
        params: { date: selectedDate },
      });

      if (response.data.success) {
        setRecords(response.data.daily_capital || []);
        setLoading(false);
      } else {
        setRecords([]);
      }
    } catch (err) {
      console.error("Error fetching daily capital:", err);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyCapital();
  }, [selectedDate]);

  const overallTotal = records.reduce((sum, r) => sum + Number(r.amount || 0), 0);

  return (
    <AuthenticatedLayout user={user}>
      {/* PAGE HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 7rem", marginTop: "-1.5rem", marginBottom: "1rem" }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: 800,
          lineHeight: 1.3,
          WebkitTextStroke: ".8px #000",
          backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Daily Capital Report
        </h1>
      </div>

      <div style={{ maxWidth: "68rem", margin: "2.5rem auto", fontFamily: "sans-serif" }}>
        {/* SUMMARY CARD */}
        <div style={{ marginTop: "-3.4rem", backgroundColor: "#f3e6d9", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #d7bfa0", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span>Total Capital for {selectedDate}</span>
            <span>₱ {overallTotal}</span>
          </div>
        </div>

        {/* TABLE */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #d7bfa0", borderRadius: "0.75rem", padding: "1rem", overflowX: "auto", marginBottom: "2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
            <thead style={{ backgroundColor: "#f3e6d9", color: "#4b2e17" }}>
              <tr>
                <th style={{ padding: ".5rem" }}>Date</th>
                <th style={{ padding: ".5rem" }}>Amount</th>
                <th style={{ padding: ".5rem" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" style={{ padding: "1rem" }}>Loading...</td>
                </tr>
              ) : records.length ? (
                records.map((item, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #f0e4d7" }}>
                    <td style={{ padding: ".5rem" }}>{item.date}</td>
                    <td style={{ padding: ".5rem" }}>₱ {item.amount}</td>
                    <td style={{ padding: ".5rem" }}>{item.action}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ padding: "1rem", color: "#444" }}>No capital records found for this day.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* OVERALL TOTAL */}
        <div style={{ backgroundColor: "#f1f1f1", padding: "1rem", borderRadius: "0.75rem", border: "1px solid #d7bfa0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Overall Total Capital</span>
          <span style={{ color: "green", fontWeight: "bold" }}>₱ {overallTotal}</span>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
