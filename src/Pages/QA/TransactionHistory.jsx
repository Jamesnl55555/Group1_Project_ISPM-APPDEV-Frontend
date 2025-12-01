import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function TransactionHistory({ transactions = [], user }) {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = !search || t.id.toString().includes(search);
    const matchesDate = !dateFilter || t.date?.startsWith(dateFilter);
    return matchesSearch && matchesDate;
  });

  // Fallback/mock data if no transactions
  const displayTransactions =
    filteredTransactions.length > 0
      ? filteredTransactions
      : [
          { id: 1, date: "2025-11-18 - 3:45 PM", amount: 5000, method: "Cash" },
          { id: 2, date: "2025-11-19 - 4:30 PM", amount: 7500, method: "Card" },
        ];

  return (
    <AuthenticatedLayout user={user}>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Transaction Records List
        </h1>

        {/* Search + Date Filter */}
        <div className="border border-black shadow-[5px_5px_0px_gray] bg-white max-w-5xl mx-auto p-5 mb-4">
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
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
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
                  <th className="border border-gray-700 px-3 py-2">
                    Payment Method
                  </th>
                  <th className="border border-gray-700 px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {displayTransactions.length ? (
                  displayTransactions.map((t, i) => (
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
                        {t.date}
                      </td>
                      <td className="border border-gray-400 px-3 py-2 text-[#2e1a0e]">
                        ₱ {t.amount.toLocaleString()}
                      </td>
                      <td className="border border-gray-400 px-3 py-2 text-[#2e1a0e]">
                        {t.method}
                      </td>
                      <td className="border border-gray-400 px-3 py-2 text-center">
                        <button
                          onClick={() =>
                            (window.location.href = `/full-trans-info?id=${t.id}`)
                          }
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
