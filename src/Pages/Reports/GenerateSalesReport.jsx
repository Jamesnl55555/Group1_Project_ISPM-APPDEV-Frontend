import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";

export default function GenerateSalesReport() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [week, setWeek] = useState("");

  const [monthlySales, setMonthlySales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const routeMap = {
    Daily: "/generate-sales-report/daily",
    Weekly: "/generate-sales-report/weekly",
    Monthly: "/generate-sales-report/monthly",
    Custom: "/generate-sales-report/custom",
  };

  // Fetch authenticated user
  useEffect(() => {
    axios.get("/api/user").then((res) => setUser(res.data));
  }, []);

  // Auto-fill dates for Daily
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (reportType === "Daily") {
      setFromDate(today);
      setToDate(today);
    } else {
      setFromDate("");
      setToDate("");
      setMonth("");
      setYear("");
      setWeek("");
    }
  }, [reportType]);

  // Weekly date calculation
  const handleWeeklySelection = (selectedWeek, selectedMonth, selectedYear) => {
    if (!selectedWeek || !selectedMonth || !selectedYear) return;
    const yearNum = Number(selectedYear);
    const monthNum = Number(selectedMonth) - 1;
    const startDay = (selectedWeek - 1) * 7 + 1;
    const endDay = Math.min(selectedWeek * 7, new Date(yearNum, monthNum + 1, 0).getDate());
    const startDate = new Date(yearNum, monthNum, startDay);
    const endDate = new Date(yearNum, monthNum, endDay);
    setFromDate(startDate.toISOString().split("T")[0]);
    setToDate(endDate.toISOString().split("T")[0]);
  };

  // Monthly date calculation
  const handleMonthlyChange = (monthValue, yearValue) => {
    if (!monthValue || !yearValue) return;
    const firstDay = new Date(yearValue, monthValue - 1, 1).toISOString().split("T")[0];
    const lastDay = new Date(yearValue, monthValue, 0).toISOString().split("T")[0];
    setFromDate(firstDay);
    setToDate(lastDay);
  };

  const handleGenerate = () => {
    if (!reportType) return;
    if (reportType === "Custom" && (!fromDate || !toDate)) {
      alert("Please select both start and end dates for the custom report.");
      return;
    }
    const query = reportType === "Custom" ? `?from=${fromDate}&to=${toDate}` : "";
    navigate(routeMap[reportType] + query);
  };

  // Fetch sales data whenever date range changes
  useEffect(() => {
    const fetchSales = async () => {
      if (!fromDate || !toDate) return;

      setLoading(true);
      try {
        const response = await axios.get("/api/fetch-custom-sales", {
          params: { from: fromDate, to: toDate },
        });

        if (response.data.success) {
          setMonthlySales(Array.isArray(response.data.custom_sales) ? response.data.custom_sales : []);
        } else {
          setMonthlySales([]);
        }
      } catch (err) {
        console.error("Error fetching sales:", err);
        setMonthlySales([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, [fromDate, toDate]);

  const overallTotal = monthlySales.reduce((sum, t) => sum + Number(t.amount || 0), 0);

  return (
    <AuthenticatedLayout user={user}>
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
            Generate Sales Report
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

        {/* Report Type Selection */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {["Daily", "Weekly", "Monthly", "Custom"].map((type) => (
            <div key={type} style={{
              padding: "1rem",
              borderRadius: "0.75rem",
              cursor: "pointer",
              border: reportType === type ? "2px solid #4b2e17" : "1px solid #d7bfa0",
              backgroundColor: reportType === type ? "#f3e6d9" : "#f9f5f0"
            }} onClick={() => setReportType(type)}>
              <p style={{ fontWeight: "bold" }}>{type}</p>
              <p style={{ fontSize: "0.875rem", color: "#555" }}>
                {type === "Daily" && "Pick a single date"}
                {type === "Weekly" && "Select week, month, and year"}
                {type === "Monthly" && "Select a month"}
                {type === "Custom" && "Select start and end dates"}
              </p>
            </div>
          ))}
        </div>

        {/* Date Inputs */}
        <div style={{ display: "grid", gridTemplateColumns: reportType === "Custom" ? "1fr 1fr" : "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {reportType === "Daily" && (
            <input type="date" value={fromDate} onChange={(e) => { setFromDate(e.target.value); setToDate(e.target.value); }}
              style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }}
            />
          )}
          {reportType === "Weekly" && (
            <>
              <select value={week} onChange={(e) => { setWeek(e.target.value); handleWeeklySelection(e.target.value, month, year); }}
                style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }}>
                <option value="">Week</option>
                {Array.from({ length: 5 }, (_, i) => i + 1).map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
              <select value={month} onChange={(e) => { setMonth(e.target.value); handleWeeklySelection(week, e.target.value, year); }}
                style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }}>
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <select value={year} onChange={(e) => { setYear(e.target.value); handleWeeklySelection(week, month, e.target.value); }}
                style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }}>
                <option value="">Year</option>
                {Array.from({ length: 11 }, (_, i) => 2020 + i).map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </>
          )}
          {reportType === "Monthly" && (
            <>
              <select value={month} onChange={(e) => { setMonth(e.target.value); handleMonthlyChange(e.target.value, year); }}
                style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }}>
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <select value={year} onChange={(e) => { setYear(e.target.value); handleMonthlyChange(month, e.target.value); }}
                style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }}>
                <option value="">Year</option>
                {Array.from({ length: 11 }, (_, i) => 2020 + i).map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </>
          )}
          {reportType === "Custom" && (
            <>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)}
                style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }} />
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)}
                style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }} />
            </>
          )}
        </div>

        {/* Generate Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "2rem" }}>
          <button onClick={handleGenerate} disabled={!reportType}
            style={{
              padding: "0.5rem 1.5rem",
              fontWeight: "bold",
              borderRadius: "0.375rem",
              border: "1px solid #4b2e17",
              backgroundColor: reportType ? "#f3e6d9" : "#f9f5f0",
              cursor: reportType ? "pointer" : "not-allowed"
            }}>
            Generate Report
          </button>
        </div>

        {/* Sales Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
            <thead style={{ backgroundColor: "#f3e6d9" }}>
              <tr>
                <th style={{ border: "1px solid #d7bfa0", padding: ".5rem" }}>Date</th>
                <th style={{ border: "1px solid #d7bfa0", padding: ".5rem" }}>User</th>
                <th style={{ border: "1px solid #d7bfa0", padding: ".5rem" }}>Action</th>
                <th style={{ border: "1px solid #d7bfa0", padding: ".5rem" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" style={{ padding: "1rem" }}>Loading...</td></tr>
              ) : monthlySales.length ? (
                monthlySales.map((t, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #f0e4d7" }}>
                    <td style={{ padding: ".5rem" }}>{t.created_at}</td>
                    <td style={{ padding: ".5rem" }}>{t.user}</td>
                    <td style={{ padding: ".5rem" }}>{t.action}</td>
                    <td style={{ padding: ".5rem" }}>₱ {t.amount}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" style={{ padding: "1rem", color: "#444" }}>No sales records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Overall Total */}
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", backgroundColor: "#f1f1f1", padding: "1rem", borderRadius: ".75rem", border: "1px solid #d7bfa0", fontWeight: "bold" }}>
          <span>Overall Total Sales</span>
          <span style={{ color: "green" }}>₱ {overallTotal}</span>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
