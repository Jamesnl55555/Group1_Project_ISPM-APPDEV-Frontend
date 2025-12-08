import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useNavigate } from "react-router-dom";
import axios from "@/api/axios";

export default function GenerateCapitalReport() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [week, setWeek] = useState("");

  const [user, setUser] = useState(null);

  const routeMap = {
    Daily: "/generate-capital-report/daily",
    Weekly: "/generate-capital-report/weekly",
    Monthly: "/generate-capital-report/monthly",
    Custom: "/generate-capital-report/custom",
  };

  // Load authenticated user
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

    let query = "";

    switch (reportType) {
      case "Daily":
        if (!fromDate) {
          alert("Please select a date for the daily report.");
          return;
        }
        query = `?date=${fromDate}`;
        break;

      case "Weekly":
      case "Monthly":
        if (!fromDate || !toDate) {
          alert("Please select a valid month/week for the report.");
          return;
        }
        query = `?from=${fromDate}&to=${toDate}`;
        break;

      case "Custom":
        if (!fromDate || !toDate) {
          alert("Please select both start and end dates for the custom report.");
          return;
        }
        query = `?from=${fromDate}&to=${toDate}`;
        break;

      default:
        break;
    }

    navigate(routeMap[reportType] + query);
  };

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
            Generate Capital Report
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              backgroundColor: "#4b2e17",
              color: "white",
              padding: "0.5rem 1.5rem",
              borderRadius: "0.375rem",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "none"
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2c1b0e")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4b2e17")}
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
            <input
              type="date"
              value={fromDate}
              onChange={(e) => { setFromDate(e.target.value); setToDate(e.target.value); }}
              style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }}
            />
          )}

          {reportType === "Weekly" && (
            <>
              <select value={week} onChange={(e) => { setWeek(e.target.value); handleWeeklySelection(e.target.value, month, year); }} style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }}>
                <option value="">Week</option>
                {Array.from({ length: 5 }, (_, i) => i + 1).map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
              <select value={month} onChange={(e) => { setMonth(e.target.value); handleWeeklySelection(week, e.target.value, year); }} style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }}>
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <select value={year} onChange={(e) => { setYear(e.target.value); handleWeeklySelection(week, month, e.target.value); }} style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }}>
                <option value="">Year</option>
                {Array.from({ length: 11 }, (_, i) => 2020 + i).map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </>
          )}

          {reportType === "Monthly" && (
            <>
              <select value={month} onChange={(e) => { setMonth(e.target.value); handleMonthlyChange(e.target.value, year); }} style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }}>
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <select value={year} onChange={(e) => { setYear(e.target.value); handleMonthlyChange(month, e.target.value); }} style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }}>
                <option value="">Year</option>
                {Array.from({ length: 11 }, (_, i) => 2020 + i).map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </>
          )}

          {reportType === "Custom" && (
            <>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }} />
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d7bfa0" }} />
            </>
          )}
        </div>

        {/* Generate Button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleGenerate}
            disabled={!reportType}
            style={{
              padding: "0.5rem 1.5rem",
              fontWeight: "bold",
              borderRadius: "0.375rem",
              border: "1px solid #4b2e17",
              backgroundColor: reportType ? "#f3e6d9" : "#f9f5f0",
              cursor: reportType ? "pointer" : "not-allowed"
            }}
          >
            Generate Report
          </button>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
