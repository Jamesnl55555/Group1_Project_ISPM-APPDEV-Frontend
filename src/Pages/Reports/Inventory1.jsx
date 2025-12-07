import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IconPencil, IconTrash, IconEye } from "@tabler/icons-react";
import axios from "@/api/axios";

export default function Inventory1() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/fetchproducts");
        setProducts(response.data.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const editProduct = (id) => navigate(`/edit-product/${id}`);
  const deleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`/api/delete-item/${id}`)
        .then(() => setProducts(products.filter((p) => p.id !== id)))
        .catch((err) => console.error(err));
    }
  };

  const categories = [...new Set(products.map((p) => p.category))];
  const filteredProducts = products.filter(
    (p) =>
      (!search || p.name.toLowerCase().includes(search.toLowerCase()))
  );
  const lowStockProducts = filteredProducts.filter((p) => p.quantity <= 20);

  if (loading)
    return (
      <AuthenticatedLayout>
        <div>Loading...</div>
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
            lineHeight: "1.3",
            fontSize: "3rem",
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

        <InventoryTable
          products={filteredProducts}
          title="Inventory"
          editProduct={editProduct}
          deleteProduct={deleteProduct}
          categories={categories}
        />

        <InventoryTable
          products={lowStockProducts}
          title="Products Low In Stock!"
          editProduct={editProduct}
          deleteProduct={deleteProduct}
          lowStock
          categories={categories}
        />
      </div>
    </AuthenticatedLayout>
  );
}

function InventoryTable({
  products,
  title,
  editProduct,
  deleteProduct,
  lowStock = false,
  categories,
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
                "Quantity Available",
                "Actions",
              ].map((th) => (
                <th
                  key={th}
                  className="px-3 py-2 text-left text-sm font-semibold"
                >
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
                    <ActionButton color="#753500" hover="#532600">
                      <IconEye size={16} />
                    </ActionButton>
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
