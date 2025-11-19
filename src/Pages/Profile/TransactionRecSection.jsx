import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useNavigate } from 'react-router-dom';

export default function TransactionRecSection() {
    const navigate = useNavigate();
    return (
        <AuthenticatedLayout>

            <div className="container mx-auto px-8 py-12">
                <h1 className="text-4xl font-bold text-[#4b2e17] mb-8 drop-shadow-sm">
                    Transaction Record
                </h1>

                <div className="space-y-4 max-w-md mx-auto">
                    {/* Make Transaction Record Form Button */}
                    <button
                        className="w-full text-left border border-[#4b2e17] bg-[#f9f5f0] font-bold px-6 py-4 text-lg hover:bg-[#e8d4b8] transition"
                        onClick={() => navigate("/transaction-record")}
                    >
                        Make a Transaction Record Form
                    </button>

                    {/* Transaction Records List Button */}
                    <button
                        className="w-full text-left border border-[#4b2e17] bg-[#f9f5f0] font-bold px-6 py-4 text-lg hover:bg-[#e8d4b8] transition"
                        onClick={() => navigate("/transaction-record-list")}
                    >
                        Transaction Records List
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
