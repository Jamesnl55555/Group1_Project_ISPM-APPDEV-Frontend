import React from "react";
import { useNavigate } from "react-router-dom";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IconPencil, IconTrash, IconEye } from "@tabler/icons-react";
import axios from "@/api/axios";

// -----------------------
// MAIN CONTAINER
// -----------------------
export default function Inventory1() {
  const navigate = useNavigate();

  const inventoryRef = React.useRef(null);
  const lowStockRef = React.useRef(null);
  const archivedRef = React.useRef(null);

  const editProduct = (id) => navigate(`/edit-product/${id}`);

  return (
    <AuthenticatedLayout>
      <div style={{ padding: "2rem", maxWidth: "90rem", margin: "0 auto", marginTop: "-5rem" }}>
        {/* Header */}
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            lineHeight: 1.3,
            WebkitTextStroke: ".8px #000",
            backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1rem",
          }}
        >
          Inventory Management
        </h1>

        {/* Add Product Button */}
        <button
          onClick={() => navigate("/add-product")}
          style={{
            display: "block",
            textAlign: "left",
            border: "1px solid #5c5c5c",
            color: "#000",
            fontWeight: "bold",
            padding: "12px 32px",
            backgroundColor: "#f9f5f0",
            width: "100%",
            maxWidth: "68rem",
            fontSize: "24px",
            cursor: "pointer",
            marginBottom: "2rem",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e8d4b8")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f9f5f0")}
        >
          Add Product
        </button>

        {/* Inventory Table */}
        <InventoryTableWithPagination
          ref={inventoryRef}
          fetchUrl="/api/fetchproducts"
          title="Inventory"
          editProduct={editProduct}
          archiveProductUrl="/api/archive-item"
          deleteProductUrl="/api/delete-item"
          onArchive={() => archivedRef.current?.fetchProducts()}
        />

        {/* Low Stock Table */}
        <InventoryTableWithPagination
          ref={lowStockRef}
          fetchUrl="/api/fetchproducts-lowstock"
          title="Products Low in Stock!"
          editProduct={editProduct}
          archiveProductUrl="/api/archive-item"
          deleteProductUrl="/api/delete-item"
          lowStock
          onArchive={() => archivedRef.current?.fetchProducts()}
        />

        {/* Archived Table */}
        <InventoryTableWithPagination
          ref={archivedRef}
          fetchUrl="/api/fetchproducts-archived"
          title="Archived Products"
          unarchiveProductUrl="/api/unarchive"
          archived
          onUnarchive={() => inventoryRef.current?.fetchProducts()}
        />
      </div>
    </AuthenticatedLayout>
  );
}

// -----------------------
// TABLE WITH PAGINATION COMPONENT
// -----------------------
const InventoryTableWithPagination = React.forwardRef(
  (
    {
      fetchUrl,
      title,
      editProduct,
      archiveProductUrl,
      deleteProductUrl,
      unarchiveProductUrl,
      lowStock = false,
      archived = false,
      onArchive,
      onUnarchive,
    },
    ref
  ) => {
    const [products, setProducts] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [lastPage, setLastPage] = React.useState(1);
    const [loading, setLoading] = React.useState(true);

    const fetchProducts = async (pageNumber = 1) => {
      try {
        setLoading(true);
        const res = await axios.get(`${fetchUrl}?page=${pageNumber}`);
        setProducts(res.data.products || []);
        setLastPage(res.data.last_page || 1);
      } catch (err) {
        console.error(`Failed to fetch ${title}:`, err);
      } finally {
        setLoading(false);
      }
    };

    React.useImperativeHandle(ref, () => ({ fetchProducts }));

    React.useEffect(() => {
      fetchProducts(page);
    }, [page]);

    const archiveProduct = (id) => {
      if (!archiveProductUrl) return;
      if (confirm("Archive this product?")) {
        axios.post(`${archiveProductUrl}/${id}`).then(() => {
          fetchProducts(page);
          onArchive?.();
        });
      }
    };

    const unarchiveProduct = (id) => {
      if (!unarchiveProductUrl) return;
      if (confirm("Unarchive this product?")) {
        axios.post(`${unarchiveProductUrl}/${id}`).then(() => {
          fetchProducts(page);
          onUnarchive?.();
        });
      }
    };

    const deleteProduct = (id) => {
      if (!deleteProductUrl) return;
      if (confirm("Delete this product?")) {
        axios.post(`${deleteProductUrl}/${id}`).then(() => fetchProducts(page));
      }
    };

    if (loading)
      return (
        <div className="my-8">
          <h2 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>{title}</h2>
          <p>Loading...</p>
        </div>
      );

    return (
      <div className="mb-12">
        <h2 style={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "0.5rem" }}>{title}</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ backgroundColor: "#d6b385", color: "#3b1f0d" }}>
                {["Product Image", "Product #", "Category", "Product Name", "Price", "Quantity", "Actions"].map(
                  (th) => (
                    <th key={th} style={{ border: "1px solid #6b3e1f", padding: "0.75rem", textAlign: "center", fontWeight: "700" }}>
                      {th}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "1rem" }}>
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((item) => (
                  <tr key={item.id} style={{ backgroundColor: lowStock ? "#fff4e1" : "#f9f5f0" }}>
                    <td style={{ border: "1px solid #6b3e1f", padding: "0.5rem", textAlign: "center" }}>
                      {item.file_path !== "empty" && (
                        <img
                          src={item.file_path}
                          alt={item.name}
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      )}
                    </td>
                    <td style={{ border: "1px solid #6b3e1f", padding: "0.5rem", textAlign: "center" }}>{item.id}</td>
                    <td style={{ border: "1px solid #6b3e1f", padding: "0.5rem", textAlign: "center" }}>{item.category}</td>
                    <td style={{ border: "1px solid #6b3e1f", padding: "0.5rem", textAlign: "center" }}>{item.name}</td>
                    <td style={{ border: "1px solid #6b3e1f", padding: "0.5rem", textAlign: "center" }}>₱ {item.price}</td>
                    <td style={{ border: "1px solid #6b3e1f", padding: "0.5rem", textAlign: "center" }}>{item.quantity}</td>
                    <td style={{ border: "1px solid #6b3e1f", padding: "0.5rem", textAlign: "center" }}>
                      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
                        {!archived && (
                          <>
                            {editProduct && <ActionButton color="#44b954" hover="#297233" onClick={() => editProduct(item.id)}><IconPencil size={16} /></ActionButton>}
                            {deleteProductUrl && <ActionButton color="#f12323" hover="#9e1818" onClick={() => deleteProduct(item.id)}><IconTrash size={16} /></ActionButton>}
                            {archiveProductUrl && <ActionButton color="#753500" hover="#532600" onClick={() => archiveProduct(item.id)}><IconEye size={16} /></ActionButton>}
                          </>
                        )}
                        {archived && unarchiveProductUrl && <ActionButton color="#2970ff" hover="#1e4fb8" onClick={() => unarchiveProduct(item.id)}>Unarchive</ActionButton>}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <Pagination page={page} lastPage={lastPage} onPrev={() => setPage((p) => Math.max(1, p - 1))} onNext={() => setPage((p) => Math.min(lastPage, p + 1))} />
      </div>
    );
  }
);

// -----------------------
// BUTTON COMPONENT
// -----------------------
function ActionButton({ color, hover, children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color, color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", padding: "0.4rem 0.6rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "background-color 0.2s" }}
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
        className={`px-4 py-2 border rounded ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-200"}`}
        disabled={page === 1}
        onClick={onPrev}
      >
        ⬅ Prev
      </button>
      <button
        className={`px-4 py-2 border rounded ${page === lastPage ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-200"}`}
        disabled={page === lastPage}
        onClick={onNext}
      >
        Next ➡
      </button>
    </div>
  );
}
