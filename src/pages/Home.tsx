import Person from "../components/Person";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Parallax from "../components/Parallax";
import { useNodeStore } from "../store/nodeStore";
import { getNode } from "../utils/treeHelpers";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import { ChevronsUp, Volume2 } from "lucide-react";
// import FloatingElement from "./Floating Element";
// import Attempt from "./Attempt";

// const LOREM_IPSUM = "Horas ma di hita saluhutna.";
// const LOREM_IPSUM2 = "Salam untuk kita semuanya.";
type Props = {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
};

function Home({ isPlaying, onPlay, onPause }: Props) {
  // const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(true);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-my-red">
      <AnimatePresence>
        {start && (
          <motion.div
            className="fixed flex flex-col justify-center items-center h-screen w-screen bg-my-black z-999 p-10"
            onClick={() => {
              setStart(false);
              onPlay();
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Volume2 size={170} color="var(--color-my-cream)" />
            <h1 className="text-2xl text-my-cream">
              Web ini menggunakan musik, gunakan earphone untuk pengalaman yang
              lebih baik.
            </h1>
            <h1 className="mt-10 text-lg text-my-cream">Klik untuk lanjut</h1>
          </motion.div>
        )}
      </AnimatePresence>
      <section
        ref={containerRef}
        className="relative h-screen sm:h-[150vh] flex items-center justify-center"
      >
        <div className="fixed top-[40vh] sm:top-[20vh] left-1/2 transform -translate-1/2 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl"
          >
            TAROMBO
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl mt-5"
          >
            Pomparan ni Ompu Raja Guna
          </motion.h2>
        </div>
        <div className="fixed left-2 z-0 h-auto top-0 flex content-start gap-4 pointer-events-none">
          <Parallax
            w={20}
            style={{
              translateY: useTransform(scrollYProgress, [0, 1], [-322, -122]),
            }}
          />
          <Parallax
            w={20}
            style={{
              translateY: useTransform(scrollYProgress, [0, 1], [0, -200]),
            }}
          />
        </div>
        <div className="fixed right-3 z-0 h-auto top-0 flex content-start gap-4 pointer-events-none">
          <Parallax
            w={20}
            style={{
              translateY: useTransform(scrollYProgress, [0, 1], [0, -200]),
            }}
          />
          <Parallax
            w={20}
            style={{
              translateY: useTransform(scrollYProgress, [0, 1], [-322, -122]),
            }}
          />
        </div>
        <svg
          className="absolute -bottom-1 w-[101vw]"
          aria-hidden="true"
          viewBox="0 0 10 5"
        >
          <defs>
            <filter id="frontShadow" x="0%" y="-10%" width="100%" height="190%">
              <feDropShadow
                dx="0"
                dy="-0.05"
                stdDeviation="0.08"
                floodColor="rgba(0,0,0,0.5)"
              />
            </filter>
          </defs>
          <motion.polygon
            points="0,5 0,0.5 10,3 10,5"
            fill="var(--color-my-black)"
            filter="url(#frontShadow)"
            style={{
              translateY: useTransform(scrollYProgress, [0, 1], [0, 2.5]),
            }}
          />
          <motion.polygon
            points="0,5 0,3.5 10,1 10,5"
            fill="var(--color-my-cream)"
            filter="url(#frontShadow)"
            style={{
              translateY: useTransform(scrollYProgress, [0, 1], [0, 2]),
            }}
          />
          <motion.polygon
            points="0,5 0,1.5 10,4 10,5"
            fill="var(--color-my-black)"
            filter="url(#frontShadow)"
            style={{
              translateY: useTransform(scrollYProgress, [0, 1], [0, 1.5]),
            }}
          />
          <polygon
            points="0,5 0,4.5 10,2 10,5"
            fill="var(--color-my-cream)"
            filter="url(#frontShadow)"
          />
        </svg>
        <motion.div
          className="flex flex-col justify-center items-center"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.03], [1, 0]),
          }}
        >
          <motion.div //scroll icon
            className="absolute bottom-[20vh] sm:bottom-[53vh] flex flex-col justify-center items-center text-center size-10 sm:size-12 bg-my-black rounded-full"
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            initial={{ opacity: 0.6, y: 0 }}
            animate={{ opacity: 0, y: -15 }}
          >
            <ChevronsUp color="var(--color-my-cream)" className="size-8" />
          </motion.div>
          <h2 className="absolute bottom-[17vh] text-my-cream sm:opacity-0">
            geser ke atas
          </h2>
        </motion.div>
      </section>
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
}

export default Home;
