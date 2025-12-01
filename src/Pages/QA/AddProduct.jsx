import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import useForm from "@/hooks/useForm";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

  const {
    data: productData,
    setData: setProduct,
    post: postProduct,
    processing: processingProduct,
    reset: resetForm,
  } = useForm({
    name: "",
    quantity: "",
    price: "",
    category: "",
    is_archived: false,
    file: null,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const submitProducts = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("quantity", productData.quantity);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("is_archived", productData.is_archived ? 1 : 0);

    if (productData.file) {
      formData.append("file", productData.file);
    }

    postProduct("/api/postproducts", {
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      onSuccess: () => {
        resetForm();
        setShowSuccessModal(true);
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <div className="flex justify-center p-12">
        <form
          onSubmit={submitProducts}
          className="bg-[#fefaf7] border border-gray-300 rounded-2xl shadow-md w-full max-w-xl"
        >
          {/* Header */}
          <div className="bg-[#f8ecdf] px-6 py-4 border-b border-gray-300 rounded-t-2xl">
            <h1 className="text-xl font-bold text-black">Add Product</h1>
          </div>

          {/* Form Fields */}
          <div className="p-6 flex flex-col gap-5">
            {/* Name + Image */}
            <div>
              <label className="font-semibold text-sm text-gray-800">
                Add Product Name
              </label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={productData.name}
                  onChange={(e) => setProduct("name", e.target.value)}
                  className="flex-1 border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4b2e17]"
                />
                <label className="text-sm bg-gray-200 px-3 py-2 border border-gray-400 rounded cursor-pointer hover:bg-gray-300 transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProduct("file", e.target.files[0])}
                    className="hidden"
                  />
                  📷 Change Image
                </label>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="font-semibold text-sm text-gray-800">
                Add Category
              </label>
              <select
                value={productData.category}
                onChange={(e) => setProduct("category", e.target.value)}
                className="mt-1 w-full border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4b2e17]"
              >
                <option value="">Select category</option>
                <option value="chocolate">Chocolate</option>
                <option value="drinks">Drinks</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="font-semibold text-sm text-gray-800">
                Indicate Quantity Available
              </label>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() =>
                    setProduct(
                      "quantity",
                      Math.max(0, parseInt(productData.quantity || 0) - 1)
                    )
                  }
                  className="border border-gray-400 px-3 py-1 rounded hover:bg-gray-200"
                >
                  -
                </button>
                <input
                  type="number"
                  value={productData.quantity}
                  onChange={(e) => setProduct("quantity", Number(e.target.value))}
                  className="flex-1 border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4b2e17]"
                />
                <button
                  type="button"
                  onClick={() =>
                    setProduct(
                      "quantity",
                      parseInt(productData.quantity || 0) + 1
                    )
                  }
                  className="border border-gray-400 px-3 py-1 rounded hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="font-semibold text-sm text-gray-800">
                Indicate Price
              </label>
              <input
                type="number"
                value={productData.price}
                placeholder="0"
                onChange={(e) => setProduct("price", Number(e.target.value))}
                className="mt-1 w-full border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4b2e17]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center gap-4 px-6 py-4 border-t border-gray-300">
            <button
              type="button"
              onClick={() => {
                resetForm();
                navigate("/inventory1");
              }}
              className="text-sm font-semibold text-black hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processingProduct}
              className="bg-[#4b2e17] text-white px-5 py-2 rounded font-semibold hover:bg-[#3a2211] transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center w-72">
            <h1 className="text-2xl font-bold -mt-4">Product Added!</h1>
            <p className="mt-6 text-gray-600 text-sm">
              Your product has been successfully added.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/inventory1");
              }}
              className="mt-6 w-32 px-4 py-2 bg-gray-300 rounded font-semibold hover:bg-gray-400 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
