import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import useForm from "@/hooks/useForm";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  
  const uploadToCloudinary = async (file) => {
  if (!file) return null;

  try {
    // Get signed parameters from Laravel
    const res = await fetch("/api/sign-upload");
    const { signature, timestamp, api_key, cloud_name } = await res.json();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", api_key);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.secure_url; // Return the uploaded image URL
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return null;
  }
  };

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

 const submitProducts = async (e) => {
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
      <div style={{ display: "flex", justifyContent: "center", padding: "3rem 1rem" }}>
        <form
          onSubmit={submitProducts}
          encType="multipart/form-data"
          style={{
            backgroundColor: "#fefaf7",
            border: "1px solid gray",
            borderRadius: "1rem",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "600px",
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
              Add Product
            </h1>
          </div>

          {/* Form Fields */}
          <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Name + Image */}
            <div>
              <label style={{ fontWeight: "600", fontSize: "0.875rem", color: "#333" }}>
                Add Product Name
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                <input
                  type="text"
                  value={productData.name}
                  onChange={(e) => setProduct("name", e.target.value)}
                  style={{
                    flex: 1,
                    border: "1px solid gray",
                    borderRadius: "0.25rem",
                    padding: "0.5rem",
                    fontSize: "0.875rem",
                  }}
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
                    onChange={(e) => setProduct("file", e.target.files[0])}
                    style={{ display: "none" }}
                  />
                  📷 Change Image
                </label>
              </div>
            </div>

            {/* Category */}
            <div>
              <label style={{ fontWeight: "600", fontSize: "0.875rem", color: "#333" }}>
                Add Category
              </label>
              <select
                value={productData.category}
                onChange={(e) => setProduct("category", e.target.value)}
                style={{
                  marginTop: "0.25rem",
                  width: "100%",
                  border: "1px solid gray",
                  borderRadius: "0.25rem",
                  padding: "0.5rem",
                  fontSize: "0.875rem",
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
              <label style={{ fontWeight: "600", fontSize: "0.875rem", color: "#333" }}>
                Indicate Quantity Available
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                <button
                  type="button"
                  onClick={() =>
                    setProduct(
                      "quantity",
                      Math.max(0, parseInt(productData.quantity || 0) - 1)
                    )
                  }
                  style={{
                    border: "1px solid gray",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={productData.quantity}
                  onChange={(e) => setProduct("quantity", Number(e.target.value))}
                  style={{
                    flex: 1,
                    border: "1px solid gray",
                    borderRadius: "0.25rem",
                    padding: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    setProduct("quantity", parseInt(productData.quantity || 0) + 1)
                  }
                  style={{
                    border: "1px solid gray",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Price */}
            <div>
              <label style={{ fontWeight: "600", fontSize: "0.875rem", color: "#333" }}>
                Indicate Price
              </label>
              <input
                type="number"
                value={productData.price}
                placeholder="0"
                onChange={(e) => setProduct("price", Number(e.target.value))}
                style={{
                  marginTop: "0.25rem",
                  width: "100%",
                  border: "1px solid gray",
                  borderRadius: "0.25rem",
                  padding: "0.5rem",
                  fontSize: "0.875rem",
                }}
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
              onClick={() => {
                resetForm();
                navigate("/inventory1");
              }}
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#000",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={processingProduct}
              style={{
                backgroundColor: processingProduct ? "#a0a0a0" : "#4b2e17",
                color: "#fff",
                padding: "0.5rem 1.25rem",
                borderRadius: "0.25rem",
                fontWeight: "600",
                fontSize: "0.875rem",
                cursor: processingProduct ? "not-allowed" : "pointer",
                opacity: processingProduct ? 0.6 : 1,
                transition: "background-color 0.3s, opacity 0.3s",
              }}
            >
              {processingProduct ? "Processing..." : "Add Product"}
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
            <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "-1rem" }}>
              Product Added!
            </h1>

            <p style={{ marginTop: "2rem", color: "#555", fontSize: "15px" }}>
              Your product has been successfully added.
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
