import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import {
    FaCalendarAlt,
    FaPlus,
    FaChevronDown,
    FaSignOutAlt,
    FaUsers,
    FaUniversity,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

function Navbar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
                            <FaCalendarAlt className="text-white text-lg" />
                        </div>
                        <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Event Bridge
                        </span>
                    </Link>

                    <div className="flex items-center gap-6 relative" ref={dropdownRef}>

                        <div className="hidden md:flex items-center gap-1">
                            <NavLink to="/" icon={<FaCalendarAlt />} text="Home" />
                            <NavLink to="/clubs" icon={<FaUsers />} text="Clubs" />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <FaPlus className="text-sm" />
                                <span>Create</span>
                                <FaChevronDown
                                    className={`text-xs transition-transform duration-300 ${open ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {open && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    <Link
                                        to="/create-club"
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors font-medium border-b border-gray-100 last:border-0"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                            <FaUniversity className="text-sm" />
                                        </div>
                                        Create Club
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            to="/profile"
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                            title="Profile"
                        >
                            <FaUsers />
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="text-gray-500 hover:text-red-500 transition-colors p-2"
                            title="Logout"
                        >
                            <FaSignOutAlt size={20} />
                        </button>

                    </div>
                </div>
            </div>
        </nav>
    );
}

function NavLink({ to, icon, text }) {
    return (
        <Link
            to={to}
            className="group flex items-center gap-2 px-4 py-2 rounded-full hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium relative overflow-hidden"
        >
            <span className="relative z-10 flex items-center gap-2">
                {icon}
                {text}
            </span>
        </Link>
    );
}

export default Navbar;

