import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useNavigate } from "react-router-dom";

export default function GenerateCapitalReport() {
    const navigate = useNavigate();
    const [reportType, setReportType] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const routeMap = {
        Daily: "/generate-capital-report/daily",
        Weekly: "/generate-capital-report/weekly",
        Monthly: "/generate-capital-report/monthly",
        Custom: "/generate-capital-report/custom",
    };

    // Pre-fill daily date
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        if (reportType === "Daily") {
            setFromDate(today);
            setToDate(today);
        } else if (reportType !== "Daily") {
            setFromDate("");
            setToDate("");
            setMonth("");
            setYear("");
        }
    }, [reportType]);

    // Weekly: map date to 7-day week
    const handleWeeklyChange = (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        let startDay, endDay;
        if (day <= 7) [startDay, endDay] = [1, 7];
        else if (day <= 14) [startDay, endDay] = [8, 14];
        else if (day <= 21) [startDay, endDay] = [15, 21];
        else [startDay, endDay] = [22, lastDay];

        setFromDate(new Date(date.getFullYear(), date.getMonth(), startDay).toISOString().split("T")[0]);
        setToDate(new Date(date.getFullYear(), date.getMonth(), endDay).toISOString().split("T")[0]);
    };

    // Monthly: map month + year to first/last day
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

    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl border border-[#d7bfa0]">
                <h1 className="text-2xl font-bold mb-6">Select Capital Report Date Range</h1>
                <p className="mb-4 text-gray-700">Choose a date range to generate your capital report.</p>

                {/* Report Type Selection */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {["Daily", "Weekly", "Monthly", "Custom"].map((type) => (
                        <label
                            key={type}
                            className={`cursor-pointer border rounded-lg p-4 flex flex-col items-start relative pl-10 ${
                                reportType === type
                                    ? "border-[#4b2e17] bg-[#f3dfc3]"
                                    : "border-[#e0d6c4] bg-[#f9f5f0]"
                            }`}
                        >
                            <input
                                type="radio"
                                name="reportType"
                                value={type}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-0"
                                checked={reportType === type}
                                onChange={() => setReportType(type)}
                            />
                            <span
                                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border flex items-center justify-center ${
                                    reportType === type
                                        ? "border-[#4b2e17] bg-[#4b2e17]"
                                        : "border-gray-400 bg-white"
                                }`}
                            >
                                {reportType === type && <span className="w-2 h-2 bg-white rounded-full"></span>}
                            </span>
                            <span className="font-semibold">{type}</span>
                            <span className="text-gray-500 text-sm">
                                {type === "Daily" && "Pick a single date"}
                                {type === "Weekly" && "Choose a week"}
                                {type === "Monthly" && "Select a Month"}
                                {type === "Custom" && "Select start and end dates"}
                            </span>
                        </label>
                    ))}
                </div>

                {/* Date Inputs */}
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {reportType === "Daily" && (
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => {
                                setFromDate(e.target.value);
                                setToDate(e.target.value);
                            }}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    )}
                    {reportType === "Weekly" && (
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => handleWeeklyChange(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    )}
                    {reportType === "Monthly" && (
                        <>
                            <select
                                value={month}
                                onChange={(e) => {
                                    setMonth(e.target.value);
                                    handleMonthlyChange(e.target.value, year);
                                }}
                                className="w-full border border-gray-300 rounded px-3 py-2"
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
                                    handleMonthlyChange(month, e.target.value);
                                }}
                                className="w-full border border-gray-300 rounded px-3 py-2"
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
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => navigate("/sales-report")}
                        className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={!reportType}
                        className={`px-6 py-2 border font-bold rounded ${
                            reportType
                                ? "border-[#4b2e17] bg-[#f9f5f0] hover:bg-[#e8d4b8] transition-colors"
                                : "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Generate Report
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
