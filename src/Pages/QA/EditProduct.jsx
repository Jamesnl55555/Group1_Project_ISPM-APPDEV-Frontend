import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "@/api/axios";
import { useForm } from "@/hooks/useForm";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const form = useForm(
        {
            name: "",
            quantity: "",
            price: "",
            category: "",
            is_archived: false,
            file: null,
        }
    );

    // Fetch product on mount
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Try a dedicated single-product endpoint first
                const listResp = await axios.get('/api/fetchproducts');
                const found = (listResp.data.products || []).find(p => String(p.id) === String(id));
                if (found) {
                    setProduct(found);
                    form.setData({
                        name: found.name || "",
                        quantity: found.quantity || "",
                        price: found.price || "",
                        category: found.category || "",
                        is_archived: found.is_archived || false,
                        file: null,
                    });
                } else {
                    console.error(`Product with id ${id} not found in fetchproducts response`);
                }
            } catch (err) {    
                console.error("Failed to fetch product:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const submitProducts = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', form.data.name);
            formData.append('quantity', form.data.quantity);
            formData.append('price', form.data.price);
            formData.append('category', form.data.category);
            formData.append('is_archived', form.data.is_archived ? 1 : 0);
            if (form.data.file) {
                formData.append('file', form.data.file);
            }

            // Backend exposes update-product/:id as POST — use that route
            await axios.post(`/api/update-product/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            navigate('/inventory1');
        } catch (err) {
            console.error('Update product error:', err);
            if (err.response && err.response.data) {
                console.error('Validation errors:', err.response.data);
            }
        }
    };

    if (loading) return <AuthenticatedLayout><div>Loading...</div></AuthenticatedLayout>;

    return (
        <AuthenticatedLayout>
            <div className="flex justify-center py-12 px-4">
                <form
                    onSubmit={submitProducts} 
                    encType="multipart/form-data"
                    className="bg-[#fefaf7] border border-gray-300 rounded-2xl shadow-md w-full max-w-2xl"
                >
                    {/* 🟤 Header */}
                    <div className="bg-[#f8ecdf] px-6 py-4 border-b border-gray-300 rounded-t-2xl">
                        <h1 className="text-xl font-bold text-black">Edit Product</h1>
                    </div>

                    {/* 🟤 Form Fields */}
                    <div className="p-6 space-y-5">
                        {/* Product Name + Change Image */}
                        <div>
                            <label className="font-semibold text-sm text-gray-800">
                                Edit Product Name
                            </label>
                            <div className="flex items-center gap-2 mt-1">
                                <input
                                    type="text"
                                    name="name"
                                    className="flex-1 border border-gray-400 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4b2e17]"
                                    value={form.data.name}
                                    onChange={(e) => form.setData("name", e.target.value)}
                                />
                                <label className="text-sm bg-gray-200 px-3 py-2 border border-gray-400 rounded cursor-pointer hover:bg-gray-300 transition">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => form.setData("file", e.target.files[0])}
                                        className="hidden"
                                    />
                                    <span role="img" aria-label="camera">📷</span> Change Image
                                </label>
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="font-semibold text-sm text-gray-800">
                                Add Category
                            </label>
                            <select
                                name="category"
                                className="mt-1 w-full border border-gray-400 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4b2e17]"
                                value={form.data.category}
                                onChange={(e) => form.setData("category", e.target.value)}
                            >
                                <option value="">Select category</option>
                                <option value="chocolate">Chocolate</option>
                                <option value="drinks">Drinks</option>
                                <option value="snacks">Snacks</option>
                            </select>
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="font-semibold text-sm text-gray-800">
                                Indicate Quantity Available
                            </label>
                            <div className="flex items-center gap-2 mt-1">
                                <button
                                    type="button"
                                    onClick={() =>
                                        form.setData("quantity", Math.max(0, form.data.quantity - 1))
                                    }
                                    className="border border-gray-400 px-3 py-1 rounded hover:bg-gray-200"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={form.data.quantity} 
                                    onChange={(e) => form.setData("quantity", Number(e.target.value))}
                                    className="w-full border border-gray-400 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4b2e17]"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        form.setData("quantity", parseInt(form.data.quantity || 0) + 1)
                                    }
                                    className="border border-gray-400 px-3 py-1 rounded hover:bg-gray-200"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="font-semibold text-sm text-gray-800">
                                Indicate Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                className="mt-1 w-full border border-gray-400 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4b2e17]"
                                value={form.data.price}
                                onChange={(e) => form.setData("price", Number(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* 🟤 Buttons */}
                    <div className="flex justify-end items-center gap-4 px-6 py-4 border-t border-gray-300">
                        <button
                            type="button"
                            onClick={() => navigate('/inventory1')}
                            className="text-sm font-semibold text-black hover:underline"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="bg-[#4b2e17] text-white px-5 py-2 rounded-sm font-semibold hover:bg-[#3a2211] transition"
                        >
                            Edit Product
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
