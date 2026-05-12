import { motion } from "motion/react";

export default function Parallax({ w = 5, cn = "", style = {} }) {
  return (
    <motion.div className={cn} style={style}>
      <svg
        className="h-full"
        aria-hidden="true"
        viewBox="0 0 10 600"
        style={{ width: w }}
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
                  fill="var(--color-my-cream)"
                />
              </pattern>
            </defs>
            <rect y="-0" width="10" height="136" fill="url(#rectPattern)" />
            <g fill="currentColor">
              <polygon points="0,136 2.5,136 10,156 7.5,156" />
              <polygon points="0,156 2.5,156 10,136 7.5,136" />
            </g>
          </pattern>
        </defs>
        <rect y="0" width="10" height="644" fill="url(#ribbon)" />
      </svg>
    </motion.div>
  );
}
