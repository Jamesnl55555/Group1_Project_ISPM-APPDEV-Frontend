import React, { useState, useEffect } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "@/api/axios";
import useForm from "@/hooks/useForm";

export default function AddItem() {
    const [products, setProducts] = useState([]);
    const form = useForm({ cart: [] });
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const resp = await axios.get('/api/fetchproducts');
                setProducts(resp.data.products || []);
            } catch (err) {
                console.error('Failed to fetch products for AddItem:', err);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        const quantity = quantities[product.id] || 1;
        const existingItem = form.data.cart.find(item => item.id === product.id);
        if (!product || !product.id) {
            alert('!product || !product.id');
        }
        if (existingItem) {
            form.setData('cart', form.data.cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            ));
        } else {
            form.setData('cart', [...form.data.cart, {...product, quantity}]);
        }
    }
    const removeFromCart = (index) => {
        const newCart = [...form.data.cart];
        newCart.splice(index, 1);
        form.setData('cart', newCart);
    }
    const clearCart= () =>{
        form.setData('cart', []);
    }
    const submitProducts = (e) => {
        e.preventDefault();
        if (form.data.cart.length === 0) {
            alert("Cart is empty!");
            return;
        }
        

        const payload = {
            cart: form.data.cart.map(i => ({
                id: i.id,
                name: i.name,
                quantity: i.quantity,
                price: i.price,
            })),
        };

        form.post('/api/checkout', {
            data: payload,
            onSuccess: () => clearCart(),
            onError: (errors) => console.error("Checkout failed:", errors),
        });
    };

    const handleQuantityChange = (productId, value) => {
        
        const qty = Math.max(1, Number(value));
        setQuantities({...quantities, [productId]: qty});
        form.setData('cart', form.data.cart.map(item =>
        item.id === productId ? {...item, quantity: qty} : item
    ));
    };

    return (
        <AuthenticatedLayout>

            <div className="py-12 px-6 flex flex-col items-center">
                {/* 🟤 Title */}
                <h1 className="text-3xl font-bold text-black mb-6 text-center">
                    Record Transaction Form
                </h1>

                <div className="flex gap-4">
                    {/* Left: Product List */}
                    <div className="w-[40rem] bg-[#f9f9f9] border border-black p-6 shadow-[5px_5px_0px_rgba(0,0,0,0.3)]">
                        <div className="flex justify-between mb-3">
                            <input
                                type="text"
                                placeholder="Search for Product..."
                                className="border border-gray-400 px-3 py-1 w-1/2"
                            />
                            <p className="text-sm font-semibold text-black">
                                Transaction #: 00000000
                            </p>
                        </div>

                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-black border-b border-gray-400">
                                    <th className="py-2 text-left w-1/4">Item</th>
                                    <th className="py-2 text-left w-1/4">Price</th>
                                    <th className="py-2 text-center w-1/4">Stock</th>
                                    <th className="py-2 text-center w-1/4">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b border-gray-300">
                                        <td className="py-2 flex items-center gap-2">
                                            <button
                                                onClick={() => addToCart(product)}
                                                disabled={product.quantity === 0}
                                                className={`text-[#4b2e17] text-lg font-bold rounded-full w-7 h-7 flex items-center justify-center border border-[#4b2e17] shadow-md transition ${
                                                    product.quantity === 0
                                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                        : "bg-[#e6d6c3] hover:bg-[#d4c0aa]"
                                                }`}
                                            >
                                                +
                                            </button>
                                            <span>{product.name}</span>
                                        </td>

                                        <td className="py-2">₱{product.price}</td>

                                        <td className="py-2 text-center">
                                            {product.quantity > 0 ? (
                                                <span className="text-green-700 font-semibold">
                                                    {product.quantity}
                                                </span>
                                            ) : (
                                                <span className="text-red-500 text-sm">
                                                    Out of Stock
                                                </span>
                                            )}
                                        </td>

                                        <td className="py-2 text-center">
                                            <input type="number" min="1" value={quantities[product.id] || 1} onChange={(e) => handleQuantityChange(product.id, e.target.value)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 🛒 Right: Cart */}
                    <div className="w-64 bg-[#f4e8da] border border-black p-4 shadow-[5px_5px_0px_rgba(0,0,0,0.3)] flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                                🛒 Cart
                            </h2>

                            {form.data.cart.length === 0 ? (
                                <p className="text-gray-600 text-sm">No items added yet.</p>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {form.data.cart.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-white border border-gray-300 rounded-md p-3 shadow-sm flex justify-between items-start"
                                        >
                                            <div className="text-sm">
                                                <p className="font-bold text-black">{item.name}</p>
                                                <p>Quantity: {item.quantity}</p>
                                                <p>Total: ₱{item.price * item.quantity}</p>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(index)}
                                                className="text-red-500 hover:text-red-700 transition"
                                                title="Remove item"
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={submitProducts}
                            disabled={form.data.cart.length === 0}
                            className={`bg-[#4b2e17] text-white py-2 rounded-md mt-4 transition ${
                                form.data.cart.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#3b2412]"
                            }`}
                            href="/transaction-record" // ✅ Added href
                        >
                            Confirm
                        </button>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
