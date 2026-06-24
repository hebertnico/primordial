import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Volume2, VolumeOff } from "lucide-react";
import { motion } from "motion/react";

type Props = {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
};

const Navbar = ({ isPlaying, onPlay, onPause }: Props) => {
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
          <div className="flex items-center space-x-2 gap-2">
            <Link
              to="/"
              className="flex flex-col justify-center items-center text-center"
            >
              <Home color="var(--color-my-black)" size={20} />
            </Link>
            {isPlaying ? (
              <Volume2
                color="var(--color-my-black)"
                size={20}
                onClick={(e) => {
                  e.stopPropagation();
                  onPause();
                }}
              />
            ) : (
              <VolumeOff
                color="var(--color-my-black)"
                size={20}
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay();
                }}
              />
            )}
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
          </div>
        </div>
      </div>
      <motion.div
        className="w-20 bg-my-cream/80 rounded-b-xl backdrop-blur-md shadow-md z-20"
        animate={{ height: hidden ? 20 : 0 }}
      />
    </motion.nav>
  );
};

export default Navbar;
