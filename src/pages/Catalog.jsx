import { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthContext'
import { FaShoppingCart, FaPlus, FaMinus, FaTrash } from 'react-icons/fa'

const formatRupiah = (n) => 'Rp ' + Number(n).toLocaleString('id-ID')

export default function Catalog() {
    const { user } = useAuth()
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null) // { type: 'success' | 'error', text: '' }

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('produk')
            .select('*')
            .order('nama_produk')
        if (!error) setProducts(data)
    }

    const addToCart = (product) => {
        const existing = cart.find((item) => item.id === product.id)
        if (existing) {
            if (existing.quantity >= product.stok) {
                alert('Stok produk tidak mencukupi!')
                return
            }
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            )
        } else {
            if (product.stok < 1) {
                alert('Stok habis!')
                return
            }
            setCart([...cart, { ...product, quantity: 1 }])
        }
        setIsCartOpen(true)
    }

    const updateQuantity = (productId, delta) => {
        const item = cart.find((item) => item.id === productId)
        const product = products.find((p) => p.id === productId)
        if (!item || !product) return

        const newQty = item.quantity + delta
        if (newQty <= 0) {
            setCart(cart.filter((i) => i.id !== productId))
        } else if (newQty > product.stok) {
            alert('Stok produk tidak mencukupi!')
        } else {
            setCart(
                cart.map((i) =>
                    i.id === productId ? { ...i, quantity: newQty } : i
                )
            )
        }
    }

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId))
    }

    const checkout = async () => {
        if (cart.length === 0) return
        setLoading(true)
        setMessage(null)

        try {
            // 1. Ambil customer_id milik member ini
            const { data: customer, error: custError } = await supabase
                .from('customer')
                .select('*')
                .eq('user_id', user.id)
                .single()

            if (custError || !customer) {
                throw new Error('Data customer tidak ditemukan. Hubungi admin.')
            }

            const totalHarga = cart.reduce((sum, item) => sum + item.harga * item.quantity, 0)

            // 2. Insert ke pesanan
            const { data: pesanan, error: pesananError } = await supabase
                .from('pesanan')
                .insert({
                    customer_id: customer.id,
                    total_harga: totalHarga,
                    status: 'pending',
                })
                .select()
                .single()

            if (pesananError) throw pesananError

            // 3. Insert ke detail_pesanan
            const detailsPayload = cart.map((item) => ({
                pesanan_id: pesanan.id,
                produk_id: item.id,
                jumlah: item.quantity,
                harga_satuan: item.harga,
            }))

            const { error: detailError } = await supabase
                .from('detail_pesanan')
                .insert(detailsPayload)

            if (detailError) throw detailError

            // 4. Update stok lokal (opsional, tapi bagus untuk UX)
            setProducts(
                products.map((p) => {
                    const cartItem = cart.find((item) => item.id === p.id)
                    return cartItem ? { ...p, stok: p.stok - cartItem.quantity } : p
                })
            )

            // Sukses
            setCart([])
            setIsCartOpen(false)
            setMessage({ type: 'success', text: 'Pesanan Anda berhasil dikirim! Menunggu konfirmasi admin.' })
        } catch (err) {
            console.error(err)
            setMessage({ type: 'error', text: err.message || 'Gagal membuat pesanan.' })
        } finally {
            setLoading(false)
        }
    }

    const filteredProducts = products.filter((p) =>
        p.nama_produk.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const cartTotal = cart.reduce((sum, item) => sum + item.harga * item.quantity, 0)
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <div className="p-5 flex gap-6 relative min-h-[calc(100vh-100px)]">
            {/* Catalog Area */}
            <div className="flex-1">
                <PageHeader title="Katalog Produk" breadcrumb={['Home', 'Katalog']} />

                {message && (
                    <div
                        className={`mb-5 p-4 rounded-xl border text-sm ${message.type === 'success'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-red-50 text-red-600 border-red-200'
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Cari makanan & minuman..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border px-4 py-2 bg-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-hijau w-72 shadow-sm"
                    />
                    <button
                        onClick={() => setIsCartOpen(!isCartOpen)}
                        className="ml-auto relative flex items-center gap-2 bg-hijau text-white px-4 py-2.5 rounded-xl font-bold hover:bg-green-600 transition shadow-md"
                    >
                        <FaShoppingCart />
                        Keranjang
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-extrabold animate-bounce">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((prod) => (
                            <div
                                key={prod.id}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300 flex flex-col overflow-hidden"
                            >
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-800 leading-tight">
                                            {prod.nama_produk}
                                        </h3>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                        {prod.deskripsi || 'Tidak ada deskripsi.'}
                                    </p>
                                    <div className="mt-auto flex items-end justify-between">
                                        <div>
                                            <span className="block text-xs text-gray-400">Harga</span>
                                            <span className="text-xl font-extrabold text-gray-900">
                                                {formatRupiah(prod.harga)}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-400 text-right mb-1">
                                                Stok: <b className={prod.stok < 5 ? 'text-red-500' : 'text-gray-600'}>{prod.stok}</b>
                                            </span>
                                            <button
                                                onClick={() => addToCart(prod)}
                                                disabled={prod.stok < 1}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${prod.stok < 1
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-green-100 text-hijau hover:bg-hijau hover:text-white'
                                                    }`}
                                            >
                                                {prod.stok < 1 ? 'Habis' : '+ Tambah'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-gray-400">
                            Produk tidak ditemukan.
                        </div>
                    )}
                </div>
            </div>

            {/* Slide-over Cart Panel */}
            {isCartOpen && (
                <div className="w-80 bg-white border-l border-gray-100 shadow-xl p-5 flex flex-col shrink-0 rounded-2xl h-[calc(100vh-140px)] sticky top-24">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b">
                        <h3 className="font-extrabold text-gray-800 flex items-center gap-2">
                            <FaShoppingCart className="text-hijau" /> Keranjang Belanja
                        </h3>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="text-gray-400 hover:text-black font-bold"
                        >
                            &times;
                        </button>
                    </div>

                    {cart.length > 0 ? (
                        <>
                            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-50 items-start">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-gray-800 truncate">
                                                {item.nama_produk}
                                            </h4>
                                            <span className="text-xs text-gray-500">
                                                {formatRupiah(item.harga)}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="flex items-center gap-2 bg-gray-50 border rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="text-xs p-1 hover:text-red-500"
                                                >
                                                    <FaMinus size={10} />
                                                </button>
                                                <span className="text-xs font-bold w-4 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="text-xs p-1 hover:text-green-500"
                                                >
                                                    <FaPlus size={10} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-[10px] text-gray-400 hover:text-red-500 flex items-center gap-1 mt-1"
                                            >
                                                <FaTrash size={8} /> Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-gray-500">Total</span>
                                    <span className="text-lg font-black text-gray-900">
                                        {formatRupiah(cartTotal)}
                                    </span>
                                </div>
                                <button
                                    onClick={checkout}
                                    disabled={loading}
                                    className="w-full bg-hijau text-white py-3 rounded-xl font-bold hover:bg-green-600 transition shadow-lg disabled:opacity-60"
                                >
                                    {loading ? 'Memproses...' : 'Buat Pesanan'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col justify-center items-center text-center text-gray-400 py-12">
                            <FaShoppingCart size={32} className="mb-2 text-gray-300" />
                            <p className="text-sm">Keranjang kosong.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
