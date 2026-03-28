import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 md:py-6 backdrop-blur-md bg-zinc-950/50 border-b border-white/5 flex justify-between items-center transition-all duration-500">
            <Link to="/" className="flex items-center gap-3 md:gap-4 group">
                <div className="relative">
                    <div className="absolute -inset-2 bg-blue-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/20 transition-all duration-500 group-hover:scale-110">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-bold tracking-tight text-white leading-none">
                        Deep<span className="text-blue-400">Shield</span>
                    </span>
                </div>
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-10 text-[13px] font-bold uppercase tracking-widest items-center">
                <li>
                    <Link to="/" className="text-zinc-400 hover:text-white transition-all duration-300 relative group">
                        Home
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="text-zinc-400 hover:text-white transition-all duration-300 relative group">
                        About
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </li>
                <li>
                    <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 rounded-full border border-white/5 transition-all duration-500 hover:scale-105 active:scale-95">
                        Documentation
                    </button>
                </li>
            </ul>


            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    )}
                </svg>
            </button>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 glass-morphism border-b border-white/10 p-6 flex flex-col gap-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <Link to="/" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white text-lg font-medium">Home</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white text-lg font-medium">About</Link>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-2xl transition-all duration-200 text-center font-bold">
                        Docs
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;