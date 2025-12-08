import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "@/api/axios";

export default function GenerateSalesReportMonthly() {
  const [reportType, setReportType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [week, setWeek] = useState("");

  const [monthlySales, setMonthlySales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await axios.get("/api/user");
        setUser(userRes.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  // Compute date range for weekly selection
  const handleWeeklySelection = (selectedWeek, selectedMonth, selectedYear) => {
    if (!selectedWeek || !selectedMonth || !selectedYear) return;

    const yearNum = Number(selectedYear);
    const monthNum = Number(selectedMonth) - 1;

    const startDay = (selectedWeek - 1) * 7 + 1;
    const endDay = selectedWeek * 7;
    const lastDayOfMonth = new Date(yearNum, monthNum + 1, 0).getDate();
    const safeEndDay = Math.min(endDay, lastDayOfMonth);

    const startDate = new Date(yearNum, monthNum, startDay);
    const endDate = new Date(yearNum, monthNum, safeEndDay);

    setFromDate(startDate.toISOString().split("T")[0]);
    setToDate(endDate.toISOString().split("T")[0]);
  };

  // Compute date range for monthly selection
  const handleMonthlySelection = (selectedMonth, selectedYear) => {
    if (!selectedMonth || !selectedYear) return;

    const firstDay = new Date(selectedYear, selectedMonth - 1, 1).toISOString().split("T")[0];
    const lastDay = new Date(selectedYear, selectedMonth, 0).toISOString().split("T")[0];

    setFromDate(firstDay);
    setToDate(lastDay);
  };

  // Fetch sales data whenever date range changes
  useEffect(() => {
    const fetchMonthly = async () => {
      if (!fromDate || !toDate) return;

      setLoading(true);
      setError("");
      try {
        const response = await axios.get("/api/fetch-custom", {
          params: { from: fromDate, to: toDate },
        });

        if (response.data.success) {
          setMonthlySales(Array.isArray(response.data.custom_sales) ? response.data.custom_sales : []);
        } else {
          setMonthlySales([]);
          setError(response.data.message || "No sales records found.");
        }
      } catch (err) {
        console.error("Error fetching monthly sales:", err);
        setMonthlySales([]);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMonthly();
  }, [fromDate, toDate]);

  // Compute total
  const overallTotal = monthlySales.reduce((sum, t) => sum + Number(t.amount || 0), 0);

  return (
    <AuthenticatedLayout user={user}>
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl border border-[#d7bfa0]">
        <h1 className="text-2xl font-bold mb-6">Monthly Sales Report</h1>

        {/* Report Type Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {["Daily", "Weekly", "Monthly", "Custom"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setReportType(type);
                setFromDate("");
                setToDate("");
                setMonth("");
                setYear("");
                setWeek("");
              }}
              className={`p-4 rounded font-semibold ${
                reportType === type ? "bg-[#f3e6d9] border-[#4b2e17]" : "bg-[#c5a888]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Date Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {reportType === "Daily" && (
            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setToDate(e.target.value);
              }}
              className="border px-3 py-2 rounded"
            />
          )}

          {reportType === "Weekly" && (
            <>
              <select
                value={week}
                onChange={(e) => {
                  setWeek(e.target.value);
                  handleWeeklySelection(e.target.value, month, year);
                }}
                className="border px-3 py-2 rounded"
              >
                <option value="">Week</option>
                <option value="1">Week 1</option>
                <option value="2">Week 2</option>
                <option value="3">Week 3</option>
                <option value="4">Week 4</option>
                <option value="5">Week 5</option>
              </select>

              <select
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  handleWeeklySelection(week, e.target.value, year);
                }}
                className="border px-3 py-2 rounded"
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  handleWeeklySelection(week, month, e.target.value);
                }}
                className="border px-3 py-2 rounded"
              >
                <option value="">Year</option>
                {Array.from({ length: 11 }, (_, i) => 2020 + i).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </>
          )}

          {reportType === "Monthly" && (
            <>
              <select
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  handleMonthlySelection(e.target.value, year);
                }}
                className="border px-3 py-2 rounded"
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  handleMonthlySelection(month, e.target.value);
                }}
                className="border px-3 py-2 rounded"
              >
                <option value="">Year</option>
                {Array.from({ length: 11 }, (_, i) => 2020 + i).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </>
          )}

          {reportType === "Custom" && (
            <>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border px-3 py-2 rounded"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border px-3 py-2 rounded"
              />
            </>
          )}
        </div>

        {/* Generate Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => {}}
            className="px-6 py-2 font-bold rounded bg-[#4b2e17] text-white hover:bg-[#39210f]"
          >
            Generate Report
          </button>
        </div>

        {/* Sales Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-center">
            <thead>
              <tr className="bg-[#d6d6d6] text-black">
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Action</th>
                <th className="border px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-4">Loading...</td>
                </tr>
              ) : monthlySales.length ? (
                monthlySales.map((t, idx) => (
                  <tr key={idx} className="hover:bg-[#f9f5f0]">
                    <td className="border px-4 py-2">{t.created_at}</td>
                    <td className="border px-4 py-2">{t.user}</td>
                    <td className="border px-4 py-2">{t.action}</td>
                    <td className="border px-4 py-2">₱ {t.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-gray-600">No sales records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Overall Total */}
        <div className="mt-4 flex justify-between bg-[#f1f1f1] p-4 rounded-lg border border-[#d7bfa0] font-bold">
          <span>Overall Total Sales</span>
          <span className="text-green-600">₱ {overallTotal}</span>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
