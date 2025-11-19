import React, { useState } from 'react';
import axios from '@/api/axios';

export default function DeleteButton({ id }) {
  const [visible, setVisible] = useState(false);

  const del = async (id) => {
    try {
      // Assumption: API DELETE endpoint for products
      await axios.delete(`/api/products/${id}`);
    } catch (e) {
      // ignore error for now
    }
    setVisible(false);
  };

  const redButton =
    "bg-red-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-red-700 transition-colors w-full text-center";
  const secondaryButton =
    "bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-xl hover:bg-gray-300 transition-colors w-full text-center";

  return (
    <>
      <button className={redButton} onClick={() => setVisible(true)}>
        Delete Product
      </button>

      {visible && (
        <div className="mt-4 bg-white p-6 rounded-2xl shadow-md border border-[#e2cdbf] w-full max-w-md mx-auto space-y-4 text-center">
          <h2 className="text-lg font-bold">Are you sure you want to delete?</h2>

          <div className="flex flex-col space-y-4 mt-4">
            <button className={secondaryButton} onClick={() => setVisible(false)}>
              No
            </button>
            <button className={redButton} onClick={() => del(id)}>
              Confirm Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}
