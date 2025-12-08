import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "@/api/axios";
import { useSearchParams } from "react-router-dom";

export default function CapitalReportCustom() {
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const fetchData = async () => {
        if (!from || !to) return;

        try {
            setLoading(true);

            // Fetch authenticated user
            if (!user) {
                const userRes = await axios.get("/api/user");
                setUser(userRes.data);
            }

            // Fetch custom capital data
            const response = await axios.get("/api/capital-custom", {
                params: { start: from, end: to, page }
            });

            if (response.data.success) {
                setRecords(response.data.custom_capital || []);
                setLastPage(response.data.last_page || 1);
            } else {
                setRecords([]);
                setLastPage(1);
            }
        } catch (err) {
            console.error("Error fetching custom capital:", err);
            setRecords([]);
            setLastPage(1);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [from, to, page]);

    const overallTotal = records.reduce((sum, r) => sum + Number(r.amount || 0), 0);

    return (
        <AuthenticatedLayout user={user}>
            <div style={{ maxWidth: "68rem", margin: "2.5rem auto", fontFamily: "sans-serif" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>Custom Capital Report</h1>
                <p style={{ marginBottom: "1rem", color: "#555" }}>
                    {from} → {to}
                </p>

                <div style={{ backgroundColor: "#fff", border: "1px solid #d7bfa0", borderRadius: "0.75rem", padding: "1rem", overflowX: "auto", marginBottom: "2rem" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                        <thead style={{ backgroundColor: "#f3e6d9", color: "#4b2e17" }}>
                            <tr>
                                <th style={{ padding: ".5rem" }}>Date</th>
                                <th style={{ padding: ".5rem" }}>Amount</th>
                                <th style={{ padding: ".5rem" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="3" style={{ padding: "1rem" }}>Loading...</td>
                                </tr>
                            ) : records.length ? (
                                records.map((item, index) => (
                                    <tr key={index} style={{ borderBottom: "1px solid #f0e4d7" }}>
                                        <td style={{ padding: ".5rem" }}>{item.date}</td>
                                        <td style={{ padding: ".5rem" }}>₱ {item.amount}</td>
                                        <td style={{ padding: ".5rem" }}>{item.action}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ padding: "1rem", color: "#444" }}>
                                        No capital records found for this date range.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {lastPage > 1 && (
                    <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
                        <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} style={{ padding: ".5rem 1rem", border: "1px solid #ccc", borderRadius: ".375rem", cursor: page === 1 ? "not-allowed" : "pointer" }}>
                            ⬅ Prev
                        </button>
                        <span style={{ alignSelf: "center" }}>Page {page} of {lastPage}</span>
                        <button disabled={page === lastPage} onClick={() => setPage(p => Math.min(lastPage, p + 1))} style={{ padding: ".5rem 1rem", border: "1px solid #ccc", borderRadius: ".375rem", cursor: page === lastPage ? "not-allowed" : "pointer" }}>
                            Next ➡
                        </button>
                    </div>
                )}

                {/* Overall Total */}
                <div style={{ backgroundColor: "#f1f1f1", padding: "1rem", borderRadius: ".75rem", border: "1px solid #d7bfa0", display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                    <span>Overall Total Capital</span>
                    <span style={{ color: "green" }}>₱ {overallTotal}</span>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
