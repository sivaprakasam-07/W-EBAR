import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full bg-black/20 backdrop-blur-lg border border-white/30 shadow-md text-gray-100 py-4 px-6 z-50"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <motion.div whileHover={{ scale: 1.1 }}>
                    <Link to="/" className="text-2xl font-bold tracking-wide text-gray-600">
                        🍗 FastFoodAR
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6 text-lg">
                    <NavLink to="/" label="Home"/>
                    <NavLink to="/menu" label="Menu"/>
                    <NavLink to="/about" label="About Us"/>
                    <NavLink to="/login" label="Login"/>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-gray-600" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden flex flex-col items-center space-y-4 bg-black/30 backdrop-blur-lg py-4 mt-2 border border-white/20 rounded-lg"
                >
                    <NavLink to="/" label="Home" onClick={() => setIsOpen(false)} />
                    <NavLink to="/menu" label="Menu" onClick={() => setIsOpen(false)} />
                    <NavLink to="/about" label="About Us" onClick={() => setIsOpen(false)} />
                    <NavLink to="/login" label="Login" onClick={() => setIsOpen(false)} />
                </motion.div>
            )}
        </motion.nav>
    );
};

// Animated NavLink Component
const NavLink = ({ to, label, onClick }) => (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link
            to={to}
            className="relative px-3 py-1 text-gray-600 font-bold transition duration-300 hover:text-red-400"
            onClick={onClick}
        >
            {label}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 hover:w-full"></span>
        </Link>
    </motion.div>
);

export default Navbar;
