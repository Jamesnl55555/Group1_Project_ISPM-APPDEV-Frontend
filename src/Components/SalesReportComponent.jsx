import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from '@/api/axios';

function SalesReportComponent() {
    const [data, setData] = useState([]);
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
        axios.get('/api/amounts')
        .then(response => setData(response.data))
        .catch(error => console.error(error));

        axios.get('/api/fetchtotaltransactions')
        .then(response => setTotalSales(response.data.total_amount))
        .catch(error => console.error(error));
    }, []);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                Total Sales: ₱ {totalSales}
            </p>
            <div style={{ flexGrow: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="total_amount" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesReportComponent;
