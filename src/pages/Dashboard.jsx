import { useEffect, useState } from 'react'
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'
import { supabase } from '../lib/supabaseClient'

const formatRupiah = (n) => 'Rp ' + Number(n || 0).toLocaleString('id-ID')

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalLunas: 0,
        totalDibatalkan: 0,
        totalRevenue: 0,
    })

    useEffect(() => {
        async function fetchStats() {
            const [{ count: totalOrders }, { count: totalLunas }, { count: totalDibatalkan }, { data: revenueData }] =
                await Promise.all([
                    supabase.from('pesanan').select('*', { count: 'exact', head: true }),
                    supabase.from('pesanan').select('*', { count: 'exact', head: true }).eq('status', 'lunas'),
                    supabase.from('pesanan').select('*', { count: 'exact', head: true }).eq('status', 'dibatalkan'),
                    supabase.from('pesanan').select('total_harga').eq('status', 'lunas'),
                ])

            const totalRevenue = revenueData?.reduce((sum, o) => sum + Number(o.total_harga), 0) ?? 0

            setStats({ totalOrders, totalLunas, totalDibatalkan, totalRevenue })
        }

        fetchStats()
    }, [])

    const cards = [
        { id: 'dashboard-orders', icon: <FaShoppingCart />, bg: 'bg-hijau', value: stats.totalOrders, label: 'Total Orders' },
        { id: 'dashboard-delivered', icon: <FaTruck />, bg: 'bg-biru', value: stats.totalLunas, label: 'Total Lunas' },
        { id: 'dashboard-canceled', icon: <FaBan />, bg: 'bg-merah', value: stats.totalDibatalkan, label: 'Total Dibatalkan' },
        { id: 'dashboard-revenue', icon: <FaDollarSign />, bg: 'bg-kuning', value: formatRupiah(stats.totalRevenue), label: 'Total Revenue' },
    ]

    return (
        <div id="dashboard-container">
            <PageHeader />
            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {cards.map((card) => (
                    <div key={card.id} id={card.id} className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                        <div className={`${card.bg} rounded-full p-4`}>
                            {card.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">{card.value}</span>
                            <span className="text-gray-400">{card.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
