import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "@/api/axios";

import InventoryTable from "@/Components/InventoryTable";
import Pagination from "@/Components/Pagination";

export default function Inventory1() {
  const navigate = useNavigate();

  // INVENTORY DATA
  const [inventory, setInventory] = useState([]);
  const [pageInventory, setPageInventory] = useState(1);
  const [lastPageInventory, setLastPageInventory] = useState(1);

  // LOW STOCK DATA
  const [lowStock, setLowStock] = useState([]);
  const [pageLowStock, setPageLowStock] = useState(1);
  const [lastPageLowStock, setLastPageLowStock] = useState(1);

  // ARCHIVED DATA
  const [archived, setArchived] = useState([]);
  const [pageArchived, setPageArchived] = useState(1);
  const [lastPageArchived, setLastPageArchived] = useState(1);

  const [loading, setLoading] = useState(true);

  // FETCH INVENTORY
  const fetchInventory = async (page = 1) => {
    try {
      const res = await axios.get(`/api/fetchproducts?page=${page}`);
      setInventory(res.data.products);
      setLastPageInventory(res.data.last_page);
    } catch (err) {
      console.error("Failed to load inventory:", err);
    }
  };

  // FETCH LOW STOCK
  const fetchLowStock = async (page = 1) => {
    try {
      const res = await axios.get(`/api/fetchproducts-lowstock?page=${page}`);
      setLowStock(res.data.products);
      setLastPageLowStock(res.data.last_page);
    } catch (err) {
      console.error("Failed to load low stock:", err);
    }
  };

  // FETCH ARCHIVED
  const fetchArchived = async (page = 1) => {
    try {
      const res = await axios.get(`/api/fetchproducts-archived?page=${page}`);
      setArchived(res.data.products);
      setLastPageArchived(res.data.last_page);
    } catch (err) {
      console.error("Failed to load archived:", err);
    }
  };

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetchInventory(pageInventory),
      fetchLowStock(pageLowStock),
      fetchArchived(pageArchived),
    ]).finally(() => setLoading(false));
  }, [pageInventory, pageLowStock, pageArchived]);

  // ACTIONS
  const archiveProduct = (id) => {
    if (confirm("Archive this product?")) {
      axios.post(`/api/archive-item/${id}`).then(() => {
        fetchInventory(pageInventory);
        fetchLowStock(pageLowStock);
        fetchArchived(pageArchived);
      });
    }
  };

  const unarchiveProduct = (id) => {
    if (confirm("Unarchive this product?")) {
      axios.post(`/api/unarchive/${id}`).then(() => {
        fetchInventory(pageInventory);
        fetchLowStock(pageLowStock);
        fetchArchived(pageArchived);
      });
    }
  };

  const editProduct = (id) => navigate(`/edit-product/${id}`);

  const deleteProduct = (id) => {
    if (confirm("Delete this product?")) {
      axios.post(`/api/delete-item/${id}`).then(() => {
        fetchInventory(pageInventory);
        fetchLowStock(pageLowStock);
        fetchArchived(pageArchived);
      });
    }
  };

  if (loading)
    return (
      <AuthenticatedLayout>
        <p>Loading...</p>
      </AuthenticatedLayout>
    );

  return (
    <AuthenticatedLayout
      header={
        <h1
          className="text-4xl font-extrabold text-[#4b2e17] drop-shadow-sm"
          style={{
            WebkitTextStroke: ".8px #000",
            backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginLeft: "5rem",
            marginTop: "-2rem",
            marginBottom: "-1rem",
          }}
        >
          Inventory Management
        </h1>
      }
    >
      <div style={{ marginLeft: "7rem" }}>
        <button
          onClick={() => navigate("/add-product")}
          className="w-full sm:w-[68rem] bg-[#fff2e0] border border-black font-semibold text-black text-2xl py-3 text-left pl-6 hover:bg-[#e8d4b8]"
          style={{ maxWidth: "68rem", marginTop: "-10px" }}
        >
          Add Product
        </button>

        {/* INVENTORY */}
        <InventoryTable
          title="Inventory"
          products={inventory}
          editProduct={editProduct}
          deleteProduct={deleteProduct}
          archiveProduct={archiveProduct}
        />
        <Pagination
          page={pageInventory}
          lastPage={lastPageInventory}
          onPrev={() => setPageInventory((p) => Math.max(1, p - 1))}
          onNext={() => setPageInventory((p) => Math.min(lastPageInventory, p + 1))}
        />

        {/* LOW STOCK */}
        <InventoryTable
          title="Products Low In Stock!"
          products={lowStock}
          editProduct={editProduct}
          deleteProduct={deleteProduct}
          archiveProduct={archiveProduct}
          lowStock
        />
        <Pagination
          page={pageLowStock}
          lastPage={lastPageLowStock}
          onPrev={() => setPageLowStock((p) => Math.max(1, p - 1))}
          onNext={() => setPageLowStock((p) => Math.min(lastPageLowStock, p + 1))}
        />

        {/* ARCHIVED */}
        <InventoryTable
          title="Archived Products"
          products={archived}
          unarchiveProduct={unarchiveProduct}
          archived
        />
        <Pagination
          page={pageArchived}
          lastPage={lastPageArchived}
          onPrev={() => setPageArchived((p) => Math.max(1, p - 1))}
          onNext={() => setPageArchived((p) => Math.min(lastPageArchived, p + 1))}
        />
      </div>
    </AuthenticatedLayout>
  );
}
