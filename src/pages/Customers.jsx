import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import customersData from '../assets/CustomerData.json';

export default function Customers() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="p-5">
            <PageHeader 
                title="Customer List" 
                breadcrumb={["Home", "Users", "Customers"]}
            >
                {/* Tombol yang memicu munculnya form */}
                <button 
                    className="bg-hijau text-white px-4 py-2 rounded-md font-bold hover:bg-green-600 transition"
                    onClick={() => setShowForm(true)}
                >
                    + Add Customer
                </button>
            </PageHeader>

            {/* Tabel Data Customer */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b text-gray-400 text-sm uppercase">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Loyalty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customersData.map((cust) => (
                            <tr key={cust.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-bold text-biru">{cust.id}</td>
                                <td className="p-4">{cust.name}</td>
                                <td className="p-4">{cust.email}</td>
                                <td className="p-4">{cust.phone}</td>
                                <td className="p-4 font-semibold text-kuning">{cust.loyalty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL FORM (Hanya tampil jika showForm === true) */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">Add New Customer</h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-black text-2xl">&times;</button>
                        </div>
                        
                        <form className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Customer ID</label>
                                <input type="text" placeholder="e.g. CUST-031" className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Full Name</label>
                                <input type="text" placeholder="Enter name" className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Email</label>
                                <input type="email" placeholder="example@mail.com" className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Phone</label>
                                <input type="text" placeholder="0812..." className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Loyalty Level</label>
                                <select className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none">
                                    <option>Bronze</option>
                                    <option>Silver</option>
                                    <option>Gold</option>
                                </select>
                            </div>
                            
                            <div className="pt-4 flex space-x-3">
                                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 py-2 rounded-md font-semibold">Cancel</button>
                                <button type="button" className="flex-1 bg-hijau text-white py-2 rounded-md font-semibold">Save Data</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}