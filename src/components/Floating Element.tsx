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
      {/* </motion.div> */}
    </div>
  );
}
