import { easeOut, motion } from "framer-motion";
import Person from "./Person";
import { useState } from "react";

const randomPosition = () => ({
  x: Math.random() * 20, // Adjusted for element width
  y: Math.random() * 20,
});
export default function FloatingElement() {
  const [pos, setPos] = useState(randomPosition());

  return (
    <div className="relative">
      <svg
        width="450"
        height="437"
        className="absolute top-50 left-[50vw]"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 13 8 C 10 8 11 12 9 12 Q 8 12 7 9 T 10 9 Q 13 11 13 14 C 13 16 11 13 6 12 C 4 12 4 11 6 9 C 8 7 10 8 11 6 C 12 4 14 7 14 9 S 10.67 10.33 8 11 C 5.33 11.67 9 8 7 5 C 6 3 9 3 12 5 S 15 8 15 4"
          fill="transparent"
          strokeWidth="2"
          stroke="red"
        />
      </svg>

      {/* <motion.div
        className="absolute top-30 left-[50vw]"
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        style={{
          width: 50,
          height: 50,
          backgroundColor: "#4a9df8",
          borderRadius: 10,
          offsetRotate: "reverse",
          offsetPath: `path("M 0.13 0.08 C 0.1 0.08 0.11 0.12 0.09 0.12 Q 0.08 0.12 0.07 0.09 T 0.1 0.09 Q 0.13 0.11 0.13 0.14 C 0.13 0.16 0.11 0.13 0.06 0.12 C 0.04 0.12 0.04 0.11 0.06 0.09 C 0.08 0.07 0.1 0.08 0.11 0.06 C 0.12 0.04 0.14 0.07 0.14 0.09 S 0.1067 0.1033 0.08 0.11 C 0.0533 0.1167 0.09 0.08 0.07 0.05 C 0.06 0.03 0.09 0.03 0.12 0.05 S 0.15 0.08 0.15 0.04")`,
        }}> */}
      <Person />
      {/* </motion.div> */}
    </div>
  );
}
