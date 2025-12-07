import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";

export default function GenerateSalesReportMonthly({ user }) {
  const [monthlySales, setMonthlySales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        const response = await axios.get("/api/fetch-monthly");

        if (response.data.success) {
          setMonthlySales(response.data.monthly_sales);
        }
      } catch (error) {
        console.error("Error fetching monthly sales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthly();
  }, []);

  // Compute overall total
  const overallTotal = monthlySales.reduce(
    (sum, s) => sum + Number(s.amount),
    0
  );

  return (
    <AuthenticatedLayout user={user}>
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl border border-[#d7bfa0]">
        <h1 className="text-2xl font-bold mb-6">Monthly Sales Report</h1>

        <table className="w-full table-auto border-collapse text-center">
          <thead>
            <tr className="bg-[#d6d6d6] text-black">
              <th className="border px-4 py-2">Month</th>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : monthlySales.length ? (
              monthlySales.map((s, index) => (
                <tr key={index} className="hover:bg-[#f9f5f0]">
                  <td className="border px-4 py-2">{s.month}</td>
                  <td className="border px-4 py-2">{s.user}</td>
                  <td className="border px-4 py-2">₱ {s.amount}</td>
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

        {/* Overall Total */}
        <div className="mt-4 flex justify-between bg-[#f1f1f1] p-4 rounded-lg border border-[#d7bfa0]">
          <span className="font-semibold">Overall Total Sales</span>
          <span className="font-bold text-green-600">₱ {overallTotal}</span>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
