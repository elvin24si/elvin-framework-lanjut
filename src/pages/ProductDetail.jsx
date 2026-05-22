import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)
    const [imgLoaded, setImgLoaded] = useState(false)

    useEffect(() => {
        axios
            .get(`https://dummyjson.com/products/${id}`)
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.message)
                    return
                }
                setProduct(response.data)
            })
            .catch((err) => {
                setError(err.message)
            })
    }, [id])

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-2xl shadow p-8 text-center">
                <p className="text-red-500 font-semibold text-lg mb-4">{error}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-gray-500 hover:text-gray-800 underline transition"
                >
                    Go back
                </button>
            </div>
        </div>
    )

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-emerald-500 animate-spin" />
                <p className="text-gray-400 text-sm tracking-wide">Loading product...</p>
            </div>
        </div>
    )

    const stars = Math.round(product.rating ?? 0)

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            {/* Back Button */}
            <div className="max-w-2xl mx-auto mb-5">
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200 group-hover:border-gray-400 group-hover:shadow-md transition-all duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </span>
                    Back to Products
                </button>
            </div>

            {/* Card */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

                {/* Image */}
                <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                    {!imgLoaded && (
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
                    )}
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        onLoad={() => setImgLoaded(true)}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                    />
                    {/* Category pill overlaid on image */}
                    <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-gray-600 shadow-sm">
                        {product.category}
                    </span>
                    {/* Stock badge */}
                    <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full shadow-sm ${
                        product.stock > 50
                            ? "bg-emerald-100 text-emerald-700"
                            : product.stock > 10
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-600"
                    }`}>
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </span>
                </div>

                {/* Body */}
                <div className="p-7">
                    {/* Brand */}
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1">
                        {product.brand}
                    </p>

                    {/* Title */}
                    <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-2">
                        {product.title}
                    </h1>

                    {/* Rating */}
                    {product.rating && (
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex gap-0.5">
                                {[1,2,3,4,5].map((s) => (
                                    <svg key={s} xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${s <= stars ? "text-yellow-400" : "text-gray-200"}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-400">{product.rating.toFixed(1)} / 5</span>
                        </div>
                    )}

                    {/* Description */}
                    {product.description && (
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            {product.description}
                        </p>
                    )}

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-5" />

                    {/* Price + Action Row */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Price</p>
                            <p className="text-3xl font-extrabold text-gray-900">
                                Rp {(product.price * 1000).toLocaleString("id-ID")}
                            </p>
                        </div>
                        <button className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}