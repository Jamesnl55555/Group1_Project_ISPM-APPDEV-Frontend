import { useState, useEffect } from "react";
import axios from "@/api/axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useNavigate } from "react-router-dom";

export default function CreateReport() {
  const [transactions, setTransactions] = useState([]);
  const [transactionsPage, setTransactionsPage] = useState(1);
  const [transactionsLastPage, setTransactionsLastPage] = useState(1);

  const [capitals, setCapitals] = useState([]);
  const [capitalsPage, setCapitalsPage] = useState(1);
  const [capitalsLastPage, setCapitalsLastPage] = useState(1);

  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [loadingCapitals, setLoadingCapitals] = useState(true);

  const navigate = useNavigate();

  // Fetch transactions
  const fetchTransactions = async (page = 1) => {
    setLoadingTransactions(true);
    try {
      const res = await axios.get("/api/fetchtransactions", { params: { page, per_page: 10 } });
      setTransactions(res.data.transactions || []);
      setTransactionsPage(res.data.current_page || 1);
      setTransactionsLastPage(res.data.last_page || 1);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setTransactions([]);
    } finally {
      setLoadingTransactions(false);
    }
  };

  // Fetch capitals
  const fetchCapitals = async (page = 1) => {
    setLoadingCapitals(true);
    try {
      const res = await axios.get("/api/fetchcapital", { params: { page, per_page: 10 } });
      setCapitals(res.data.capitals || []);
      setCapitalsPage(res.data.current_page || 1);
      setCapitalsLastPage(res.data.last_page || 1);
    } catch (err) {
      console.error("Failed to fetch capitals:", err);
      setCapitals([]);
    } finally {
      setLoadingCapitals(false);
    }
  };

  useEffect(() => {
    fetchTransactions(transactionsPage);
  }, [transactionsPage]);

  useEffect(() => {
    fetchCapitals(capitalsPage);
  }, [capitalsPage]);

  return (
    <AuthenticatedLayout>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: "7rem", paddingRight: "7rem", marginTop: "-1.5rem", marginBottom: "1rem" }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: 800,
          lineHeight: 1.3,
          WebkitTextStroke: ".8px #000",
          backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Create Report
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
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2c1b0eff")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4b2e17")}
        >
          ← Back
        </button>
      </div>

      {/* BUTTONS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        <button
          style={{
            textAlign: "left",
            border: "2px solid #4b2e17",
            backgroundColor: "#f9f5f0",
            color: "#000",
            fontWeight: 700,
            fontSize: "1.5rem",
            padding: "0.75rem 2rem",
            cursor: "pointer",
            width: "67rem",
            marginLeft: "7rem",
            transition: "0.3s",
          }}
          onClick={() => navigate("/generate-sales-report")}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e8d4b8")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f9f5f0")}
        >
          Generate Sales Report
        </button>

        <button
          style={{
            textAlign: "left",
            border: "2px solid #4b2e17",
            backgroundColor: "#f9f5f0",
            color: "#000",
            fontWeight: 700,
            fontSize: "1.5rem",
            padding: "0.75rem 2rem",
            cursor: "pointer",
            width: "67rem",
            marginLeft: "7rem",
            transition: "0.3s",
          }}
          onClick={() => navigate("/generate-capital-report")}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e8d4b8")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f9f5f0")}
        >
          Generate Capital Report
        </button>
      </div>

      {/* TABLES */}
      <div style={{ maxWidth: "68rem", margin: "2rem auto", display: "flex", flexDirection: "column", gap: "3rem" }}>
        {/* SALES TABLE */}
        <section>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#000", marginLeft: ".3rem", marginBottom: ".5rem", marginTop: "-.5rem" }}>
            Sales History
          </h2>
          <div style={{ border: "1.5px solid #000", backgroundColor: "white", padding: "0", boxShadow: "5px 5px 0px rgba(0,0,0,0.25)", overflowY: "auto", maxHeight: "220px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#e5e5e5" }}>
                  <th style={{ padding: "0.7rem", borderRight: "1px solid #bdbdbd" }}>Sales Transaction #</th>
                  <th style={{ padding: "0.7rem", borderRight: "1px solid #bdbdbd" }}>Date</th>
                  <th style={{ padding: "0.7rem", borderRight: "1px solid #bdbdbd" }}>Total Sales</th>
                  <th style={{ padding: "0.7rem" }}></th>
                </tr>
              </thead>
              <tbody>
                {loadingTransactions ? (
                  <tr><td colSpan="4" style={{ padding: "1rem", textAlign: "center" }}>Loading...</td></tr>
                ) : transactions.length ? (
                  transactions.map((item) => (
                    <tr key={item.id} style={{ backgroundColor: "white", transition: "0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f3f3")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}>
                      <td style={{ padding: "0.7rem", borderTop: "1px solid #ddd", borderRight: "1px solid #ddd" }}>#{item.id}</td>
                      <td style={{ padding: "0.7rem", borderTop: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{new Date(item.created_at).toLocaleString()}</td>
                      <td style={{ padding: "0.7rem", borderTop: "1px solid #ddd", borderRight: "1px solid #ddd" }}>₱ {item.total_amount}</td>
                      <td style={{ padding: "0.7rem", borderTop: "1px solid #ddd", textAlign: "center", fontSize: "1.1rem" }}>→</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" style={{ textAlign: "center", padding: "1rem", color: "#444" }}>No sales records found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Transactions Pagination */}
          {transactionsLastPage > 1 && (
            <div className="flex justify-center gap-2 mt-2">
              <button disabled={transactionsPage === 1} onClick={() => setTransactionsPage(p => Math.max(1, p - 1))}>⬅ Prev</button>
              <span>{transactionsPage} / {transactionsLastPage}</span>
              <button disabled={transactionsPage === transactionsLastPage} onClick={() => setTransactionsPage(p => Math.min(transactionsLastPage, p + 1))}>Next ➡</button>
            </div>
          )}
        </section>

        {/* CAPITAL TABLE */}
        <section>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#000", marginLeft: ".3rem", marginBottom: ".5rem", marginTop: "-.5rem" }}>
            Capital History
          </h2>
          <div style={{ border: "1.5px solid #000", backgroundColor: "white", padding: "0", boxShadow: "5px 5px 0px rgba(0,0,0,0.25)", overflowY: "auto", maxHeight: "220px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#e5e5e5" }}>
                  <th style={{ padding: "0.7rem", borderRight: "1px solid #bdbdbd" }}>Capital #</th>
                  <th style={{ padding: "0.7rem", borderRight: "1px solid #bdbdbd" }}>Date</th>
                  <th style={{ padding: "0.7rem", borderRight: "1px solid #bdbdbd" }}>Total Capital</th>
                  <th style={{ padding: "0.7rem" }}></th>
                </tr>
              </thead>
              <tbody>
                {loadingCapitals ? (
                  <tr><td colSpan="4" style={{ padding: "1rem", textAlign: "center" }}>Loading...</td></tr>
                ) : capitals.length ? (
                  capitals.map((item) => (
                    <tr key={item.id} style={{ backgroundColor: "white", transition: "0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f3f3")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}>
                      <td style={{ padding: "0.7rem", borderTop: "1px solid #ddd", borderRight: "1px solid #ddd" }}>#{item.id}</td>
                      <td style={{ padding: "0.7rem", borderTop: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{new Date(item.created_at).toLocaleString()}</td>
                      <td style={{ padding: "0.7rem", borderTop: "1px solid #ddd", borderRight: "1px solid #ddd" }}>₱ {item.amount}</td>
                      <td style={{ padding: "0.7rem", borderTop: "1px solid #ddd", textAlign: "center", fontSize: "1.1rem" }}>→</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" style={{ textAlign: "center", padding: "1rem", color: "#444" }}>No capital records found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Capitals Pagination */}
          {capitalsLastPage > 1 && (
            <div className="flex justify-center gap-2 mt-2">
              <button disabled={capitalsPage === 1} onClick={() => setCapitalsPage(p => Math.max(1, p - 1))}>⬅ Prev</button>
              <span>{capitalsPage} / {capitalsLastPage}</span>
              <button disabled={capitalsPage === capitalsLastPage} onClick={() => setCapitalsPage(p => Math.min(capitalsLastPage, p + 1))}>Next ➡</button>
            </div>
          )}
        </section>
      </div>
    </AuthenticatedLayout>
  );
}
