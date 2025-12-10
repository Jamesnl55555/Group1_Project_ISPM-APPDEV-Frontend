import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "@/api/axios";
import useForm from "@/hooks/useForm";

export default function AddItem() {
  const [products, setProducts] = useState([]);
  const form = useForm({ cart: [] });
  const [quantities, setQuantities] = useState({});

  const fetchProducts = async () => {
      try {
        const resp = await axios.get("/api/fetchproducts");
        setProducts(resp.data.products || []);
      } catch (err) {
        console.error("Failed to fetch products for AddItem:", err);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    const existingItem = form.data.cart.find((item) => item.id === product.id);
    if (existingItem) {
      form.setData(
        "cart",
        form.data.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      form.setData("cart", [...form.data.cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...form.data.cart];
    newCart.splice(index, 1);
    form.setData("cart", newCart);
  };

  const clearCart = () => {
    form.setData("cart", []);
  };

  const submitProducts = (e) => {
    e.preventDefault();
    if (form.data.cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const payload = {
      cart: form.data.cart.map((i) => ({
        id: i.id,
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
    };

    form.post("/api/checkout", {
      data: payload,
      onSuccess: () => {
      clearCart();
      fetchProducts();
      },
      onError: (errors) => console.error("Checkout failed:", errors),
    });

  };

  const handleQuantityChange = (productId, value) => {
    const qty = Math.max(1, Number(value));
    setQuantities({ ...quantities, [productId]: qty });
    form.setData(
      "cart",
      form.data.cart.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  return (
    <AuthenticatedLayout>
      <div style={{ padding: "3rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Title */}
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#000", textAlign: "center" }}>
          Record Transaction Form
        </h1>

        <div style={{ display: "flex", gap: "1rem" }}>
          {/* Products List */}
          <div style={{ width: "40rem", backgroundColor: "#f9f9f9", border: "1px solid #000", padding: "1rem", boxShadow: "5px 5px 0 rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <input
                type="text"
                placeholder="Search for Product..."
                style={{ border: "1px solid #ccc", padding: "0.25rem 0.5rem", width: "50%" }}
              />
              <p style={{ fontWeight: "600", fontSize: "0.875rem" }}>Transaction #: 00000000</p>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #ccc", color: "#000" }}>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>Item</th>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>Price</th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>Stock</th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} style={{ borderBottom: "1px solid #ccc" }}>
                    <td style={{ padding: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={product.quantity === 0}
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          borderRadius: "50%",
                          border: "1px solid #4b2e17",
                          backgroundColor: product.quantity === 0 ? "#ccc" : "#e6d6c3",
                          color: product.quantity === 0 ? "#888" : "#4b2e17",
                          cursor: product.quantity === 0 ? "not-allowed" : "pointer",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        +
                      </button>
                      {product.name}
                    </td>

                    <td style={{ padding: "0.5rem" }}>₱{product.price}</td>

                    <td style={{ padding: "0.5rem", textAlign: "center", color: product.quantity > 0 ? "green" : "red" }}>
                      {product.quantity > 0 ? product.quantity : "Out of Stock"}
                    </td>

                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                      <input
                        type="number"
                        min="1"
                        value={quantities[product.id] || 1}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        style={{ width: "3rem", textAlign: "center", border: "1px solid #ccc" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart */}
          <div style={{ width: "16rem", backgroundColor: "#f4e8da", border: "1px solid #000", padding: "1rem", boxShadow: "5px 5px 0 rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <h2 style={{ fontWeight: "bold", marginBottom: "0.75rem" }}>🛒 Cart</h2>

            {form.data.cart.length === 0 ? (
              <p style={{ fontSize: "0.875rem", color: "#666" }}>No items added yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {form.data.cart.map((item, index) => (
                  <div key={index} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "0.25rem", backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "0.875rem" }}>
                      <p style={{ fontWeight: "bold", color: "#000" }}>{item.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Total: ₱{item.quantity * item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      style={{ border: "none", background: "none", color: "red", cursor: "pointer", fontWeight: "bold" }}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={submitProducts}
              disabled={form.data.cart.length === 0}
              style={{
                marginTop: "1rem",
                backgroundColor: "#4b2e17",
                color: "#fff",
                padding: "0.5rem",
                borderRadius: "0.25rem",
                cursor: form.data.cart.length === 0 ? "not-allowed" : "pointer",
                opacity: form.data.cart.length === 0 ? 0.5 : 1,
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
