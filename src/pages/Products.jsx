import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import productsData from '../assets/productData.json';
import { Link } from 'react-router-dom';

const CATEGORIES = ["Electronics", "Sports", "Office", "Fashion", "Kitchen"];

const categoryColors = {
    Electronics: "bg-blue-100 text-blue-600",
    Sports: "bg-green-100 text-green-600",
    Office: "bg-purple-100 text-purple-600",
    Fashion: "bg-pink-100 text-pink-600",
    Kitchen: "bg-orange-100 text-orange-600",
};

const stockColor = (stock) => {
    if (stock <= 20) return "text-red-500";
    if (stock <= 50) return "text-kuning";
    return "text-hijau";
};

const formatPrice = (price) =>
    "Rp " + price.toLocaleString("id-ID");

export default function Products() {
    const [showForm, setShowForm] = useState(false);
    const [filterCategory, setFilterCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [form, setForm] = useState({
        id: "", title: "", code: "", category: "Electronics",
        brand: "", price: "", stock: "",
    });

    const filtered = productsData.filter((p) => {
        const matchCat = filterCategory === "All" || p.category === filterCategory;
        const q = searchQuery.toLowerCase();
        const matchSearch =
            p.title.toLowerCase().includes(q) ||
            p.code.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q);
        return matchCat && matchSearch;
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-5">
            <PageHeader
                title="Product List"
                breadcrumb={["Home", "Inventory", "Products"]}
            >
                <button
                    className="bg-hijau text-white px-4 py-2 rounded-md font-bold hover:bg-green-600 transition"
                    onClick={() => setShowForm(true)}
                >
                    + Add Product
                </button>
            </PageHeader>

            {/* Filter & Search Bar */}
            <div className="flex flex-wrap gap-3 mb-4 items-center">
                <input
                    type="text"
                    placeholder="Search by name, code, or brand..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border px-3 py-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-hijau w-64"
                />

                <div className="flex gap-2 flex-wrap">
                    {["All", ...CATEGORIES].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-3 py-1.5 rounded-full text-sm font-semibold transition ${filterCategory === cat
                                    ? "bg-hijau text-white"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <span className="ml-auto text-sm text-gray-400">
                    {filtered.length} product{filtered.length !== 1 ? "s" : ""}
                </span>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b text-gray-400 text-sm uppercase">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Product Name</th>
                            <th className="p-4">Code</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Brand</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length > 0 ? (
                            filtered.map((prod) => (
                                <tr key={prod.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-bold text-biru">{prod.id}</td>
                                    <td className="p-4 font-medium">
                                        <Link to={`/products/${prod.id}`} className="text-emerald-400 hover:text-emerald-500">
                                            {prod.title}
                                        </Link>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500 font-mono">{prod.code}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${categoryColors[prod.category] || "bg-gray-100 text-gray-600"}`}>
                                            {prod.category}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-700">{prod.brand}</td>
                                    <td className="p-4 font-semibold text-gray-800">{formatPrice(prod.price)}</td>
                                    <td className={`p-4 font-bold ${stockColor(prod.stock)}`}>{prod.stock}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-400">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">Add New Product</h2>
                            <button
                                onClick={() => setShowForm(false)}
                                className="text-gray-400 hover:text-black text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Product ID</label>
                                    <input
                                        name="id"
                                        type="text"
                                        placeholder="e.g. PRD-031"
                                        value={form.id}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Product Code</label>
                                    <input
                                        name="code"
                                        type="text"
                                        placeholder="e.g. ELC-ABC-031"
                                        value={form.code}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1">Product Title</label>
                                <input
                                    name="title"
                                    type="text"
                                    placeholder="Enter product name"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Category</label>
                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none text-sm"
                                    >
                                        {CATEGORIES.map((cat) => (
                                            <option key={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Brand</label>
                                    <input
                                        name="brand"
                                        type="text"
                                        placeholder="e.g. Samsung"
                                        value={form.brand}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Price (Rp)</label>
                                    <input
                                        name="price"
                                        type="number"
                                        placeholder="e.g. 250000"
                                        value={form.price}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Stock</label>
                                    <input
                                        name="stock"
                                        type="number"
                                        placeholder="e.g. 50"
                                        value={form.stock}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none text-sm"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 bg-gray-100 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="flex-1 bg-hijau text-white py-2 rounded-md font-semibold hover:bg-green-600 transition"
                                >
                                    Save Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}