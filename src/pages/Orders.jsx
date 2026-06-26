import { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import { supabase } from '../lib/supabaseClient'

const formatRupiah = (n) => 'Rp ' + Number(n).toLocaleString('id-ID')

const STATUS_COLOR = {
    pending: 'text-kuning bg-yellow-50',
    lunas: 'text-hijau bg-green-50',
    dibatalkan: 'text-merah bg-red-50',
}

const STATUS_LABEL = {
    pending: '• Pending',
    lunas: '• Lunas',
    dibatalkan: '• Dibatalkan',
}

export default function Orders() {
    const [orders, setOrders] = useState([])
    const [customers, setCustomers] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ customer_id: '', total_harga: '', status: 'pending' })

    const fetchOrders = async () => {
        const { data, error } = await supabase
            .from('pesanan')
            .select('*, customer(nama)')
            .order('created_at', { ascending: false })
        if (!error) setOrders(data)
    }

    const fetchCustomers = async () => {
        const { data } = await supabase.from('customer').select('id, nama').order('nama')
        if (data) setCustomers(data)
    }

    useEffect(() => {
        fetchOrders()
        fetchCustomers()
    }, [])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleCreate = async () => {
        if (!form.customer_id || !form.total_harga) {
            alert('Pilih customer dan isi total harga.')
            return
        }
        setLoading(true)
        await supabase.from('pesanan').insert({
            customer_id: form.customer_id,
            total_harga: Number(form.total_harga),
            status: form.status,
        })
        await fetchOrders()
        setShowForm(false)
        setForm({ customer_id: '', total_harga: '', status: 'pending' })
        setLoading(false)
    }

    // Update status pesanan (admin action — trigger points otomatis di DB)
    const handleStatusChange = async (id, newStatus) => {
        await supabase.from('pesanan').update({ status: newStatus }).eq('id', id)
        await fetchOrders()
    }

    return (
        <div className="p-5">
            <PageHeader title="Order History" breadcrumb={['Home', 'Sales', 'Orders']}>
                <button
                    className="bg-hijau text-white px-4 py-2 rounded-md font-bold hover:opacity-90 transition shadow-md"
                    onClick={() => setShowForm(true)}
                >
                    + Add Orders
                </button>
            </PageHeader>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b text-gray-400 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Total Harga</th>
                            <th className="p-4">Poin</th>
                            <th className="p-4">Tanggal</th>
                            <th className="p-4">Ubah Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.length > 0 ? orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition">
                                <td className="p-4 font-medium">{order.customer?.nama || '-'}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${STATUS_COLOR[order.status]}`}>
                                        {STATUS_LABEL[order.status]}
                                    </span>
                                </td>
                                <td className="p-4 font-semibold">{formatRupiah(order.total_harga)}</td>
                                <td className="p-4 font-bold text-indigo-600">{order.poin_diperoleh} pts</td>
                                <td className="p-4 text-gray-500 text-sm">
                                    {new Date(order.tanggal_pesanan).toLocaleDateString('id-ID')}
                                </td>
                                <td className="p-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="border border-gray-200 rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-hijau"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="lunas">Lunas</option>
                                        <option value="dibatalkan">Dibatalkan</option>
                                    </select>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-400">Belum ada pesanan.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Create Order */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold text-gray-800">Create New Order</h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-merah transition text-2xl font-bold">&times;</button>
                        </div>

                        <form className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Customer</label>
                                <select
                                    name="customer_id"
                                    value={form.customer_id}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none"
                                >
                                    <option value="">-- Pilih Customer --</option>
                                    {customers.map((c) => (
                                        <option key={c.id} value={c.id}>{c.nama}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Total Harga (Rp)</label>
                                <input
                                    name="total_harga"
                                    type="number"
                                    placeholder="e.g. 150000"
                                    value={form.total_harga}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Status Awal</label>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="lunas">Lunas</option>
                                    <option value="dibatalkan">Dibatalkan</option>
                                </select>
                            </div>

                            <div className="pt-4 flex space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md font-bold hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCreate}
                                    disabled={loading}
                                    className="flex-1 bg-hijau text-white py-2 rounded-md font-bold hover:shadow-lg transition disabled:opacity-60"
                                >
                                    {loading ? 'Menyimpan...' : 'Submit Order'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}