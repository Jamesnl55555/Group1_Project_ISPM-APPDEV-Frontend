import React from "react";

export default function Pagination({ page, lastPage, onPrev, onNext }) {
  return (
    <div className="flex justify-center mt-4 gap-4">
      <button
        className={`px-4 py-2 border rounded ${
          page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-200"
        }`}
        disabled={page === 1}
        onClick={onPrev}
      >
        ⬅ Prev
      </button>

      <button
        className={`px-4 py-2 border rounded ${
          page === lastPage
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-white hover:bg-gray-200"
        }`}
        disabled={page === lastPage}
        onClick={onNext}
      >
        Next ➡
      </button>
    </div>
  );
}
