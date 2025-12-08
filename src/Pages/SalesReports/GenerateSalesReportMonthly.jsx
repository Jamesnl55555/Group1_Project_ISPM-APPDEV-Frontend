import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useLocation } from "react-router-dom";
import axios from "@/api/axios";

export default function GenerateSalesReportMonthly() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedMonth = queryParams.get("month"); // '01', '02', ..., '12'
  const selectedYear = queryParams.get("year"); // e.g. '2025'

  const [monthlySales, setMonthlySales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchMonthly = async (pageNumber = 1) => {
    try {
      setLoading(true);

      if (!user) {
        const userRes = await axios.get("/api/user");
        setUser(userRes.data);
      }

      const response = await axios.get("/api/fetch-monthly", {
        params: {
          page: pageNumber,
          month: selectedMonth,
          year: selectedYear,
        },
      });

      if (response.data.success) {
        setMonthlySales(response.data.monthly_sales || []);
        setLastPage(response.data.last_page || 1);
        setPage(response.data.current_page || pageNumber);
      } else {
        setMonthlySales([]);
        setLastPage(1);
      }
    } catch (error) {
      console.error("Error fetching monthly sales:", error);
      setMonthlySales([]);
      setLastPage(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthly(page);
  }, [page, selectedMonth, selectedYear]);

  const overallTotal = monthlySales.reduce((sum, s) => sum + Number(s.amount || 0), 0);

  return (
    <AuthenticatedLayout user={user}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: "7rem", paddingRight: "7rem", marginTop: "-1.5rem", marginBottom: "1rem" }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: 800,
          lineHeight: 1.3,
          WebkitTextStroke: ".8px #000",
          backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Monthly Sales Report
        </h1>

        <Link
          to="/generate-sales-report"
          style={{
            backgroundColor: "#4b2e17",
            color: "white",
            padding: "0.5rem 1.5rem",
            borderRadius: "0.375rem",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            textDecoration: "none",
            marginTop: "1rem",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2c1b0e")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4b2e17")}
        >
          ← Back
        </Link>
      </div>

      <div style={{ maxWidth: "68rem", margin: "2.5rem auto", fontFamily: "sans-serif" }}>
        {/* SUMMARY CARD */}
        <div style={{ marginTop: "-3.4rem", backgroundColor: "#f3e6d9", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #d7bfa0", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span>Total Sales Used</span>
            <span>₱ {overallTotal}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Net Profit/Loss</span>
            <span>₱ {overallTotal}</span>
          </div>
        </div>

        {/* TABLE */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #d7bfa0", borderRadius: "0.75rem", padding: "1rem", overflowX: "auto", marginBottom: "2rem" }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "1rem", color: "#4b2e17", display: "flex", justifyContent: "space-between" }}>
            <span>Sales Summary</span>
            <span>{selectedMonth}/{selectedYear}</span>
          </h3>

          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
            <thead style={{ backgroundColor: "#f3e6d9", color: "#4b2e17" }}>
              <tr>
                <th style={{ padding: ".5rem" }}>Date</th>
                <th style={{ padding: ".5rem" }}>User</th>
                <th style={{ padding: ".5rem" }}>Action</th>
                <th style={{ padding: ".5rem" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" style={{ padding: "1rem" }}>Loading...</td>
                </tr>
              ) : monthlySales.length ? (
                monthlySales.map((s, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #f0e4d7" }}>
                    <td style={{ padding: ".5rem" }}>{s.date}</td>
                    <td style={{ padding: ".5rem" }}>{s.user}</td>
                    <td style={{ padding: ".5rem" }}>{s.action}</td>
                    <td style={{ padding: ".5rem" }}>₱ {s.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ padding: "1rem", color: "#444" }}>No sales records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {lastPage > 1 && (
          <div className="flex justify-center gap-4 my-4">
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
        )}

        {/* OVERALL TOTAL */}
        <div style={{ backgroundColor: "#f1f1f1", padding: "1rem", borderRadius: "0.75rem", border: "1px solid #d7bfa0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Overall Total Sales</span>
          <span style={{ color: "green", fontWeight: "bold" }}>₱ {overallTotal}</span>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
