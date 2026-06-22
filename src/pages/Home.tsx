import Person from "../components/Person";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Parallax from "../components/Parallax";
import { useNodeStore } from "../store/nodeStore";
import { getNode } from "../utils/treeHelpers";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
// import FloatingElement from "./Floating Element";
// import Attempt from "./Attempt";

// const LOREM_IPSUM = "Horas ma di hita saluhutna.";
// const LOREM_IPSUM2 = "Salam untuk kita semuanya.";

function Home() {
  // const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    bounce: 0,
    damping: 0,
    restDelta: 0.01,
  });

  return (
    <div className="min-h-screen overflow-x-hidden">
      <section
        ref={containerRef}
        className="relative h-screen sm:h-[150vh] flex items-center justify-center"
      >
        <div className="fixed top-[40vh] sm:top-[20vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
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
              translateY: useTransform(scrollYProgress, [0, 1], [0, 200]),
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
              translateY: useTransform(scrollYProgress, [0, 1], [0, 200]),
            }}
          />
        </div>
        <svg
          className="absolute bottom-0 w-[101vw]"
          aria-hidden="true"
          viewBox="0 0 10 5"
        >
          <motion.polygon
            points="0,5 0,4 0,0 10,4 10,5"
            fill="var(--color-my-black)"
            style={{
              translateY: useTransform(scrollYProgress, [0, 1], [0, 4]),
            }}
          />
          <polygon points="0,5 10,1 10,5" fill="var(--color-my-cream)" />
          {/* <circle cx="12" cy="12" r="10" fill="var(--color-my-cream)" /> */}
        </svg>
      </section>
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
}

export default Home;
