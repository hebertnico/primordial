import { motion } from "framer-motion";

type LoadingCircleProps = {
  size?: number;
  strokeWidth?: number;
  color?: string;
};

export default function LoadingCircle({
  size = 32,
  strokeWidth = 3,
  color = "currentColor",
}: LoadingCircleProps) {
  return (
    <motion.div
      aria-label="Loading"
      role="status"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `${strokeWidth}px solid ${color}`,
        borderTopColor: "transparent",
        boxSizing: "border-box",
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}
