import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useNavigate } from "react-router-dom";
import useForm from "@/hooks/useForm";

export default function MakeTransaction() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const { data: formData, post: postTransaction, processing: processingTransaction } = useForm({ items });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleAddClick = () => {
    navigate("/create-transaction");
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleMakeTransaction = () => {
    postTransaction("/api/store-transaction", {
      onSuccess: () => {
        setItems([]);
        setShowSuccessModal(true);
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <div className="flex flex-col items-center py-12 px-6">
        {/* Header */}
        <div className="flex justify-between items-center w-[65rem] mb-6">
          <h1 className="text-3xl font-bold text-black">
            Record Transaction Form
          </h1>
          <button
            onClick={() => navigate("/transaction-rec-section")}
            className="bg-[#4b2e17] text-white px-5 py-2 rounded-md text-base font-semibold hover:bg-[#6b3e1f] transition shadow-md"
          >
            ← Back
          </button>
        </div>

        {/* Outer Box */}
        <div className="w-[65rem] bg-[#f9f9f9] border border-black shadow-[5px_5px_0px_rgba(0,0,0,0.3)]">
          {/* Header Info */}
          <div className="flex justify-between items-center px-6 py-4">
            <p className="text-sm font-semibold text-black">
              Date/Time: 00/00/000 - 00:00 PM
            </p>
            <p className="text-sm font-semibold text-black">
              Transaction #: 000000000
            </p>
          </div>

          {/* Table */}
          <div className="px-6 pb-6 relative">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-black border-b border-gray-400">
                  <th className="py-2 text-left w-1/4">Item</th>
                  <th className="py-2 text-left w-1/4">Price</th>
                  <th className="py-2 text-left w-1/4">Quantity</th>
                  <th className="py-2 text-left w-1/4">Total Amount</th>
                  <th className="py-2 text-center w-1/12">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-3 bg-[#d9d9d9] text-gray-700"
                    >
                      Please add an item.
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 border-b border-gray-300">{item.name}</td>
                      <td className="py-2 border-b border-gray-300">₱ {item.price}</td>
                      <td className="py-2 border-b border-gray-300">{item.quantity}</td>
                      <td className="py-2 border-b border-gray-300">₱ {item.price * item.quantity}</td>
                      <td className="py-2 border-b border-gray-300 text-center">
                        <button
                          onClick={() => handleDeleteItem(index)}
                          className="bg-red-600 text-white rounded px-2 py-1 text-xs hover:bg-red-800 transition"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Add Item Button */}
            <div className="flex justify-end mt-4 pr-4">
              <button
                onClick={handleAddClick}
                className="bg-[#e6d6c3] text-[#4b2e17] text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center border border-[#4b2e17] shadow-md hover:bg-[#d4c0aa] transition"
              >
                +
              </button>
            </div>

            {/* Total Amount */}
            {items.length > 0 && (
              <div className="bg-green-200 p-2 mt-2 font-bold text-black">
                Total Amount: ₱{totalAmount}
              </div>
            )}

            {/* Make Transaction Button */}
            {items.length > 0 && (
              <button
                onClick={handleMakeTransaction}
                disabled={processingTransaction}
                className="bg-[#4b2e17] text-white py-2 rounded-md mt-4 w-full hover:bg-[#3b2412] transition"
              >
                Make Transaction
              </button>
            )}
          </div>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md w-72 text-center shadow-lg">
              <h2 className="text-xl font-bold -mt-2">Transaction Successful!</h2>
              <p className="mt-4 text-gray-700 text-sm">
                Your transaction is successful.
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/make-transaction");
                }}
                className="mt-4 w-32 py-2 bg-gray-300 rounded-md font-semibold hover:bg-gray-400 transition"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
