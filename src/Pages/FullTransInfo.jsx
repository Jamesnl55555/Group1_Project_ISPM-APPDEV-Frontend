import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

// Mock data
const MOCK_TRANSACTIONS = [
  {
    id: 1,
    date: "2025-11-18 - 3:45 PM",
    amount: 5000,
    method: "Cash",
    items: [
      { category: "Food", name: "Burger", price: 200, qty: 2 },
      { category: "Drink", name: "Cola", price: 50, qty: 3 },
    ],
  },
  {
    id: 2,
    date: "2025-11-19 - 4:30 PM",
    amount: 7500,
    method: "Card",
    items: [
      { category: "Food", name: "Pizza", price: 500, qty: 3 },
      { category: "Dessert", name: "Cake", price: 150, qty: 2 },
    ],
  },
];

export default function FullTransInfo({ user }) {
  // Get ID from URL
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const transaction = MOCK_TRANSACTIONS.find((t) => t.id === id);

  if (!transaction)
    return (
      <AuthenticatedLayout user={user}>
        <div style={{ padding: "2rem" }}>Transaction not found.</div>
      </AuthenticatedLayout>
    );

  return (
    <AuthenticatedLayout user={user}>
      <div style={{ padding: "1.5rem" }}>
        

        {/* Title */}
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "#000",
            marginBottom: ".5rem",
            letterSpacing: "1px",
            marginTop:"-3rem"
          }}
          
        >
          Full Transaction Information
        </h1>

        {/* Main Container */}
        <div
          style={{
            border: "1px solid #000",
            backgroundColor: "#fff",
            padding: "1.25rem",
            margin: "0 auto",
            maxWidth: "85rem",
            boxShadow: "7px 7px 0px gray",
          }}
        >
          {/* Header Info */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div>
              <p>
                <strong>Transaction Number:</strong> {transaction.id}
              </p>
              <p>
                <strong>Payment Method:</strong> {transaction.method}
              </p>
              <p>
                <strong>Total Amount:</strong> ₱ {transaction.amount.toLocaleString()}
              </p>
            </div>

            <div>
              <p>
                <strong>Date and Time:</strong> {transaction.date}
              </p>
            </div>
          </div>

          {/* Table */}
          <div
            style={{
              maxHeight: "23rem",
              overflowY: "auto",
              border: "1px solid #000",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.9rem",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f0f0f0" }}>
                  <th style={th}>Category</th>
                  <th style={th}>Item Name</th>
                  <th style={th}>Price</th>
                  <th style={th}>Quantity</th>
                  <th style={th}>Total Amount</th>
                </tr>
              </thead>

              <tbody>
  {transaction.items.map((item, index) => (
    <tr
      key={index}
      style={{
        backgroundColor: index % 2 === 0 ? "#fffaf6" : "#f6ebdf",
      }}
    >
      <td style={{ ...td, color: "#2e1a0e" }}>
        #{transaction.id.toString().padStart(10, "0")}
      </td>
      <td style={td}>{item.name}</td>
      <td style={td}>₱ {item.price.toLocaleString()}</td>
      <td style={td}>{item.qty}</td>
      <td style={td}>₱ {(item.price * item.qty).toLocaleString()}</td>
    </tr>
  ))}
</tbody>


              {/* Footer Total */}
              <tfoot>
                <tr
                  style={{
                    backgroundColor: "#e0e0e0",
                    fontWeight: "bold",
                  }}
                >
                  <td
                    colSpan="5"
                    style={{
                      padding: "0.75rem",
                      textAlign: "left",
                      borderTop: "1px solid #000",
                    }}
                  >
                    Total Amount of Transaction: ₱ {transaction.amount.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

const th = {
  border: "1px solid #444",
  padding: "0.5rem",
  textAlign: "center",
  fontWeight: "bold",
};

const td = {
  border: "1px solid #444",
  padding: "0.5rem",
  textAlign: "center",
};
