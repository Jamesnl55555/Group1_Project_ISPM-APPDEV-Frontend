import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";

export default function TransactionRecord() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const perPage = 10;

  const fetchTransactions = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/fetchtransactions", {
        params: { page, per_page: perPage },
      });
      setTransactions(response.data.transactions);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < lastPage) setCurrentPage((prev) => prev + 1);
  };

  return (
    <AuthenticatedLayout>
      <div style={{ maxWidth: "68rem", margin: "2.5rem auto", fontFamily: "sans-serif" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h1 style={{
            fontSize: "3rem",
            fontWeight: 800,
            lineHeight: 1.3,
            WebkitTextStroke: ".8px #000",
            backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Transaction Records
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              backgroundColor: "#4b2e17",
              color: "white",
              padding: "0.5rem 1.5rem",
              borderRadius: "0.375rem",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            ← Back
          </button>
        </div>

        {/* Search */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Search Transaction #"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: "0.5rem",
              borderRadius: "0.375rem",
              border: "1px solid #d7bfa0",
            }}
          />
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
            <thead style={{ backgroundColor: "#f3e6d9" }}>
              <tr>
                <th style={{ border: "1px solid #d7bfa0", padding: ".5rem" }}>Transaction #</th>
                <th style={{ border: "1px solid #d7bfa0", padding: ".5rem" }}>Date & Time</th>
                <th style={{ border: "1px solid #d7bfa0", padding: ".5rem" }}>Total Amount</th>
                <th style={{ border: "1px solid #d7bfa0", padding: ".5rem" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" style={{ padding: "1rem" }}>Loading...</td></tr>
              ) : transactions.length ? (
                transactions
                  .filter((t) => t.id.toString().includes(search))
                  .map((t, idx) => (
                    <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#fffaf6" : "#f6ebdf" }}>
                      <td style={{ padding: ".5rem" }}>#{t.id.toString().padStart(10, "0")}</td>
                      <td style={{ padding: ".5rem" }}>{new Date(t.created_at).toLocaleString()}</td>
                      <td style={{ padding: ".5rem" }}>₱ {t.total_amount}</td>
                      <td style={{ padding: ".5rem" }}>
                        <button
                          onClick={() => navigate(`/transactions/${t.id}`)}
                          style={{
                            backgroundColor: "#4b2e17",
                            color: "white",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "0.375rem",
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          Show More
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr><td colSpan="4" style={{ padding: "1rem", color: "#444" }}>No transaction records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem", gap: "1rem" }}>
          <button onClick={handlePrevPage} disabled={currentPage === 1} style={{
            padding: "0.5rem 1rem",
            backgroundColor: currentPage === 1 ? "#ccc" : "#4b2e17",
            color: "white",
            borderRadius: "0.375rem",
            cursor: currentPage === 1 ? "not-allowed" : "pointer"
          }}>
            Previous
          </button>
          <span style={{ alignSelf: "center" }}>Page {currentPage} of {lastPage}</span>
          <button onClick={handleNextPage} disabled={currentPage === lastPage} style={{
            padding: "0.5rem 1rem",
            backgroundColor: currentPage === lastPage ? "#ccc" : "#4b2e17",
            color: "white",
            borderRadius: "0.375rem",
            cursor: currentPage === lastPage ? "not-allowed" : "pointer"
          }}>
            Next
          </button>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
