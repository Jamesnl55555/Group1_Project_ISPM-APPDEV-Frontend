import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IconPencil, IconTrash, IconEye } from "@tabler/icons-react";
import axios from "@/api/axios";

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
  const [search, setSearch] = useState("");

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
          className="w-full sm:w-[68rem] bg-[#fff2e0] border border-black font-semibold text-black text-2xl py-3 text-left pl-6
                     hover:bg-[#e8d4b8] transition-all duration-200"
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

        {/* PAGINATION — INVENTORY */}
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

        {/* PAGINATION — LOW STOCK */}
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

        {/* PAGINATION — ARCHIVED */}
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

// -----------------------
// TABLE COMPONENT
// -----------------------
function InventoryTable({
  products,
  title,
  editProduct,
  deleteProduct,
  archiveProduct,
  unarchiveProduct,
  lowStock = false,
  archived = false,
}) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-black mb-3 mt-8">{title}</h2>

      <div className="border border-[#4b2e17] bg-white shadow-[5px_5px_0px_gray] p-4 overflow-x-auto w-[68rem]">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#d6d6d6] text-black border-b border-[#4b2e17]">
            <tr>
              {[
                "Product Image",
                "Product #",
                "Category",
                "Product Name",
                "Price",
                "Quantity",
                "Actions",
              ].map((th) => (
                <th key={th} className="px-3 py-2 text-left text-sm font-semibold">
                  {th}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr
                  key={item.id}
                  className={`${lowStock ? "bg-[#fff4e1]" : "bg-white"} text-sm text-gray-700`}
                >
                  <td className="px-3 py-2">
                    <img
                      src={`/${item.file_path}`}
                      alt={item.name}
                      className="w-12 h-12 rounded-md"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </td>

                  <td className="px-3 py-2">{item.id}</td>
                  <td className="px-3 py-2">{item.category}</td>
                  <td className="px-3 py-2">{item.name}</td>
                  <td className="px-3 py-2">₱ {item.price}</td>
                  <td className="px-3 py-2">{item.quantity}</td>

                  <td className="px-3 py-2 flex justify-center gap-2">
                    {!archived && (
                      <>
                        <ActionButton
                          color="#44b954"
                          hover="#297233"
                          onClick={() => editProduct(item.id)}
                        >
                          <IconPencil size={16} />
                        </ActionButton>

                        <ActionButton
                          color="#f12323"
                          hover="#9e1818"
                          onClick={() => deleteProduct(item.id)}
                        >
                          <IconTrash size={16} />
                        </ActionButton>

                        <ActionButton
                          color="#753500"
                          hover="#532600"
                          onClick={() => archiveProduct(item.id)}
                        >
                          <IconEye size={16} />
                        </ActionButton>
                      </>
                    )}

                    {archived && (
                      <ActionButton
                        color="#2970ff"
                        hover="#1e4fb8"
                        onClick={() => unarchiveProduct(item.id)}
                      >
                        Unarchive
                      </ActionButton>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// -----------------------
// BUTTON COMPONENT
// -----------------------
function ActionButton({ color, hover, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-1 rounded transition-colors flex items-center justify-center"
      style={{ backgroundColor: color, color: "#fff" }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hover)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = color)}
    >
      {children}
    </button>
  );
}

// -----------------------
// PAGINATION COMPONENT
// -----------------------
function Pagination({ page, lastPage, onPrev, onNext }) {
  return (
    <div className="flex justify-center mt-4 gap-4">
      <button
        className={`px-4 py-2 border rounded ${
          page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-200"
        }`}
        disabled={page === 1}
        onClick={onPrev}
      >
        ⬅ Prev
      </button>

      <button
        className={`px-4 py-2 border rounded ${
          page === lastPage
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-white hover:bg-gray-200"
        }`}
        disabled={page === lastPage}
        onClick={onNext}
      >
        Next ➡
      </button>
    </div>
  );
}
