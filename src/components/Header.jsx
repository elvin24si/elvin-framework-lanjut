import { FaBell, FaSearch, FaSignOutAlt } from 'react-icons/fa'
import { FcAreaChart } from 'react-icons/fc'
import { SlSettings } from 'react-icons/sl'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
    const { profile, signOut } = useAuth()

    const initials = profile?.full_name
        ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : '?'

    const tierColors = {
        gold:   'bg-yellow-100 text-yellow-700 border-yellow-300',
        silver: 'bg-slate-100 text-slate-600 border-slate-300',
        bronze: 'bg-orange-100 text-orange-700 border-orange-300',
    }

    return (
        <div id="header-container" className="flex justify-between items-center p-4">
            {/* Search Bar */}
            <div id="search-bar" className="relative w-full max-w-lg">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search Here..."
                    className="border border-gray-100 p-2 pr-10 bg-white w-full max-w-lg rounded-md outline-none"
                />
                <FaSearch id="search-icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
            </div>

            {/* Icons & Profile */}
            <div id="icons-container" className="flex items-center space-x-4">
                <div id="notification-icon" className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer">
                    <FaBell />
                    <span id="notification-badge" className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs">
                        0
                    </span>
                </div>
                <div id="chart-icon" className="p-3 bg-blue-100 rounded-2xl cursor-pointer">
                    <FcAreaChart />
                </div>
                <div id="settings-icon" className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer">
                    <SlSettings />
                </div>

                {/* Profile */}
                <div id="profile-container" className="flex items-center space-x-3 border-l pl-4 border-gray-300">
                    <div className="text-right">
                        <span id="profile-name" className="block text-sm font-bold text-gray-800">
                            {profile?.full_name || 'Loading...'}
                        </span>
                        <span className={`text-[10px] font-bold uppercase border rounded-full px-2 py-0.5 ${tierColors[profile?.tier] || tierColors.bronze}`}>
                            {profile?.role || '—'} · {profile?.tier || '—'}
                        </span>
                    </div>

                    {/* Avatar dengan inisial */}
                    <div
                        id="profile-avatar"
                        className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    >
                        {initials}
                    </div>

                    {/* Logout */}
                    <button
                        id="logout-button"
                        onClick={signOut}
                        title="Logout"
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <FaSignOutAlt />
                    </button>
                </div>
            </div>
        </div>
    )
}
