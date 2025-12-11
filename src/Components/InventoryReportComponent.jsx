import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';

function InventoryReportComponent() {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/user-products')
      .then(res => {
        if (res.data.success) setLatestProducts(res.data.latest_products);
      })
      .catch(err => console.error(err));
  }, []);

  if (latestProducts.length === 0) return <p>No products found.</p>;

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '0.5rem' }}>
      <h3 style={{ marginBottom: '0.5rem' }}>Key Inventory</h3>
      <ul style={{ paddingLeft: '1rem' }}>
        {latestProducts.map((product, index) => (
          <li key={index} style={{ marginBottom: '0.25rem' }}>
            <strong>{product.name}</strong>: {product.quantity} items left
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryReportComponent;
