import Person from "../components/Person";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Parallax from "../components/Parallax";
// import FloatingElement from "./Floating Element";
// import Attempt from "./Attempt";

const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const LOREM_IPSUM2 =
  "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet";

const Letter = ({
  char,
  progress,
  range,
}: {
  char: string;
  progress: any;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

const Word = ({
  word,
  progress,
  range,
}: {
  word: string;
  progress: any;
  range: [number, number];
}) => {
  const characters = word.split("");
  const amount = range[1] - range[0];
  const step = amount / characters.length;

  return (
    <span className="relative inline-block mr-3">
      {characters.map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;
        return (
          <Letter
            key={i}
            char={char}
            progress={progress}
            range={[start, end]}
          />
        );
      })}
    </span>
  );
};

const Section2 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.3"],
  });

  const words = LOREM_IPSUM.split(" ");
  const words2 = LOREM_IPSUM2.split(" ");
  return (
    <section className="relative flex flex-col h-[200vh] py-20 px-8  bg-my-cream text-my-black gap-5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap text-2xl font-bold leading-tight">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            return (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </div>
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap text-2xl font-bold leading-tight">
          {words2.map((word, i) => {
            const start = i / words2.length;
            const end = (i + 1) / words2.length;
            return (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

function Home() {
  // const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 10,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen">
      <section
        ref={containerRef}
        className="relative h-screen md:h-[150vh] flex items-center justify-center"
      >
        <div className="absolute top-[20vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl"
            style={{
              translateY: useTransform(smoothProgress, [0, 1], [0, 900]),
            }}
          >
            TRMB
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl"
            style={{
              translateY: useTransform(smoothProgress, [0, 1], [0, 900]),
            }}
          >
            Pomparan ni
          </motion.h2>
        </div>
        <div className="absolute left-2 z-0 h-auto top-0 flex content-start gap-4 pointer-events-none">
          <Parallax
            w={20}
            style={{
              translateY: useTransform(scrollYProgress, [0, 1], [0, 400]),
            }}
          />
          <Parallax
            w={20}
            style={{
              translateY: useTransform(scrollYProgress, [0, 1], [0, -400]),
            }}
          />
        </div>
        <div className="absolute right-3 z-0 h-auto top-0 flex content-start gap-4 pointer-events-none">
          <Parallax
            w={20}
            style={{
              translateY: useTransform(scrollYProgress, [0, 1], [0, -400]),
            }}
          />
          <Parallax
            w={20}
            style={{
              translateY: useTransform(scrollYProgress, [0, 1], [0, 400]),
            }}
          />
        </div>
        <svg
          className="absolute -bottom-px w-[101vw]"
          aria-hidden="true"
          viewBox="0 0 10 5"
        >
          <motion.polygon
            points="0,5 0,4 5,1 10,4 10,5"
            fill="var(--color-my-black)"
            style={{
              translateY: useTransform(scrollYProgress, [0, 1], [0, 2]),
            }}
          />
          <polygon points="0,5 5,2 10,5" fill="var(--color-my-cream)" />
          {/* <circle cx="12" cy="12" r="10" fill="var(--color-my-cream)" /> */}
        </svg>
      </section>
      <Section2 />
    </div>
  );
}

export default Home;
