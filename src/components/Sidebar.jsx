import { Link, NavLink } from "react-router-dom"

export default function Sidebar() {
        const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4  space-x-2
        ${isActive ? 
            "text-hijau bg-green-200 font-extrabold" : 
            "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`
    return (
        <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
            {/* Logo */}
            <div className=" flex flex-col ">
      <span className="font-poppins font-[1000] text-[48px]">Sedap<b className="text-green-500">.</b></span>
      <span className="text-gray-400 font-semibold font-barlow">Modern Admin Dashboard</span>
  </div>

            {/* List Menu */}
            <div id="sidebar-menu" className="mt-10">
                <ul id="menu-list" className="space-y-3">
                    <li>
	                    <NavLink to="/" id="menu-1" className={menuClass}>
                            Dashboard</NavLink>
	                  </li>
                    <li>
	                    <NavLink to="/orders" id="menu-2" className={menuClass}>
                            Orders</NavLink>
	                  </li>
	                  <li>
	                    <NavLink to="/customers" id="menu-3" className={menuClass}>
                            Customers</NavLink>
	                  </li>
                      <li>
	                    <NavLink to="/products/" id="menu-3" className={menuClass}>
                            Products</NavLink>
	                  </li>
                      <li>
	                    <NavLink to="/components" id="menu-4" className={menuClass}>
                            Components</NavLink>
	                  </li>
                      <li>
	                    <NavLink to="/fiturxyz" id="menu-5" className={menuClass}>
                            Fitur XYZ</NavLink>
	                  </li>
                </ul>
            </div>

            {/* Footer */}
            <div id="sidebar-footer" className="mt-auto">
                <div id="footer-card" className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center">
                    <div id="footer-text" className="text-white text-sm">
                        <span>Please organize your menus through button below!</span>
                        <div id="add-menu-button" className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2">
                            <span className="text-gray-600 flex items-center">Add Menus</span>
                        </div>
                    </div>
                    <img id="footer-avatar" className="w-20 rounded-full" src="src\pertemuan-5\assets\pfp.png" />
                </div>
                <span id="footer-brand" className="font-bold text-gray-400">Sedap Restaurant Admin Dashboard</span>
                <p id="footer-copyright" className="font-light text-gray-400">&copy; 2025 All Right Reserved</p>
            </div>
        </div>
    );
}