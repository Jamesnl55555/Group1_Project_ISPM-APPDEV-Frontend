import React, { useEffect, useState } from 'react';
import axios from '@/api/axios'; 
import { IconAlertTriangle } from '@tabler/icons-react';

function InventoryAlertComponent() {
  const [lowStockCount, setLowStockCount] = useState(null);

  useEffect(() => {
    axios.get('/api/low-stock')
      .then(res => {
        if (res.data.success) {
          setLowStockCount(res.data.low_stock_count);
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (lowStockCount === null) return <p>No products low on stock.</p>;

  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', width: '200px' }}>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: lowStockCount > 0 ? 'red' : 'green' }}>
         <div> <IconAlertTriangle/>{lowStockCount} items low in stock!</div>
      </p>
    </div>
  );
};

export default InventoryAlertComponent;
