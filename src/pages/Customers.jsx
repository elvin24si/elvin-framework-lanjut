import { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import { supabase } from '../lib/supabaseClient'

const TIER_BADGE = {
    gold: 'bg-yellow-100 text-yellow-700',
    silver: 'bg-slate-100 text-slate-600',
    bronze: 'bg-orange-100 text-orange-700',
}

const EMPTY_FORM = { nama: '', email: '', telepon: '', alamat: '' }

export default function Customers() {
    const [customers, setCustomers] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editTarget, setEditTarget] = useState(null)
    const [form, setForm] = useState(EMPTY_FORM)
    const [loading, setLoading] = useState(false)

    const fetchCustomers = async () => {
        // Join ke profiles untuk mendapatkan tier (jika customer punya user_id)
        const { data, error } = await supabase
            .from('customer')
            .select('*, profiles(tier, points)')
            .order('created_at', { ascending: false })
        
        if (error) {
            console.error('Error fetching customers:', error)
        } else {
            setCustomers(data)
        }
    }

    useEffect(() => { fetchCustomers() }, [])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const openAdd = () => {
        setEditTarget(null)
        setForm(EMPTY_FORM)
        setShowForm(true)
    }

    const openEdit = (cust) => {
        setEditTarget(cust)
        setForm({ nama: cust.nama, email: cust.email || '', telepon: cust.telepon || '', alamat: cust.alamat || '' })
        setShowForm(true)
    }

    const handleSave = async () => {
        setLoading(true)
        const payload = { nama: form.nama, email: form.email, telepon: form.telepon, alamat: form.alamat }

        if (editTarget) {
            await supabase.from('customer').update(payload).eq('id', editTarget.id)
        } else {
            // user_id NULL untuk customer manual oleh admin
            await supabase.from('customer').insert({ ...payload, user_id: null })
        }

        await fetchCustomers()
        setShowForm(false)
        setLoading(false)
    }

    const handleDelete = async (id) => {
        if (!confirm('Hapus customer ini? Semua pesanannya tidak bisa dihapus.')) return
        const { error } = await supabase.from('customer').delete().eq('id', id)
        if (error) alert('Gagal hapus: ' + error.message)
        else await fetchCustomers()
    }

    return (
        <div className="p-5">
            <PageHeader title="Customer List" breadcrumb={['Home', 'Users', 'Customers']}>
                <button
                    className="bg-hijau text-white px-4 py-2 rounded-md font-bold hover:bg-green-600 transition"
                    onClick={openAdd}
                >
                    + Add Customer
                </button>
            </PageHeader>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b text-gray-400 text-sm uppercase">
                        <tr>
                            <th className="p-4">Nama</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Telepon</th>
                            <th className="p-4">Alamat</th>
                            <th className="p-4">Tier</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length > 0 ? customers.map((cust) => {
                            const tier = cust.profiles?.tier || null
                            return (
                                <tr key={cust.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium">{cust.nama}</td>
                                    <td className="p-4 text-gray-600">{cust.email || '-'}</td>
                                    <td className="p-4 text-gray-600">{cust.telepon || '-'}</td>
                                    <td className="p-4 text-gray-600 max-w-xs truncate">{cust.alamat || '-'}</td>
                                    <td className="p-4">
                                        {tier ? (
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${TIER_BADGE[tier]}`}>
                                                {tier}
                                            </span>
                                        ) : (
                                            <span className="text-gray-300 text-xs">—</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEdit(cust)}
                                                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-xs font-bold hover:bg-blue-200 transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cust.id)}
                                                className="px-3 py-1 bg-red-100 text-red-500 rounded-md text-xs font-bold hover:bg-red-200 transition"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }) : (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-400">
                                    Belum ada customer.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Add / Edit */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">{editTarget ? 'Edit Customer' : 'Add New Customer'}</h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-black text-2xl">&times;</button>
                        </div>

                        <form className="p-6 space-y-4">
                            {[
                                { label: 'Nama Lengkap', name: 'nama', type: 'text', placeholder: 'John Doe' },
                                { label: 'Email', name: 'email', type: 'email', placeholder: 'john@example.com' },
                                { label: 'Telepon', name: 'telepon', type: 'text', placeholder: '0812xxxx' },
                                { label: 'Alamat', name: 'alamat', type: 'text', placeholder: 'Jl. Contoh No. 1' },
                            ].map(({ label, name, type, placeholder }) => (
                                <div key={name}>
                                    <label className="block text-sm font-semibold mb-1">{label}</label>
                                    <input
                                        name={name}
                                        type={type}
                                        placeholder={placeholder}
                                        value={form[name]}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none"
                                    />
                                </div>
                            ))}

                            <div className="pt-4 flex space-x-3">
                                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 py-2 rounded-md font-semibold">Cancel</button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex-1 bg-hijau text-white py-2 rounded-md font-semibold disabled:opacity-60"
                                >
                                    {loading ? 'Menyimpan...' : 'Save Data'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}