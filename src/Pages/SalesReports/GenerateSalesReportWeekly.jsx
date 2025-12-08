import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";

export default function GenerateSalesReportWeekly() {
  const [weeklySales, setWeeklySales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchWeekly = async () => {
      try {
        // Always get authenticated user first
        const userRes = await axios.get("/api/user");
        setUser(userRes.data);

        // Now fetch weekly sales
        const response = await axios.get("/api/fetch-weekly");

        if (response.data.success) {
          // Ensure it's always an array
          console.log(response.data.weekly_sales)
          setWeeklySales(response.data.weekly_sales);
        } else {
          setWeeklySales([]);
        }
      } catch (error) {
        console.error("Error fetching weekly sales:", error);
        setWeeklySales([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchWeekly();
  }, []);

  // Safe computation of total
  const overallTotal = weeklySales.reduce(
    (sum, s) => sum + Number(s.total_amount || 0),
    0
  );

  return (
    <AuthenticatedLayout user={user}>
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl border border-[#d7bfa0]">
        <h1 className="text-2xl font-bold mb-6">Weekly Sales Report</h1>

        <table className="w-full table-auto border-collapse text-center">
          <thead>
            <tr className="bg-[#d6d6d6] text-black">
              <th className="border px-4 py-2">Week Start</th>
              <th className="border px-4 py-2">Week End</th>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : weeklySales.length ? (
              weeklySales.map((s, index) => (
                <tr key={index} className="hover:bg-[#f9f5f0]">
                  <td className="border px-4 py-2">{s.week_start}</td>
                  <td className="border px-4 py-2">{s.week_end}</td>
                  <td className="border px-4 py-2">{s.user}</td>
                  <td className="border px-4 py-2">₱ {s.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-600">
                  No sales records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Total */}
        <div className="mt-4 flex justify-between bg-[#f1f1f1] p-4 rounded-lg border border-[#d7bfa0]">
          <span className="font-semibold">Overall Total Sales</span>
          <span className="font-bold text-green-600">₱ {overallTotal}</span>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
