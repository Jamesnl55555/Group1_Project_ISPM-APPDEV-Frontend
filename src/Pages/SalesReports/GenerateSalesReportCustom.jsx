import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "@/api/axios";

export default function GenerateSalesReportCustom() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [from, setFrom] = useState(queryParams.get("from") || "");
  const [to, setTo] = useState(queryParams.get("to") || "");

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Fetch authenticated user
  useEffect(() => {
    axios.get("/api/user").then((res) => setUser(res.data));
  }, []);

  // Fetch transactions based on from/to and page
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!from || !to) return;

      setLoading(true);
      setError("");
      try {
        const response = await axios.get("/api/fetch-custom-transactions", {
          params: { from, to, page },
        });

        if (response.data.success) {
          setTransactions(response.data.transactions || []);
          setPage(response.data.current_page || 1);
          setLastPage(response.data.last_page || 1);
        } else {
          setTransactions([]);
          setError(response.data.message || "No sales records found.");
        }
      } catch (err) {
        console.error(err);
        setTransactions([]);
        setError("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [from, to, page]);

  const handleRegenerate = () => {
    if (!from || !to) {
      alert("Please select both start and end dates.");
      return;
    }
    navigate(`/generate-sales-report/custom?from=${from}&to=${to}`);
    setPage(1); // reset to first page
  };

  const overallTotal = transactions.reduce((sum, t) => sum + Number(t.total_amount), 0);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <AuthenticatedLayout user={user}>
      {/* PAGE HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 7rem", marginTop: "-1.5rem", marginBottom: "1rem" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 800, lineHeight: 1.3, WebkitTextStroke: ".8px #000", backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Custom Sales Report
        </h1>
        <button
          onClick={() => navigate("/generate-sales-report")}
          style={{ backgroundColor: "#4b2e17", color: "white", padding: "0.5rem 1.5rem", borderRadius: "0.375rem", fontSize: "1rem", fontWeight: "bold", border: "none", cursor: "pointer" }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2c1b0e")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4b2e17")}
        >
          ← Back
        </button>
      </div>

      {/* DATE SELECTION */}
      <div style={{ maxWidth: "68rem", margin: "2.5rem auto", fontFamily: "sans-serif" }}>
        <div style={{ backgroundColor: "#f3e6d9", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #d7bfa0", marginBottom: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ marginBottom: ".5rem", display: "block", fontWeight: "600" }}>From:</label>
              <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} style={{ padding: "0.5rem", width: "100%", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }} />
            </div>
            <div>
              <label style={{ marginBottom: ".5rem", display: "block", fontWeight: "600" }}>To:</label>
              <input type="date" value={to} onChange={(e) => setTo(e.target.value)} style={{ padding: "0.5rem", width: "100%", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={handleRegenerate} style={{ padding: "0.5rem 1.5rem", fontWeight: "bold", backgroundColor: "#4b2e17", color: "#fff", borderRadius: "0.375rem", border: "none", cursor: "pointer" }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#39210f")} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4b2e17")}>
              Generate Report
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #d7bfa0", borderRadius: "0.75rem", padding: "1rem", overflowX: "auto", marginBottom: "2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
            <thead style={{ backgroundColor: "#f3e6d9", color: "#4b2e17" }}>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Action</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" style={{ padding: "1rem" }}>Loading...</td></tr>
              ) : transactions.length ? (
                transactions.map((t, idx) => (
                  <tr key={idx}>
                    <td>{formatDate(t.created_at)}</td>
                    <td>{t.user}</td>
                    <td>Sale</td>
                    <td>₱ {t.total_amount}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" style={{ padding: "1rem" }}>No transactions found for the selected date range.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {lastPage > 1 && (
          <div className="flex justify-center gap-4 mb-4">
            <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>⬅ Prev</button>
            <button disabled={page === lastPage} onClick={() => setPage(p => Math.min(lastPage, p + 1))}>Next ➡</button>
          </div>
        )}

        {/* OVERALL TOTAL */}
        <div style={{ backgroundColor: "#f1f1f1", padding: "1rem", borderRadius: "0.75rem", border: "1px solid #d7bfa0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Overall Total</span>
          <span style={{ color: "green", fontWeight: "bold" }}>₱ {overallTotal}</span>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
