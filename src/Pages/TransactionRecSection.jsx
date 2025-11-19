import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useNavigate } from 'react-router-dom';

export default function TransactionRecSection() {
    const navigate = useNavigate();
    return (
        <AuthenticatedLayout>

            {/* Header with Back button */}
            <div className="flex items-center justify-between mt-6 mb-4"
                 style={{ paddingLeft: "7rem", paddingRight: "7rem" }}>
                <h1
                    className="text-4xl font-extrabold drop-shadow-sm"
                    style={{
                        WebkitTextStroke: ".8px #000000",
                        backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        lineHeight: "1.3",
                        fontSize: "3rem",
                        margin: 0
                    }}
                >
                    Transaction Record
                </h1>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-[#4b2e17] text-white px-5 py-2 rounded-md text-base font-semibold hover:bg-[#6b3e1f] transition shadow-md"
                >
                    ← Back
                </button>
            </div>

            {/* Buttons */}
            <div className="space-y-4 mb-12">
                <button
                    className="block text-left border border-[#4b2e17] text-black font-bold px-8 py-3 bg-[#f9f5f0] hover:bg-[#e8d4b8] transition-colors duration-200
                    w-full sm:w-[50rem] lg:w-[68rem] mx-auto text-2xl"
                    onClick={() => navigate("/make-transaction")}
                >
                    Make a Transaction Record Form
                </button>

                <button
                    className="block text-left border border-[#4b2e17] text-black font-bold px-8 py-3 bg-[#f9f5f0] hover:bg-[#e8d4b8] transition-colors duration-200
                    w-full sm:w-[50rem] lg:w-[68rem] mx-auto text-2xl"
                    onClick={() => navigate("/transaction-record")}
                >
                    Transaction Records List
                </button>
            </div>
        </AuthenticatedLayout>
    );
}
