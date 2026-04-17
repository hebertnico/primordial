import { AnimatePresence, hover, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

function Person({
  person = "",
  photo = "",
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
  const [index, setIndex] = useState("z-10");
  classname = classname + " absolute -translate-x-1/2 cursor-pointer " + index;
  const ref = useRef(null);

  useEffect(() => {
    return hover(ref.current, () => {
      console.log("on hover start");
      setIsToggled(true);
      setIndex("z-50");

      return () => {
        console.log("on hover end");
        setIsToggled(false);
        setIndex("z-10");
      };
    });
  }, []);

  return (
    <AnimatePresence initial={true}>
      {isVisible ? (
        <motion.div
          className={classname}
          initial={{ opacity: 0, ...initial }}
          animate={{ opacity: 1, ...animate }}
          transition={transition}
          onClick={onClick}
          exit={exit}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            // onClick={() => setIsToggled(!isToggled)}
            // animate={{ scale: isToggled ? 1.5 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center gap-1">
            <motion.div
              ref={ref}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              style={{
                offsetPath: `path("M 9 11 C 14 7 12 3 8 3 C 4 3 1 3 2 7 C 3 11 5 14 9 11"
                )`,
                offsetRotate: "0deg",
                offsetPosition: "center",
              }}
              className={`${size} relative translate-x-[40%] translate-y-1/3 bg-red-500 p-2 rounded-full shadow-lg`}>
              {photo ? (
                <img
                  src={photo}
                  alt={person}
                  className="z-10 w-full h-full object-cover rounded-full"
                />
              ) : (
                <></>
              )}
              <motion.div
                animate={
                  isToggled
                    ? { scale: 1.5, borderWidth: 100 }
                    : {
                        scale: 1,
                        borderWidth: 5,
                      }
                }
                className={`${size} -z-10 absolute top-0 left-0 bg-white border-5 border-red-500 rounded-full`}
              />
            </motion.div>
            <motion.p
              className="z-20 font-bold"
              animate={{ color: isToggled ? "black" : "white" }}>
              {person}
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
export default Person;
