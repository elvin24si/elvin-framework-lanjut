import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import ordersData from '../assets/OrdersData.json';

export default function Orders() {
    const [showForm, setShowForm] = useState(false);

    // Fungsi untuk menentukan warna teks berdasarkan status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'text-hijau';
            case 'Pending': return 'text-kuning';
            case 'Cancelled': return 'text-merah';
            default: return 'text-gray-500';
        }
    };

    return (
        <div className="p-5">
            <PageHeader 
                title="Order History" 
                breadcrumb={["Home", "Sales", "Orders"]}
            >
                {/* Tombol Add Orders yang memicu Modal */}
                <button 
                    className="bg-hijau text-white px-4 py-2 rounded-md font-bold hover:opacity-90 transition shadow-md"
                    onClick={() => setShowForm(true)}
                >
                    + Add Orders
                </button>
            </PageHeader>

            {/* Tabel Data Orders */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b text-gray-400 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Total Price</th>
                            <th className="p-4">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {ordersData.map((order) => (
                            <tr key={order.orderId} className="hover:bg-gray-50 transition">
                                <td className="p-4 font-bold text-biru">{order.orderId}</td>
                                <td className="p-4 font-medium">{order.customerName}</td>
                                <td className={`p-4 font-bold ${getStatusColor(order.status)}`}>
                                    • {order.status}
                                </td>
                                <td className="p-4 font-semibold">{order.totalPrice}</td>
                                <td className="p-4 text-gray-500">{order.orderDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL FORM ADD ORDER */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
                        {/* Header Modal */}
                        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold text-gray-800">Create New Order</h2>
                            <button 
                                onClick={() => setShowForm(false)} 
                                className="text-gray-400 hover:text-merah transition text-2xl font-bold"
                            >
                                &times;
                            </button>
                        </div>
                        
                        {/* Body Form */}
                        <form className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Order ID</label>
                                <input type="text" placeholder="ORD-XXXX" className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-hijau focus:border-transparent outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Customer Name</label>
                                <input type="text" placeholder="Enter customer name" className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-1">Status</label>
                                    <select className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none">
                                        <option>Pending</option>
                                        <option>Completed</option>
                                        <option>Cancelled</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-1">Order Date</label>
                                    <input type="date" className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Total Price (Rp)</label>
                                <input type="text" placeholder="e.g. 50.000" className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none" />
                            </div>
                            
                            {/* Footer Buttons */}
                            <div className="pt-6 flex space-x-3">
                                <button 
                                    type="button" 
                                    onClick={() => setShowForm(false)} 
                                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md font-bold hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="button" 
                                    className="flex-1 bg-hijau text-white py-2 rounded-md font-bold hover:shadow-lg transition"
                                >
                                    Submit Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}