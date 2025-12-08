import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "@/api/axios"; // your axios instance with token

export default function GenerateSalesReportDaily() {
  const [dailySales, setDailySales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const fetchDailySales = async () => {
    setLoading(true);
    setError("");

    try {
      const userRes = await axios.get("/api/user");
      setUser(userRes.data);

      const response = await axios.get("/api/fetch-daily");
      console.log("API response:", response.data);

      if (response.data.success) {
        setDailySales(response.data.daily_sales);
      } else {
        setDailySales([]);
        setError(response.data.message || "No daily sales found.");
      }
    } catch (err) {
      console.error("Error fetching daily sales:", err);
      setDailySales([]);
      setError("Failed to fetch daily sales data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailySales();
  }, []);

  return (
    <AuthenticatedLayout user={user}>
      <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-xl border border-[#d7bfa0]">
        <h1 className="text-2xl font-bold mb-6 text-[#4b2e17]">Daily Sales Report</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <table className="w-full table-auto border-collapse text-center">
          <thead>
            <tr className="bg-[#f3e6d9] text-[#4b2e17]">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Action</th>
              <th className="border px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {dailySales.length ? (
              dailySales.map((sale, idx) => (
                <tr key={idx} className="hover:bg-[#f9f5f0]">
                  <td className="border px-4 py-2">{sale.date}</td>
                  <td className="border px-4 py-2">{sale.user}</td>
                  <td className="border px-4 py-2">{sale.action}</td>
                  <td className="border px-4 py-2">₱ {sale.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-gray-600">
                  No daily sales records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}
