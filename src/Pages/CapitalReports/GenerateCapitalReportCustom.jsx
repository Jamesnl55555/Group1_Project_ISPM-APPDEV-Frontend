import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "@/api/axios";
import { useSearchParams } from "react-router-dom";

export default function CapitalReportCustom() {
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [user, setUser] = useState(null);

    const [searchParams] = useSearchParams();
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const fetchData = async () => {
        axios.get("/api/user").then((res) => setUser(res.data));
        const response = await axios.get(
            `/api/capital-custom?from=${from}&to=${to}&page=${page}`
        );

        setRecords(response.data.custom_capital);
        setLastPage(response.data.last_page);
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <AuthenticatedLayout user={user}>
            <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow border">
                <h1 className="text-xl font-bold mb-4">Custom Capital Report</h1>
                <p className="mb-4 text-gray-600">
                    {from} → {to}
                </p>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Type</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {records.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{item.date}</td>
                                <td className="border px-4 py-2">₱{item.amount}</td>
                                <td className="border px-4 py-2">{item.type}</td>
                                <td className="border px-4 py-2">{item.action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between mt-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span>Page {page} of {lastPage}</span>

                    <button
                        disabled={page === lastPage}
                        onClick={() => setPage(page + 1)}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
