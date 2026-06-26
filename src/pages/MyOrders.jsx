import { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import { supabase } from '../lib/supabaseClient'

const formatRupiah = (n) => 'Rp ' + Number(n).toLocaleString('id-ID')

const STATUS_BADGE = {
    pending: 'bg-yellow-100 text-yellow-700',
    lunas: 'bg-green-100 text-green-700',
    dibatalkan: 'bg-red-100 text-red-600',
}

export default function MyOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchMyOrders() {
            // RLS otomatis filter ke pesanan milik member yang login
            const { data, error } = await supabase
                .from('pesanan')
                .select('*')
                .order('created_at', { ascending: false })
            if (!error) setOrders(data)
            setLoading(false)
        }
        fetchMyOrders()
    }, [])

    const total = orders.reduce((sum, o) => sum + Number(o.total_harga), 0)
    const totalPoin = orders.reduce((sum, o) => sum + (o.poin_diperoleh || 0), 0)

    return (
        <div className="p-5">
            <PageHeader title="Pesanan Saya" breadcrumb={['Home', 'Pesanan Saya']} />

            {/* Summary bar */}
            <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="bg-white rounded-xl shadow p-4 text-center">
                    <p className="text-2xl font-black text-gray-800">{orders.length}</p>
                    <p className="text-gray-400 text-sm">Total Pesanan</p>
                </div>
                <div className="bg-white rounded-xl shadow p-4 text-center">
                    <p className="text-xl font-black text-green-600">{formatRupiah(total)}</p>
                    <p className="text-gray-400 text-sm">Total Belanja</p>
                </div>
                <div className="bg-white rounded-xl shadow p-4 text-center">
                    <p className="text-2xl font-black text-indigo-600">{totalPoin}</p>
                    <p className="text-gray-400 text-sm">Total Poin Diperoleh</p>
                </div>
            </div>

            {/* Order List */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b text-gray-400 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Tanggal</th>
                            <th className="p-4">Total Harga</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Poin Diperoleh</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-400">Memuat data...</td>
                            </tr>
                        ) : orders.length > 0 ? orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition">
                                <td className="p-4 text-sm text-gray-600">
                                    {new Date(order.tanggal_pesanan).toLocaleDateString('id-ID', {
                                        day: 'numeric', month: 'long', year: 'numeric'
                                    })}
                                </td>
                                <td className="p-4 font-semibold">{formatRupiah(order.total_harga)}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${STATUS_BADGE[order.status]}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4 font-bold text-indigo-600">
                                    {order.poin_diperoleh > 0 ? `+${order.poin_diperoleh} pts` : '—'}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-400">
                                    Belum ada pesanan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
