import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useNavigate } from "react-router-dom";

export default function TransactionRecSection() {
    const navigate = useNavigate();

    return (
        <AuthenticatedLayout>
            {/* Header with Back button */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "24px",
                    marginBottom: "16px",
                    paddingLeft: "7rem",
                    paddingRight: "7rem",
                }}
            >
                <h1
                    style={{
                        fontSize: "3rem",
                        fontWeight: 800,
                        lineHeight: 1.3,
                        margin: 0,
                        WebkitTextStroke: ".8px #000000",
                        backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    }}
                >
                    Transaction Record
                </h1>

                <button
                    onClick={() => navigate("/dashboard")}
                    style={{
                        backgroundColor: "#4b2e17",
                        color: "#fff",
                        padding: "8px 20px",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: 600,
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#6b3e1f")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4b2e17")}
                >
                    ← Back
                </button>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}>
                <button
                    onClick={() => navigate("/make-transaction")}
                    style={{
                        display: "block",
                        textAlign: "left",
                        border: "1px solid #5c5c5cff",
                        color: "#000",
                        fontWeight: "bold",
                        padding: "12px 32px",
                        backgroundColor: "#f9f5f0",
                        width: "100%",
                        maxWidth: "1020px",
                        margin: "0 auto",
                        fontSize: "24px",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e8d4b8")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f9f5f0")}
                >
                    Make a Transaction Record Form
                </button>

                <button
                    onClick={() => navigate("/transaction-record")}
                    style={{
                        display: "block",
                        textAlign: "left",
                        border: "1px solid #5c5c5cff",
                        color: "#000",
                        fontWeight: "bold",
                        padding: "12px 32px",
                        backgroundColor: "#f9f5f0",
                        width: "100%",
                        maxWidth: "1020px",
                        margin: "0 auto",
                        fontSize: "24px",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e8d4b8")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f9f5f0")}
                >
                    Transaction Records List
                </button>
            </div>
        </AuthenticatedLayout>
    );
}
