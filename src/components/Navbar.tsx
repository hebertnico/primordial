import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, Home } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const [hidden, setHidden] = useState(true);
  return (
    <motion.nav
      className="fixed top-0 z-100 w-full flex flex-col items-center"
      animate={{ translateY: hidden ? "-80%" : 0 }}
      transition={{ type: "tween" }}
      onClick={() => setHidden(!hidden)}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full bg-my-cream/80 backdrop-blur-md shadow-md z-10">
        <div className="flex justify-between items-center h-15">
          {/* Desktop Nav */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className="flex flex-col justify-center items-center text-center"
            >
              <Home color="var(--color-my-black)" size={20} />
            </Link>
          </div>
          <div className="flex items-center space-x-2 text-my-black">
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
      <div className="w-20 h-5 bg-my-cream/80 rounded-b-lg backdrop-blur-md shadow-md z-20" />
    </motion.nav>
  );
};

export default Navbar;
