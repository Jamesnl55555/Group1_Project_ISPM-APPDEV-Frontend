import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/api/axios";


export default function TransactionRecord() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/fetchtransactions');
        setTransactions(response.data.transactions);
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <AuthenticatedLayout>
      <div className="p-6">
  {/* Header with title and back button aligned in one row */}
  <div
    className="flex items-center justify-between mb-6"
    style={{ paddingLeft: "8rem", paddingRight: "8rem", marginTop:"-2rem" }}
  >
    <h1 className="text-3xl font-bold text-black">
      Transaction Records List
    </h1>
    <button
      onClick={() => navigate("/dashboard")}
      className="bg-[#4b2e17] text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-[#6b3e1f] transition shadow-md"
    >
      ← Back
    </button>
  </div>



        

        {/* Search Section */}
        <div className="border border-black shadow-[5px_5px_0px_gray] bg-white max-w-5xl mx-auto p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#4b2e17] mb-1">
                Search for Transaction:
              </label>
              <input
                type="text"
                placeholder="Input Transaction Number"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#c5a888] outline-none"
              />
            </div>

            <div className="flex-1 mt-3 sm:mt-0">
              <label className="block text-sm font-medium text-[#4b2e17] mb-1">
                Date:
              </label>
              <input
                type="date"
                className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#c5a888] outline-none"
              />
            </div>
          </div>

          {/* Transaction Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-700 px-3 py-2">
                    Transaction Number
                  </th>
                  <th className="border border-gray-700 px-3 py-2">
                    Date and Time
                  </th>
                  <th className="border border-gray-700 px-3 py-2">
                    Total Amount
                  </th>
                  <th className="border border-gray-700 px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {transactions.length ? (
                  transactions.map((t, i) => (
                    <tr
                      key={i}
                      className={`${
                        i % 2 === 0 ? "bg-[#fffaf6]" : "bg-[#f6ebdf]"
                      } hover:bg-[#f9f5f0] transition`}
                    >
                      <td className="border border-gray-400 px-3 py-2 text-[#2e1a0e]">
                        #{t.id.toString().padStart(10, "0")}
                      </td>
                      <td className="border border-gray-400 px-3 py-2 text-[#2e1a0e]">
                        {new Date(t.created_at).toLocaleString()}
                      </td>
                      <td className="border border-gray-400 px-3 py-2 text-[#2e1a0e]">
                        ₱ {t.total_amount}
                      </td>
                      <td className="border border-gray-400 px-3 py-2 text-center">
  <button
    onClick={() => navigate(`/transactions/${t.id}`)}
    className="bg-[#4b2e17] text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-[#6b3e1f] transition"
  >
    Show More
  </button>
</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4 text-[#4b2e17] font-medium"
                    >
                      No transaction records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
