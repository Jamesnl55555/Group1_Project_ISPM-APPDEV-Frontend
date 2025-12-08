import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";

export default function CapitalReportWeekly() {
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [user, useState] = useState(null);

    const fetchData = async () => {
        const response = await axios.get(`/api/capital-weekly?page=${page}`);

        setRecords(response.data.weekly_capital);
        setLastPage(response.data.last_page);
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <AuthenticatedLayout user={user}>
            <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow border">
                <h1 className="text-xl font-bold mb-4">Weekly Capital Report</h1>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Week Start</th>
                            <th className="border px-4 py-2">Week End</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {records.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{item.week_start}</td>
                                <td className="border px-4 py-2">{item.week_end}</td>
                                <td className="border px-4 py-2">₱{item.amount}</td>
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
