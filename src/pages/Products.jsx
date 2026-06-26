import { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import { supabase } from '../lib/supabaseClient'

const formatRupiah = (n) => 'Rp ' + Number(n).toLocaleString('id-ID')

const stockColor = (stock) => {
    if (stock <= 10) return 'text-red-500'
    if (stock <= 30) return 'text-kuning'
    return 'text-hijau'
}

const EMPTY_FORM = { nama_produk: '', harga: '', stok: '', deskripsi: '' }

export default function Products() {
    const [products, setProducts] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editTarget, setEditTarget] = useState(null) // null = add mode, object = edit mode
    const [form, setForm] = useState(EMPTY_FORM)
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)

    // Fetch produk dari Supabase
    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('produk')
            .select('*')
            .order('created_at', { ascending: false })
        if (!error) setProducts(data)
    }

    useEffect(() => { fetchProducts() }, [])

    const filtered = products.filter(p =>
        p.nama_produk.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const openAdd = () => {
        setEditTarget(null)
        setForm(EMPTY_FORM)
        setShowForm(true)
    }

    const openEdit = (prod) => {
        setEditTarget(prod)
        setForm({ nama_produk: prod.nama_produk, harga: prod.harga, stok: prod.stok, deskripsi: prod.deskripsi || '' })
        setShowForm(true)
    }

    const handleSave = async () => {
        setLoading(true)
        const payload = {
            nama_produk: form.nama_produk,
            harga: Number(form.harga),
            stok: Number(form.stok),
            deskripsi: form.deskripsi,
        }

        if (editTarget) {
            await supabase.from('produk').update(payload).eq('id', editTarget.id)
        } else {
            await supabase.from('produk').insert(payload)
        }

        await fetchProducts()
        setShowForm(false)
        setLoading(false)
    }

    const handleDelete = async (id) => {
        if (!confirm('Hapus produk ini?')) return
        await supabase.from('produk').delete().eq('id', id)
        await fetchProducts()
    }

    return (
        <div className="p-5">
            <PageHeader title="Product List" breadcrumb={['Home', 'Inventory', 'Products']}>
                <button
                    className="bg-hijau text-white px-4 py-2 rounded-md font-bold hover:bg-green-600 transition"
                    onClick={openAdd}
                >
                    + Add Product
                </button>
            </PageHeader>

            {/* Search */}
            <div className="flex items-center gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border px-3 py-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-hijau w-64"
                />
                <span className="ml-auto text-sm text-gray-400">
                    {filtered.length} produk
                </span>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b text-gray-400 text-sm uppercase">
                        <tr>
                            <th className="p-4">Nama Produk</th>
                            <th className="p-4">Harga</th>
                            <th className="p-4">Stok</th>
                            <th className="p-4">Deskripsi</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length > 0 ? filtered.map((prod) => (
                            <tr key={prod.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-medium">{prod.nama_produk}</td>
                                <td className="p-4 font-semibold text-gray-800">{formatRupiah(prod.harga)}</td>
                                <td className={`p-4 font-bold ${stockColor(prod.stok)}`}>{prod.stok}</td>
                                <td className="p-4 text-sm text-gray-500">{prod.deskripsi || '-'}</td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEdit(prod)}
                                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-xs font-bold hover:bg-blue-200 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(prod.id)}
                                            className="px-3 py-1 bg-red-100 text-red-500 rounded-md text-xs font-bold hover:bg-red-200 transition"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-400">
                                    Belum ada produk. Klik "+ Add Product" untuk menambahkan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Add / Edit */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">{editTarget ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-black text-2xl">&times;</button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Nama Produk</label>
                                <input
                                    name="nama_produk"
                                    type="text"
                                    placeholder="e.g. Nasi Goreng Spesial"
                                    value={form.nama_produk}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Harga (Rp)</label>
                                    <input
                                        name="harga"
                                        type="number"
                                        placeholder="e.g. 25000"
                                        value={form.harga}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Stok</label>
                                    <input
                                        name="stok"
                                        type="number"
                                        placeholder="e.g. 50"
                                        value={form.stok}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1">Deskripsi</label>
                                <textarea
                                    name="deskripsi"
                                    rows={3}
                                    placeholder="Deskripsi singkat produk..."
                                    value={form.deskripsi}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-hijau outline-none text-sm resize-none"
                                />
                            </div>

                            <div className="pt-2 flex space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 bg-gray-100 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex-1 bg-hijau text-white py-2 rounded-md font-semibold hover:bg-green-600 transition disabled:opacity-60"
                                >
                                    {loading ? 'Menyimpan...' : 'Save Product'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}