import React, { useState } from 'react';
import axios from '@/api/axios';

export default function DeletePHistoryButton({ id }) {
    const [visible, setVisible] = useState(false);
    const del = async (id) => {
        try {
            await axios.delete(`/api/product-history/${id}`);
        } catch (e) {}
    };

    return (
        <>
        <button onClick={() => setVisible(true)}>
            Delete Product History
        </button>
        {visible && (
        <div>
        <h1>Are you sure you want to delete?</h1>
        <h1>================================</h1>
        <button onClick={() => setVisible(false)}>No</button>
        <h1>|||||||||||||||||||||||||||||</h1>
        <button onClick={() => del(id)}>Confirm Delete</button>
        <h1>================================</h1>
        </div>
        )}
        </>  
    );
}
