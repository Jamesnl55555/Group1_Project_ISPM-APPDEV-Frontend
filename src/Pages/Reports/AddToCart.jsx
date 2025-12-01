import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function RecordTransactionForm({ auth }) {
  const navigate = useNavigate();

  const [products] = useState([
    { id: 1, name: "Buldak 3x Spicy", price: 250, stock: 10 },
    { id: 2, name: "Buldak Carbonara", price: 250, stock: 10 },
    { id: 3, name: "Buldak Rose", price: 250, stock: 0 },
    { id: 4, name: "Buldak Chicken", price: 250, stock: 10 },
    { id: 5, name: "Original Buldak", price: 250, stock: 10 },
  ]);

  const [cart, setCart] = useState({});
  const [search, setSearch] = useState("");

  const addToCart = (product) => {
    if (!product || product.stock === 0) return;
    setCart((prev) => {
      const qty = prev[product.id]?.quantity || 0;
      return {
        ...prev,
        [product.id]: { ...product, quantity: qty + 1 },
      };
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleConfirm = () => {
    if (Object.values(cart).length === 0) return;
    navigate("/make-transaction", { state: { cart: Object.values(cart) } });
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AuthenticatedLayout
      auth={auth}
      header={
        <h2 style={{ fontWeight: "bold", fontSize: "1.8rem", textAlign: "center" }}>
          Record Transaction Form
        </h2>
      }
    >
      <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
        {/* Product List */}
        <div
          style={{
            flex: 2,
            border: "1px solid #ccc",
            padding: "1.2rem 1.5rem",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
          }}
        >
          {/* Search */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontSize: "0.9rem" }}>Search for Product:</label>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.2rem" }}
            />
          </div>

          {/* Products Table */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
                <th></th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      style={{
                        padding: "0.3rem 0.5rem",
                        borderRadius: "6px",
                        border: "1px solid #aaa",
                        cursor: product.stock === 0 ? "not-allowed" : "pointer",
                        backgroundColor: product.stock === 0 ? "#ddd" : "#fff",
                      }}
                    >
                      +
                    </button>
                  </td>

                  <td>{product.name}</td>
                  <td>₱{product.price}</td>

                  <td>
                    {product.stock === 0 ? (
                      <span style={{ color: "red", fontSize: "0.85rem" }}>Out of Stock</span>
                    ) : (
                      <input
                        type="number"
                        min={0}
                        value={cart[product.id]?.quantity || 0}
                        readOnly
                        style={{ width: "50px", textAlign: "center" }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cart */}
        <div
          style={{
            flex: 1,
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            backgroundColor: "#f8e9d9",
            height: "fit-content",
            boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
          }}
        >
          <h3 style={{ marginBottom: "1rem", color: "#000" }}>🛒 Cart</h3>

          {Object.values(cart).length === 0 ? (
            <p style={{ color: "#999", fontStyle: "italic" }}>Cart is empty</p>
          ) : (
            Object.values(cart).map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                  padding: "0.7rem",
                  border: "1px solid #eee",
                  borderRadius: "6px",
                  backgroundColor: "#fff",
                }}
              >
                <div>
                  <strong>{item.name}</strong>
                  <br />
                  Quantity: {item.quantity}
                  <br />
                  Total: ₱{item.quantity * item.price}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "10px",
                    padding: "0.3rem 0.4rem",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#720101")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "red")}
                >
                  🗑️
                </button>
              </div>
            ))
          )}

          <button
            onClick={handleConfirm}
            disabled={Object.values(cart).length === 0}
            style={{
              marginTop: "1rem",
              width: "100%",
              padding: "0.7rem",
              backgroundColor: Object.values(cart).length === 0 ? "#8b6f62" : "#4b2e1e",
              opacity: Object.values(cart).length === 0 ? 0.5 : 1,
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              cursor: Object.values(cart).length === 0 ? "not-allowed" : "pointer",
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
