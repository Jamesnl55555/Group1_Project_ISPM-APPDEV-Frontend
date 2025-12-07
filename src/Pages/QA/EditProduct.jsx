import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "@/api/axios";
import { useForm } from "@/hooks/useForm";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm({
    name: "",
    quantity: 0,
    price: 0,
    category: "",
    is_archived: false,
    file: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resp = await axios.get(`/api/fetchproduct/${id}`);
        const product = resp.data.product;

        form.setData({
          name: product.name ?? "",
          quantity: product.quantity ?? 0,
          price: product.price ?? 0,
          category: product.category ?? "",
          is_archived: product.is_archived ?? false,
          file: null,
        });
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  const inputStyle = {
    width: "100%",
    padding: "0.6rem",
    borderRadius: "0.5rem",
    border: "1px solid #D1D5DB",
    fontSize: "0.875rem",
    color: "#111827",
    transition: "all 0.2s",
  };

  const inputContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "0.25rem",
  };

  const labelStyle = {
    fontWeight: "600",
    fontSize: "0.875rem",
    color: "#333",
  };

  const buttonStyle = {
    backgroundColor: "#4b2e17",
    color: "#fff",
    padding: "0.5rem 1.25rem",
    borderRadius: "0.25rem",
    fontWeight: "600",
    fontSize: "0.875rem",
    cursor: "pointer",
    transition: "background 0.2s",
  };

  return (
    <AuthenticatedLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "3rem 1rem",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <form
          onSubmit={submitProducts}
          encType="multipart/form-data"
          style={{
            backgroundColor: "#fefaf7",
            borderRadius: "1rem",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "600px",
            border: "1px solid gray",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#f8ecdf",
              padding: "1rem 1.5rem",
              borderBottom: "1px solid gray",
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
            }}
          >
            <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#000" }}>
              Edit Product
            </h1>
          </div>

          {/* Form Fields */}
          <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Name + Image */}
            <div>
              <label style={labelStyle}>Edit Product Name</label>
              <div style={inputContainerStyle}>
                <input
                  type="text"
                  value={form.data.name ?? ""}
                  onChange={(e) => form.setData("name", e.target.value)}
                  style={inputStyle}
                />
                <label
                  style={{
                    fontSize: "0.875rem",
                    backgroundColor: "#e2e2e2",
                    padding: "0.5rem 0.75rem",
                    border: "1px solid gray",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => form.setData("file", e.target.files[0])}
                    style={{ display: "none" }}
                  />
                  📷 Change Image
                </label>
              </div>
            </div>

            {/* Category */}
            <div>
              <label style={labelStyle}>Add Category</label>
              <select
                value={form.data.category ?? ""}
                onChange={(e) => form.setData("category", e.target.value)}
                style={{
                  ...inputStyle,
                  marginTop: "0.25rem",
                }}
              >
                <option value="">Select category</option>
                <option value="chocolate">Chocolate</option>
                <option value="drinks">Drinks</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label style={labelStyle}>Indicate Quantity Available</label>
              <div style={inputContainerStyle}>
                <button
                  type="button"
                  onClick={() =>
                    form.setData("quantity", Math.max(0, form.data.quantity - 1))
                  }
                  style={{ ...buttonStyle, backgroundColor: "#ccc", color: "#000" }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={form.data.quantity ?? 0}
                  onChange={(e) => form.setData("quantity", Number(e.target.value))}
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() =>
                    form.setData("quantity", (form.data.quantity ?? 0) + 1)
                  }
                  style={{ ...buttonStyle, backgroundColor: "#ccc", color: "#000" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Price */}
            <div>
              <label style={labelStyle}>Indicate Price</label>
              <input
                type="number"
                value={form.data.price ?? 0}
                onChange={(e) => form.setData("price", Number(e.target.value))}
                style={{ ...inputStyle, marginTop: "0.25rem" }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem 1.5rem",
              borderTop: "1px solid gray",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/inventory1")}
              style={{ fontSize: "0.875rem", fontWeight: "600", color: "#000", cursor: "pointer", textDecoration: "underline", background: "none", border: "none" }}
            >
              Cancel
            </button>
            <button type="submit" style={buttonStyle}>
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "18rem",
              backgroundColor: "#fff",
              padding: "2rem",
              textAlign: "center",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "-1rem" }}>Notice</h1>
            <p style={{ marginTop: "2rem", color: "#555", fontSize: "15px" }}>
              Your product has been successfully updated.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/inventory1");
              }}
              style={{
                marginTop: "1.5rem",
                width: "8rem",
                padding: "0.5rem",
                backgroundColor: "#ccc",
                borderRadius: "0.3rem",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
