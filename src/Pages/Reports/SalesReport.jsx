import { useState, useEffect } from "react";
import axios from "@/api/axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useNavigate } from "react-router-dom";

export default function CreateReport() {
  const [transactions, setTransactions] = useState([]);
  const [capitals, setCapitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await axios.get("/api/fetchtransactions");
        setTransactions(response.data.transactions || []);
        const response2 = await axios.get("/api/fetchcapital");
        setCapitals(response2.data.capitals || []);
      } catch (err) {
        console.error("Failed to fetch datas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDatas();
  }, []);

  return (
    <AuthenticatedLayout>
      {/* HEADER */}
      <div
        className="flex items-center justify-between"
        style={{ paddingLeft: "7rem", paddingRight: "7rem", marginTop: "-1.5rem", marginBottom: "1rem" }}
      >
        <h1
          className="text-4xl font-extrabold text-[#4b2e17] drop-shadow-sm"
          style={{
            WebkitTextStroke: ".8px #000",
            backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1.3",
            fontSize: "3rem",
          }}
        >
          Create Report
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#4b2e17] text-white px-5 py-2 rounded-md text-base font-semibold hover:bg-[#6b3e1f] transition shadow-md"
        >
          ← Back
        </button>
      </div>

      {/* BUTTONS */}
      <div className="space-y-4 my-4">
        <button
          className="block text-left border border-[#4b2e17] text-black font-bold px-8 py-3 bg-[#f9f5f0] hover:bg-[#e8d4b8] transition-colors duration-200
            w-full sm:w-[50rem] lg:w-[68rem] mx-auto text-2xl"
          onClick={() => navigate("/generate-sales-report")}
        >
          Generate Sales Report
        </button>

        <button
          className="block text-left border border-[#4b2e17] text-black font-bold px-8 py-3 bg-[#f9f5f0] hover:bg-[#e8d4b8] transition-colors duration-200
            w-full sm:w-[50rem] lg:w-[68rem] mx-auto text-2xl"
          onClick={() => navigate("/generate-capital-report")}
        >
          Generate Capital Report
        </button>
      </div>

      {/* SALES AND CAPITAL TABLES */}
      <div className="space-y-12 mx-auto w-full sm:w-[50rem] lg:w-[68rem]">
        {/* SALES HISTORY */}
        <section>
          <h2 className="text-2xl font-bold text-[#2e1a0e] mb-4" style={{ marginTop: "3rem" }}>
            Sales History
          </h2>
          <div className="border border-black bg-white p-4 shadow-[6px_6px_0px_rgba(0,0,0,0.3)] overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#d6d6d6] text-black">
                  <th className="border-b border-[#4b2e17] px-6 py-3 text-center w-1/4">Sales Transaction #</th>
                  <th className="border-b border-[#4b2e17] px-6 py-3 text-center w-1/4">Date</th>
                  <th className="border-b border-[#4b2e17] px-6 py-3 text-center w-1/4">Total Sales</th>
                  <th className="border-b border-[#4b2e17] px-4 py-3 w-1/6"></th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((item, index) => (
                    <tr key={index} className="hover:bg-[#f9f5f0] text-center">
                      <td className="border-b border-gray-300 px-6 py-2">#{item.id}</td>
                      <td className="border-b border-gray-300 px-6 py-2">
                        {new Date(item.created_at).toLocaleString()}
                      </td>
                      <td className="border-b border-gray-300 px-6 py-2">₱ {item.total_amount}</td>
                      <td className="border-b border-gray-300 px-4 py-2 text-right">→</td>
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
          </div>
        </section>

        {/* CAPITAL HISTORY */}
        <section>
          <h2 className="text-2xl font-bold text-[#2e1a0e] mb-4">Capital History</h2>
          <div className="border border-black bg-white p-4 shadow-[6px_6px_0px_rgba(0,0,0,0.3)] overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#d6d6d6] text-black">
                  <th className="border-b border-[#4b2e17] px-6 py-3 text-center w-1/4">Capital #</th>
                  <th className="border-b border-[#4b2e17] px-6 py-3 text-center w-1/4">Date</th>
                  <th className="border-b border-[#4b2e17] px-6 py-3 text-center w-1/4">Total Capital</th>
                  <th className="border-b border-[#4b2e17] px-4 py-3 w-1/6"></th>
                </tr>
              </thead>
              <tbody>
                {capitals.length > 0 ? (
                  capitals.map((item, index) => (
                    <tr key={index} className="hover:bg-[#f9f5f0] text-center">
                      <td className="border-b border-gray-300 px-6 py-2">#{item.id}</td>
                      <td className="border-b border-gray-300 px-6 py-2">
                        {new Date(item.created_at).toLocaleString()}
                      </td>
                      <td className="border-b border-gray-300 px-6 py-2">₱ {item.amount}</td>
                      <td className="border-b border-gray-300 px-4 py-2 text-right">→</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-600">
                      No capital records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AuthenticatedLayout>
  );
}
