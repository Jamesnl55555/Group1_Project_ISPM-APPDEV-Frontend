import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { IconPencil, IconTrash, IconEye } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteButton from '@/Components/DeleteButton';
import { useState, useEffect } from 'react';
import axios from '@/api/axios';

export default function Inventory1() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/fetchproducts');
        setProducts(response.data.products || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const edit = (id) => navigate(`/edit-product/${id}`);
  const del = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      axios.delete(`/api/delete-item/${id}`)
        .then(() => {
          console.log("Product deleted successfully");
          setProducts(products.filter(p => p.id !== id));
        })
        .catch((err) => {
          console.error("Error deleting product:", err);
        });
    }
  }

  return (
    <AuthenticatedLayout
      header={<h1
                className="text-4xl font-extrabold text-[#4b2e17] drop-shadow-sm"
                style={{
                    WebkitTextStroke: ".8px #000000",
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
            </h1>}
    >
  {/* Add Product Button */}
<button
  onClick={() => navigate("/add-product")}
  className="w-full sm:w-[68rem] bg-[#fff2e0] border border-black
  font-semibold text-black text-2xl py-3 text-left pl-6
  hover:bg-[#e8d4b8] transition-all duration-200"
  style={{ maxWidth: "68rem", marginTop: "-10px", marginLeft: "7rem" }}
>
  Add Product
</button>

{/* Inventory Section */}
<div style={{ marginLeft: "7rem" }}>
  {/* Inventory Table */}
  <h2 className="text-3xl font-bold text-black mb-3 mt-8">Inventory</h2>
  <div className="border border-[#4b2e17] bg-white shadow-[5px_5px_0px_gray] p-4 overflow-x-auto w-[68rem]">
    <div className="flex flex-wrap gap-4 mb-3">
      <div>
        <label className="block text-sm font-semibold text-black mb-1">Search for Product:</label>
        <input
          type="text"
          placeholder="Enter Product Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-400 px-3 py-1 focus:outline-none focus:ring focus:ring-[#d7bfa0]"
          style={{ width: '50rem' }}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-black mb-1">Category:</label>
        <select className="border border-gray-400 px-3 py-1 w-48 focus:outline-none focus:ring focus:ring-[#d7bfa0] text-gray-500">
  <option>Category</option>
</select>

      </div>
    </div>

    <table className="min-w-full border-collapse">
      <thead className="bg-[#d6d6d6] text-black border-b border-[#4b2e17]">
        <tr>
          <th className="px-3 py-2 text-left text-sm font-semibold ">Product Image</th>
          <th className="px-3 py-2 text-left text-sm font-semibold">Product #</th>
          <th className="px-3 py-2 text-left text-sm font-semibold">Category</th>
          <th className="px-3 py-2 text-left text-sm font-semibold">Product Name</th>
          <th className="px-3 py-2 text-left text-sm font-semibold">Price</th>
          <th className="px-3 py-2 text-left text-sm font-semibold">Quantity Available</th>
          <th className="px-3 py-2 text-center text-sm font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 && (
          products.map((item) => (
            <tr key={item.id} className={item.id % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="px-3 py-2">
                <img src={`/${item.file_path}`} alt={item.name} className="w-12 h-12 rounded-md" onError={(e) => e.target.style.display = "none"}/>
              </td>
              <td className="px-3 py-2 text-sm text-gray-700">{item.id}</td>
              <td className="px-3 py-2 text-sm text-gray-700">{item.category}</td>
              <td className="px-3 py-2 text-sm text-gray-700">{item.name}</td>
              <td className="px-3 py-2 text-sm text-gray-700">₱ {item.price}</td>
              <td className="px-3 py-2 text-sm text-gray-700">{item.quantity}</td>
        <td className="px-3 py-2 flex items-center justify-center gap-3">
          <i className="fa-solid fa-pen text-green-600 cursor-pointer" onClick={() => edit(item.id)}><IconPencil /></i>
          <i className="fa-solid fa-trash text-red-600 cursor-pointer" onClick={() => del(item.id)}><IconTrash /></i>
          <i className="fa-solid fa-eye text-gray-700 cursor-pointer"><Link><IconEye /></Link></i>
        </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
  {/* Inventory Table */}
  <h2 className="text-3xl font-bold text-black mb-3 mt-8">Products Low In Stock!</h2>
  <div className="border border-[#4b2e17] bg-white shadow-[5px_5px_0px_gray] p-4 overflow-x-auto w-[68rem]">
    <div className="flex flex-wrap gap-4 mb-3">
      <div>
        <label className="block text-sm font-semibold text-black mb-1">Search for Product:</label>
        <input
          type="text"
          placeholder="Enter Product Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-400 px-3 py-1 focus:outline-none focus:ring focus:ring-[#d7bfa0]"
          style={{ width: '50rem' }}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-black mb-1">Category:</label>
        <select className="border border-gray-400 px-3 py-1 w-48 focus:outline-none focus:ring focus:ring-[#d7bfa0] text-gray-500">
  <option>Category</option>
</select>

      </div>
    </div>

    <table className="min-w-full border-collapse">
      <thead className="bg-[#d6d6d6] text-black border-b border-[#4b2e17]">
        <tr>
          <th className="px-3 py-2 text-left text-sm font-semibold ">Product Image</th>
          <th className="px-3 py-2 text-left text-sm font-semibold">Product #</th>
          <th className="px-3 py-2 text-left text-sm font-semibold">Category</th>
          <th className="px-3 py-2 text-left text-sm font-semibold">Product Name</th>
          <th className="px-3 py-2 text-left text-sm font-semibold">Price</th>
          <th className="px-3 py-2 text-left text-sm font-semibold">Quantity Available</th>
          <th className="px-3 py-2 text-center text-sm font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 && (
          products.filter((item) => item.quantity <= 20)
            .map((item) => (
            <tr key={item.id} className={item.id % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="px-3 py-2">
                <img src={`/${item.file_path}`} alt={item.name} className="w-12 h-12 rounded-md" onError={(e) => e.target.style.display = "none"}/>
              </td>
              <td className="px-3 py-2 text-sm text-gray-700">{item.id}</td>
              <td className="px-3 py-2 text-sm text-gray-700">{item.category}</td>
              <td className="px-3 py-2 text-sm text-gray-700">{item.name}</td>
              <td className="px-3 py-2 text-sm text-gray-700">₱ {item.price}</td>
              <td className="px-3 py-2 text-sm text-gray-700">{item.quantity}</td>
              <td className="px-3 py-2 flex items-center justify-center gap-3">
                <i className="fa-solid fa-pen text-green-600 cursor-pointer" onClick={() => edit(item.id)}><IconPencil /></i>
                <i className="fa-solid fa-trash text-red-600 cursor-pointer" onClick={() => del(item.id)}><IconTrash /></i>
                <i className="fa-solid fa-eye text-gray-700 cursor-pointer"><IconEye /></i>
              </td>
            </tr>
            
          ))
        )}
      </tbody>
    </table>
  </div>
  
</div>

    </AuthenticatedLayout>
  );
}

