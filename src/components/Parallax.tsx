import { motion } from "motion/react";

export default function Parallax({ w = 10, cn = "", style = {} }) {
  return (
    <motion.div className={cn} style={style}>
      <svg
        aria-hidden="true"
        viewBox="0 0 10 700"
        style={{ width: w, height: w * 70 }}
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="ribbon"
            x="0"
            y="0"
            width="10"
            height="161"
            patternUnits="userSpaceOnUse"
          >
            <defs>
              <pattern
                id="rectPattern"
                x="0"
                y="0"
                width="10"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  y="0"
                  width="10"
                  height="3"
                  fill="var(--color-my-black)"
                  opacity="40%"
                />
              </pattern>
            </defs>
            <rect y="-0" width="10" height="136" fill="url(#rectPattern)" />
            <g fill="var(--color-my-black)" opacity="40%">
              <polygon points="0,136 2.5,136 10,156 7.5,156" />
              <polygon points="0,156 2.5,156 10,136 7.5,136" />
            </g>
          </pattern>
        </defs>
        <rect y="0" width="10" height="805" fill="url(#ribbon)" />
      </svg>
    </motion.div>
  );
}
