import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "@/api/axios";
import { useForm } from "@/hooks/useForm";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm({
    name: "",
    quantity: "",
    price: "",
    category: "",
    is_archived: false,
    file: null,
  });

  const passedProduct = location.state?.product; // get product from navigation state

  useEffect(() => {
    if (passedProduct) {
      // Use passed product if available
      form.setData({
        name: passedProduct.name || "",
        quantity: passedProduct.quantity || "",
        price: passedProduct.price || "",
        category: passedProduct.category || "",
        is_archived: passedProduct.is_archived || false,
        file: null,
      });
      setLoading(false);
    } else {
      // Fetch product if not passed
      const fetchProduct = async () => {
        try {
          const found = await axios.get(`/api/fetchproduct/${id}`);
            form.setData({
              name: found.name || "",
              quantity: found.quantity || "",
              price: found.price || "",
              category: found.category || "",
              is_archived: found.is_archived || false,
              file: null,
            });
        } catch (err) {
          console.error("Failed to fetch product:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, passedProduct]);

  const submitProducts = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.data.name);
      formData.append("quantity", form.data.quantity);
      formData.append("price", form.data.price);
      formData.append("category", form.data.category);
      formData.append("is_archived", form.data.is_archived ? 1 : 0);
      if (form.data.file) formData.append("file", form.data.file);

      await axios.post(`/api/update-product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowSuccessModal(true);
    } catch (err) {
      console.error("Update product error:", err);
    }
  };

  if (loading)
    return (
      <AuthenticatedLayout>
        <div>Loading...</div>
      </AuthenticatedLayout>
    );

  return (
    <AuthenticatedLayout>
      <div className="flex justify-center py-12 px-4">
        <form
          onSubmit={submitProducts}
          encType="multipart/form-data"
          className="bg-[#fefaf7] border border-gray-300 rounded-2xl shadow-md w-full max-w-2xl"
        >
          {/* Header */}
          <div className="bg-[#f8ecdf] px-6 py-4 border-b border-gray-300 rounded-t-2xl">
            <h1 className="text-xl font-bold text-black">Edit Product</h1>
          </div>

          {/* Form Fields */}
          <div className="p-6 flex flex-col gap-5">
            {/* Name + Image */}
            <div>
              <label className="font-semibold text-sm text-gray-800">
                Edit Product Name
              </label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={form.data.name}
                  onChange={(e) => form.setData("name", e.target.value)}
                  className="flex-1 border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4b2e17]"
                />
                <label className="text-sm bg-gray-200 px-3 py-2 border border-gray-400 rounded cursor-pointer hover:bg-gray-300 transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => form.setData("file", e.target.files[0])}
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
                value={form.data.category}
                onChange={(e) => form.setData("category", e.target.value)}
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
                    form.setData(
                      "quantity",
                      Math.max(0, form.data.quantity - 1)
                    )
                  }
                  className="border border-gray-400 px-3 py-1 rounded hover:bg-gray-200"
                >
                  -
                </button>
                <input
                  type="number"
                  value={form.data.quantity}
                  onChange={(e) =>
                    form.setData("quantity", Number(e.target.value))
                  }
                  className="flex-1 border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4b2e17]"
                />
                <button
                  type="button"
                  onClick={() =>
                    form.setData(
                      "quantity",
                      parseInt(form.data.quantity || 0) + 1
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
                value={form.data.price}
                onChange={(e) => form.setData("price", Number(e.target.value))}
                className="mt-1 w-full border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4b2e17]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center gap-4 px-6 py-4 border-t border-gray-300">
            <button
              type="button"
              onClick={() => navigate("/inventory1")}
              className="text-sm font-semibold text-black hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={form.processing}
              className="bg-[#4b2e17] text-white px-5 py-2 rounded font-semibold hover:bg-[#3a2211] transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center w-72">
            <h1 className="text-2xl font-bold -mt-4">Notice</h1>
            <p className="mt-6 text-gray-600 text-sm">
              Your product has been successfully updated.
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
