import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "@/api/axios"; 
import { useLocation } from "react-router-dom";


export default function GenerateSalesReportCustom() {
   const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [customSales, setCustomSales] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setFrom(params.get("from") || "");
    setTo(params.get("to") || "");
  }, [location.search]);

  useEffect(() => {
    if (from && to) {
      handleGenerate();
    }
  }, [from, to]);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("/api/fetch-custom", {
        params: { from, to },
      });

      const userRes = await axios.get("/api/user");
      setUser(userRes.data);

      if (response.data.success) {
        setCustomSales(response.data.custom_sales);
      } else {
        setCustomSales(null);
        setError(response.data.message || "No sales found.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch sales data.");
      setCustomSales(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthenticatedLayout user={user}>
      {/* PAGE HEADER */}
      <div>...</div>

      {/* DATE SELECTION CARD */}
      <button onClick={handleGenerate}>Generate Report</button>

      {/* RESULT CARD */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {customSales && (
        <div>
          <p>Sales from {customSales.from} to {customSales.to}</p>
          <table>
            <thead>...</thead>
            <tbody>
              <tr>
                <td>{customSales.user}</td>
                <td>{customSales.action}</td>
                <td>₱ {customSales.amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
