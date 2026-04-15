import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function Person({
  person = "",
  size = "size-25",
  classname = "",
  animate = {},
  transition = {},
  onClick = () => {},
  exit = {},
  isVisible = true,
  initial = {},
}) {
  const [isToggled, setIsToggled] = useState(false);
  classname = classname + " absolute -translate-x-1/2";
  return (
    <AnimatePresence initial={true}>
      {isVisible ? (
        <motion.div
          className={classname}
          initial={{ opacity: 0, ...initial }}
          animate={{ opacity: 1, ...animate }}
          transition={transition}
          onClick={onClick}
          exit={exit}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            // onClick={() => setIsToggled(!isToggled)}
            animate={{ scale: isToggled ? 1.5 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex flex-col items-center gap-2"
          >
            <div
              className={`${size} bg-white border-5 border-red-500 p-2 rounded-full cursor-pointer shadow-lg`}
            />
            <p>{person}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
export default Person;
