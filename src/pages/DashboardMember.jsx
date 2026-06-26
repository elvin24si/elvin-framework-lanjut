import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthContext'

const TIER_CONFIG = {
    bronze: { color: 'from-orange-400 to-amber-500', label: '🥉 Bronze', next: 'Silver', max: 1000 },
    silver: { color: 'from-slate-400 to-slate-500', label: '🥈 Silver', next: 'Gold', max: 5000 },
    gold: { color: 'from-yellow-400 to-yellow-500', label: '🥇 Gold', next: null, max: 5000 },
}

const formatRupiah = (n) => 'Rp ' + Number(n).toLocaleString('id-ID')

export default function DashboardMember() {
    const { profile, refreshProfile } = useAuth()
    const [recentOrders, setRecentOrders] = useState([])

    useEffect(() => {
        refreshProfile()
        fetchRecentOrders()
    }, [])

    const fetchRecentOrders = async () => {
        const { data } = await supabase
            .from('pesanan')
            .select('*, customer(nama)')
            .order('created_at', { ascending: false })
            .limit(5)
        if (data) setRecentOrders(data)
    }

    const tier = profile?.tier || 'bronze'
    const points = profile?.points || 0
    const config = TIER_CONFIG[tier]
    const progressTo = tier === 'bronze' ? 1000 : tier === 'silver' ? 5000 : 5000
    const progressFrom = tier === 'bronze' ? 0 : tier === 'silver' ? 1000 : 0
    const progressPct = tier === 'gold'
        ? 100
        : Math.min(100, Math.round(((points - progressFrom) / (progressTo - progressFrom)) * 100))

    const STATUS_BADGE = {
        pending: 'bg-yellow-100 text-yellow-700',
        lunas: 'bg-green-100 text-green-700',
        dibatalkan: 'bg-red-100 text-red-600',
    }

    return (
        <div className="p-5">
            <PageHeader title="Dashboard Member" breadcrumb={['Home', 'Dashboard']} />

            {/* Hero Card - Poin & Tier */}
            <div className={`bg-gradient-to-r ${config.color} rounded-2xl p-6 text-white shadow-lg mb-6`}>
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-white/70 text-sm uppercase tracking-widest mb-1">Tier Kamu</p>
                        <h2 className="text-4xl font-black tracking-tight">{config.label}</h2>
                        <p className="text-white/80 mt-1 text-sm">Selamat datang, <b>{profile?.full_name}</b>!</p>
                    </div>
                    <div className="text-right">
                        <p className="text-white/70 text-sm uppercase tracking-widest mb-1">Total Poin</p>
                        <p className="text-4xl font-black">{points.toLocaleString('id-ID')}</p>
                        <p className="text-white/70 text-xs mt-1">poin reward</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-5">
                    <div className="flex justify-between text-xs text-white/70 mb-1">
                        <span>{tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
                        {config.next ? <span>{config.next} ({progressTo.toLocaleString()} pts)</span> : <span>Tier Maksimal 🎉</span>}
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-3">
                        <div
                            className="bg-white rounded-full h-3 transition-all duration-700"
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>
                    <p className="text-xs text-white/70 mt-1">
                        {tier !== 'gold'
                            ? `${progressPct}% menuju ${config.next}`
                            : 'Anda sudah di tier tertinggi!'}
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow p-4 text-center">
                    <p className="text-3xl font-black text-indigo-600">{points}</p>
                    <p className="text-gray-400 text-sm mt-1">Total Poin</p>
                </div>
                <div className="bg-white rounded-xl shadow p-4 text-center">
                    <p className="text-3xl font-black text-green-600">{recentOrders.filter(o => o.status === 'lunas').length}</p>
                    <p className="text-gray-400 text-sm mt-1">Pesanan Lunas</p>
                </div>
                <div className="bg-white rounded-xl shadow p-4 text-center">
                    <p className="text-3xl font-black text-orange-500 capitalize">{tier}</p>
                    <p className="text-gray-400 text-sm mt-1">Tier Aktif</p>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow p-5">
                <h3 className="font-bold text-gray-800 mb-4">Pesanan Terbaru</h3>
                {recentOrders.length > 0 ? (
                    <div className="space-y-3">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-semibold text-sm text-gray-800">
                                        {new Date(order.tanggal_pesanan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                    <p className="text-gray-500 text-xs">{formatRupiah(order.total_harga)}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {order.poin_diperoleh > 0 && (
                                        <span className="text-xs font-bold text-indigo-600">+{order.poin_diperoleh} pts</span>
                                    )}
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${STATUS_BADGE[order.status]}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-sm text-center py-6">Belum ada pesanan.</p>
                )}
            </div>
        </div>
    )
}
