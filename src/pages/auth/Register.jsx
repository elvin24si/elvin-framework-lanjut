import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Register() {
    const { signUp } = useAuth()
    const navigate = useNavigate()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (password !== confirmPassword) {
            setError('Password dan konfirmasi password tidak cocok.')
            return
        }
        if (password.length < 6) {
            setError('Password minimal 6 karakter.')
            return
        }

        setLoading(true)
        const { error: signUpError } = await signUp(email, password, fullName)

        if (signUpError) {
            // Handle berbagai format error dari Supabase
            const msg = signUpError?.message || signUpError?.msg || JSON.stringify(signUpError)
            if (msg.includes('Database error') || msg.includes('unexpected_failure')) {
                setError('Terjadi error pada database. Pastikan SQL schema sudah dijalankan di Supabase SQL Editor. Lihat file supabase/schema.sql')
            } else if (msg.includes('already registered') || msg.includes('already been registered')) {
                setError('Email sudah terdaftar. Silakan login atau gunakan email lain.')
            } else if (msg.includes('invalid') && msg.includes('email')) {
                setError('Format email tidak valid.')
            } else {
                setError(msg || 'Terjadi kesalahan. Silakan coba lagi.')
            }
        } else {
            setSuccess('Akun berhasil dibuat! Silakan cek email untuk verifikasi, lalu login.')
        }
        setLoading(false)
    }

    return (
        <div className="animate-in fade-in duration-700">
            <h2 className="text-xl font-bold text-slate-800 mb-8 text-center uppercase tracking-tight">
                Create Account
            </h2>

            {error && (
                <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-sm text-sm text-red-600">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-sm text-sm text-green-600">
                    {success}
                </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm placeholder-slate-300"
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm placeholder-slate-300"
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm placeholder-slate-300"
                        placeholder="Min. 6 karakter"
                        required
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm placeholder-slate-300"
                        placeholder="Ulangi password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white text-[11px] font-bold py-4 rounded-sm transition-all duration-300 uppercase tracking-[0.3em] shadow-lg shadow-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? 'Creating Account...' : 'Register'}
                </button>
            </form>

            <p className="mt-8 text-center text-[11px] text-slate-400 uppercase tracking-widest">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 font-bold hover:underline">
                    Login Here
                </Link>
            </p>

            <p className="mt-3 text-center text-[10px] text-slate-300 tracking-wide">
                Daftar dengan email <span className="text-indigo-400 font-semibold">@admin.com</span> untuk akses Admin
            </p>
        </div>
    )
}
