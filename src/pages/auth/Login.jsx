import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Login() {
    const { signIn } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const { data, error: signInError } = await signIn(email, password)

        if (signInError) {
            setError(signInError.message)
            setLoading(false)
            return
        }

        // Ambil role dari user_metadata atau tunggu profile load
        // Redirect sementara ke '/', ProtectedRoute + Dashboard akan handle sisanya
        const role = data?.user?.user_metadata?.role
        if (role === 'member') {
            navigate('/dashboard-member')
        } else {
            navigate('/')
        }
        setLoading(false)
    }

    return (
        <div className="animate-in fade-in duration-700">
            <h2 className="text-xl font-bold text-slate-800 mb-8 text-center uppercase tracking-tight">
                Welcome Back
            </h2>

            {error && (
                <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-sm text-sm text-red-600">
                    {error}
                </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
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
                        placeholder="architect@whiteframe.com"
                        required
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            Password
                        </label>
                        <Link
                            to="/forgot"
                            className="text-[10px] text-indigo-600 hover:text-indigo-700 font-bold uppercase tracking-widest transition-colors"
                        >
                            Forgot?
                        </Link>
                    </div>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm placeholder-slate-300"
                        placeholder="********"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white text-[11px] font-bold py-4 rounded-sm transition-all duration-300 uppercase tracking-[0.3em] shadow-lg shadow-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? 'Signing in...' : 'Login'}
                </button>
            </form>

            <p className="mt-10 text-center text-[11px] text-slate-400 uppercase tracking-widest">
                New Account?{' '}
                <Link to="/register" className="text-indigo-600 font-bold hover:underline">
                    Register Account
                </Link>
            </p>
        </div>
    )
}