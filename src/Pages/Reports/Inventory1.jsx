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

        {/* INVENTORY TABLE */}
        <InventoryTableWithPagination
          ref={inventoryRef}
          fetchUrl="/api/fetchproducts"
          title="Inventory"
          editProduct={editProduct}
          archiveProductUrl="/api/archive-item"
          deleteProductUrl="/api/delete-item"
          onArchive={() => archivedRef.current?.fetchProducts()}
        />

        {/* LOW STOCK TABLE */}
        <InventoryTableWithPagination
          ref={lowStockRef}
          fetchUrl="/api/fetchproducts-lowstock"
          title="Products Low In Stock!"
          editProduct={editProduct}
          archiveProductUrl="/api/archive-item"
          deleteProductUrl="/api/delete-item"
          lowStock
          onArchive={() => archivedRef.current?.fetchProducts()}
        />

        {/* ARCHIVED TABLE */}
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

    // Expose fetchProducts via ref
    React.useImperativeHandle(ref, () => ({
      fetchProducts,
    }));

    React.useEffect(() => {
      fetchProducts(page);
    }, [page]);

    // -----------------------
    // ACTIONS
    // -----------------------
    const archiveProduct = (id) => {
      if (!archiveProductUrl) return;
      if (confirm("Archive this product?")) {
        axios.post(`${archiveProductUrl}/${id}`).then(() => {
          fetchProducts(page); // refresh current table
          onArchive?.();       // refresh archived table
        });
      }
    };

    const unarchiveProduct = (id) => {
      if (!unarchiveProductUrl) return;
      if (confirm("Unarchive this product?")) {
        axios.post(`${unarchiveProductUrl}/${id}`).then(() => {
          fetchProducts(page); // refresh archived table
          onUnarchive?.();     // refresh inventory table
        });
      }
    };

    const deleteProduct = (id) => {
      if (!deleteProductUrl) return;
      if (confirm("Delete this product?")) {
        axios.post(`${deleteProductUrl}/${id}`).then(() => fetchProducts(page));
      }
    };

    // -----------------------
    // RENDER
    // -----------------------
    if (loading)
      return (
        <div className="my-8">
          <h2 className="text-3xl font-bold text-black mb-3">{title}</h2>
          <p>Loading...</p>
        </div>
      );

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
                          {editProduct && (
                            <ActionButton
                              color="#44b954"
                              hover="#297233"
                              onClick={() => editProduct(item.id)}
                            >
                              <IconPencil size={16} />
                            </ActionButton>
                          )}
                          {deleteProductUrl && (
                            <ActionButton
                              color="#f12323"
                              hover="#9e1818"
                              onClick={() => deleteProduct(item.id)}
                            >
                              <IconTrash size={16} />
                            </ActionButton>
                          )}
                          {archiveProductUrl && (
                            <ActionButton
                              color="#753500"
                              hover="#532600"
                              onClick={() => archiveProduct(item.id)}
                            >
                              <IconEye size={16} />
                            </ActionButton>
                          )}
                        </>
                      )}

                      {archived && unarchiveProductUrl && (
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

        {/* PAGINATION */}
        <Pagination
          page={page}
          lastPage={lastPage}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(lastPage, p + 1))}
        />
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
