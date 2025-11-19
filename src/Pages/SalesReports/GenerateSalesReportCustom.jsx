import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useNavigate } from "react-router-dom";

export default function GenerateSalesReportCustom() {
    const navigate = useNavigate();
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const handleGenerate = () => {
        if (!from || !to) return;

        navigate(`/generate-sales-report/custom?from=${from}&to=${to}`);
    };

    return (
        <AuthenticatedLayout>

            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl border border-[#d7bfa0]">
                <h1 className="text-2xl font-bold mb-6">Custom Sales Report</h1>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block mb-1 font-semibold">From:</label>
                        <input
                            type="date"
                            className="border rounded px-3 py-2 w-full"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">To:</label>
                        <input
                            type="date"
                            className="border rounded px-3 py-2 w-full"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={handleGenerate}
                        className="px-6 py-2 border border-[#4b2e17] bg-[#f9f5f0] font-bold hover:bg-[#e8d4b8] transition-colors"
                    >
                        Generate Report
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
