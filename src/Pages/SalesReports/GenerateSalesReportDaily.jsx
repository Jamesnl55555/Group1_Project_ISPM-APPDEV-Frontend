import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useLocation } from "react-router-dom";
import axios from "@/api/axios";

export default function GenerateSalesReportDaily() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get("date"); // <-- Get date from query

  const [dailySales, setDailySales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchDaily = async (pageNumber = 1) => {
    try {
      setLoading(true);

      // Fetch authenticated user
      if (!user) {
        const userRes = await axios.get("/api/user");
        setUser(userRes.data);
      }

      // Fetch daily sales for the selected day
      const res = await axios.get(`/api/fetch-daily?page=${pageNumber}`, {
        params: { date: selectedDate },
      });

      if (res.data.success) {
        setDailySales(res.data.daily_sales || []);
        setLastPage(res.data.last_page || 1);
        setPage(res.data.current_page || 1);
      } else {
        setDailySales([]);
      }
    } catch (error) {
      console.error("Error fetching daily sales:", error);
      setDailySales([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDaily(page);
  }, [page, selectedDate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const overallTotal = dailySales.reduce((sum, s) => sum + Number(s.amount), 0);

  return (
    <AuthenticatedLayout user={user}>
      {/* PAGE HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: "7rem", paddingRight: "7rem", marginTop: "-1.5rem", marginBottom: "1rem" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 800, lineHeight: 1.3, WebkitTextStroke: ".8px #000000", backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Daily Sales Report
        </h1>

        <Link
          to="/generate-sales-report"
          style={{ backgroundColor: "#4b2e17", color: "white", padding: "0.5rem 1.5em", borderRadius: "0.375rem", fontSize: "1rem", fontWeight: "bold", cursor: "pointer", textDecoration: "none", marginTop: "1rem", transition: "all 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2c1b0e")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4b2e17")}
        >
          ← Back
        </Link>
      </div>

      <div style={{ maxWidth: "68rem", margin: "2.5rem auto", fontFamily: "sans-serif" }}>
        {/* SUMMARY CARD */}
        <div style={{ marginTop: "-3.4rem", backgroundColor: "#f3e6d9", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #d7bfa0", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span>Total Sales Used</span>
            <span>₱ {overallTotal}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span>Net Profit/Loss</span>
            <span>₱ {overallTotal}</span>
          </div>
        </div>

        {/* TABLE */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #d7bfa0", borderRadius: "0.75rem", padding: "1rem", overflowX: "auto", marginBottom: "2rem" }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "1rem", color: "#4b2e17", display: "flex", justifyContent: "space-between" }}>
            <span>Sales Summary</span>
            <span>{formatDate(selectedDate)}</span>
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
                  <td colSpan="4" style={{ padding: "1rem" }}>Loading...</td>
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
                  <td colSpan="4" style={{ textAlign: "center", padding: "1rem" }}>No sales records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center mt-4 gap-4">
          <button
            className={`px-4 py-2 border rounded ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-200"}`}
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ⬅ Prev
          </button>

          <button
            className={`px-4 py-2 border rounded ${page === lastPage ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-200"}`}
            disabled={page === lastPage}
            onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
          >
            Next ➡
          </button>
        </div>

        {/* OVERALL TOTAL */}
        <div style={{ backgroundColor: "#f1f1f1", padding: "1rem", borderRadius: "0.75rem", border: "1px solid #d7bfa0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Overall Total Sales</span>
          <span style={{ color: "green", fontWeight: "bold" }}>₱ {overallTotal}</span>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
