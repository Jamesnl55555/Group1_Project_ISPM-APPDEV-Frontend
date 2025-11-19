import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function GenerateSalesReportMonthly() {
    return (
        <AuthenticatedLayout>

            <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl border border-[#d7bfa0]">
                <h1 className="text-2xl font-bold mb-6">Monthly Sales Report</h1>

                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-[#d6d6d6] text-black">
                            <th className="border px-4 py-2">Transaction #</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Total Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length ? (
                            transactions.map((t) => (
                                <tr key={t.id} className="hover:bg-[#f9f5f0] text-center">
                                    <td className="border px-4 py-2">#{t.id}</td>
                                    <td className="border px-4 py-2">{t.created_at}</td>
                                    <td className="border px-4 py-2">₱ {t.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-4 text-gray-600">
                                    No sales records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
