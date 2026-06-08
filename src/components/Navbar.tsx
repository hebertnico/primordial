import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, Home } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-100 bg-my-cream/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          {/* Desktop Nav */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className="flex flex-col justify-center items-center text-center"
            >
              <Home color="var(--color-my-black)" size={20} />
            </Link>
          </div>
          <div className=" items-center space-x-8 text-my-black">
            <Link
              to="/RSRP"
              className="text-sm font-bold text-brand-accent hover:text-brand-black transition-colors"
            >
              Tarombo
            </Link>
            <a
              href="https://docs.google.com/spreadsheets/d/1roswam1CDkIhQUekKV4G5cOD3yGppVK2ob2HQO4DEo0/edit?gid=935785084#gid=935785084"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold hover:text-brand-accent transition-colors"
            >
              Tambah
            </a>
            {/* <Link to="/cupcakes" className="text-sm font-bold text-brand-accent hover:text-brand-black transition-colors">CUPCAKES</Link>
            <Link to="/typing-effect" className="text-sm font-bold text-brand-accent hover:text-brand-black transition-colors">TYPING EFFECT</Link>
            <Link to="/category/T-Shirts" className="text-sm font-medium hover:text-brand-accent transition-colors">T-SHIRTS</Link>
            <Link to="/category/Jeans" className="text-sm font-medium hover:text-brand-accent transition-colors">DENIM</Link>
            <Link to="/category/Outerwear" className="text-sm font-medium hover:text-brand-accent transition-colors">OUTERWEAR</Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
