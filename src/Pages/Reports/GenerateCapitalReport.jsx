import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useNavigate } from "react-router-dom";

export default function GenerateCapitalReport() {
    const navigate = useNavigate();
    const [reportType, setReportType] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // Map report types to routes
    const routeMap = {
        Daily: "/generate-capital-report/daily",
        Weekly: "/generate-capital-report/weekly",
        Monthly: "/generate-capital-report/monthly",
        Custom: "/generate-capital-report/custom",
    };

    const handleGenerate = () => {
        if (!reportType) return;

        if (reportType === "Custom") {
            if (!fromDate || !toDate) {
                alert("Please select both start and end dates for the custom report.");
                return;
            }
            navigate(routeMap[reportType] + `?from=${fromDate}&to=${toDate}`);
        } else {
            navigate(routeMap[reportType]);
        }
    };

    return (
        <AuthenticatedLayout>

            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl border border-[#d7bfa0]">
                <h1 className="text-2xl font-bold mb-6">Select Capital Report Date Range</h1>
                <p className="mb-4 text-gray-700">Choose a date range to generate your capital report.</p>

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
                                {type === "Custom" && "Select Start and end dates"}
                            </span>
                        </label>
                    ))}
                </div>

                {reportType === "Custom" && (
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => navigate("/sales-report")}
                        className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        className="px-6 py-2 border border-[#4b2e17] bg-[#f9f5f0] font-bold hover:bg-[#e8d4b8] transition-colors"
                        disabled={!reportType}
                        onClick={handleGenerate}
                    >
                        Generate Report
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
