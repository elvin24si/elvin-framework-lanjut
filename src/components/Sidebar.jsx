import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Sidebar() {
    const { profile } = useAuth()
    const isAdmin = profile?.role === 'admin'
    const isMember = profile?.role === 'member'

    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4 space-x-2
        ${isActive
            ? 'text-hijau bg-green-200 font-extrabold'
            : 'text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold'
        }`

    return (
        <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
            {/* Logo */}
            <div className="flex flex-col">
                <span className="font-poppins font-[1000] text-[48px]">
                    Sedap<b className="text-green-500">.</b>
                </span>
                <span className="text-gray-400 font-semibold font-barlow">Modern Admin Dashboard</span>
            </div>

            {/* List Menu */}
            <div id="sidebar-menu" className="mt-10">
                <ul id="menu-list" className="space-y-3">

                    {/* === ADMIN MENU === */}
                    {isAdmin && (
                        <>
                            <li>
                                <NavLink to="/" end id="menu-dashboard" className={menuClass}>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/orders" id="menu-orders" className={menuClass}>
                                    Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/customers" id="menu-customers" className={menuClass}>
                                    Customers
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/products" id="menu-products" className={menuClass}>
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/components" id="menu-components" className={menuClass}>
                                    Components
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/fiturxyz" id="menu-fiturxyz" className={menuClass}>
                                    Fitur XYZ
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/notes" id="menu-notes" className={menuClass}>
                                    Notes
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* === MEMBER MENU === */}
                    {isMember && (
                        <>
                            <li>
                                <NavLink to="/dashboard-member" id="menu-member-dashboard" className={menuClass}>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/catalog" id="menu-catalog" className={menuClass}>
                                    Katalog Produk
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/my-orders" id="menu-my-orders" className={menuClass}>
                                    Pesanan Saya
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Footer */}
            <div id="sidebar-footer" className="mt-auto">
                <div id="footer-card" className="bg-hijau px-4 py-3 rounded-md shadow-lg mb-6">
                    <div className="text-white text-sm">
                        <p className="font-semibold">{profile?.full_name || 'User'}</p>
                        <p className="text-green-100 text-xs uppercase tracking-widest mt-0.5">
                            {profile?.role} · {profile?.tier}
                        </p>
                        {profile?.role === 'member' && (
                            <p className="text-green-100 text-xs mt-1">
                                🏆 {profile.points} Poin
                            </p>
                        )}
                    </div>
                </div>
                <span id="footer-brand" className="font-bold text-gray-400">Sedap Restaurant Admin Dashboard</span>
                <p id="footer-copyright" className="font-light text-gray-400">&copy; 2025 All Right Reserved</p>
            </div>
        </div>
    )
}