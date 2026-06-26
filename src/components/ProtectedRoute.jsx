import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Loading from './Loading'

/**
 * ProtectedRoute — Melindungi route berdasarkan status auth & role.
 * @param {string[]} allowedRoles - Jika diisi, hanya role tersebut yang diizinkan.
 */
export default function ProtectedRoute({ children, allowedRoles }) {
    const { user, profile, loading } = useAuth()

    if (loading) return <Loading />

    // Belum login → ke halaman login
    if (!user) return <Navigate to="/login" replace />

    // Role tidak sesuai → ke dashboard utama
    if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
        if (profile.role === 'member') return <Navigate to="/dashboard-member" replace />
        return <Navigate to="/" replace />
    }

    return children
}
