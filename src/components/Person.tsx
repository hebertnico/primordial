import { AnimatePresence, hover, motion, useAnimation } from "motion/react";
import { useEffect, useRef, useState } from "react";

function Person({
  person = "",
  tubu = "dd Mmm YYYY",
  monding = "dd Mmm YYYY",
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
  const [isHovered, setIsHovered] = useState(false);
  const [index, setIndex] = useState("z-10");
  const longName = person.length > 20;
  // console.log(longName, person.length, person);
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  async function moveTowardCenter() {
    console.log("moveToCenter called", isHovered, isToggled);
    if (!ref.current) return;
    // if (!isToggled) return;

    if (!isHovered && !isToggled) {
      const rect = ref.current.getBoundingClientRect();

      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      const ex = rect.left + rect.width / 2;
      const ey = rect.top + rect.height / 2;

      const dx = cx - ex;
      const dy = cy - ey;

      const factor = 0.4;
      console.log(dx, dy);

      await controls.start({
        x: dx * factor,
        y: dy * factor,
        transition: { duration: 0.2 },
      });
    } else if (!isToggled) {
      await controls.start({
        x: 0,
        y: 0,
        transition: { duration: 0.2 },
      });
    }
  }
  classname = classname + " absolute -translate-x-1/2 cursor-pointer " + index;

  // useEffect(() => {
  //   return hover(ref.current, () => {
  //     setIsHovered(true);
  //     console.log("on hover start", isHovered, isToggled);
  //     moveTowardCenter(true);

  //     return () => {
  //       setIsHovered(false);
  //       console.log("on hover end", isHovered, isToggled);
  //       moveTowardCenter(false);
  //       // setIsToggled(false);
  //     };
  //   });
  // }, []);

  return (
    <AnimatePresence initial={true}>
      {isVisible ? (
        <motion.div
          ref={ref}
          className={classname}
          // initial={{ opacity: 0, ...initial }}
          animate={{ opacity: 1, ...animate, ...controls }}
          transition={transition}
          // onClick={onClick}
          onClick={() => {
            setIsToggled(!isToggled);
            setIndex("z-50");
            console.log(isToggled);
            onClick;
            // moveTowardCenter(!isToggled);
          }}
          onHoverStart={() => {
            moveTowardCenter();
            setIsHovered(true);
            setIndex("z-50");
          }}
          onHoverEnd={() => {
            moveTowardCenter();
            setIsHovered(false);
            setIndex(isToggled ? "z-50" : "z-10");
          }}
          exit={exit}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            // animate={{ scale: isToggled ? 1.5 : 1 }}
            // transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`flex flex-col items-center gap-1`}
          >
            <motion.div
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * -10,
              }}
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              style={{
                offsetPath: `path("M 9 11 C 14 7 12 3 8 3 C 4 3 1 3 2 7 C 3 11 5 14 9 11"
                )`,
                offsetRotate: "0deg",
                offsetPosition: "center",
              }}
              className={`${size} relative translate-x-[40%] translate-y-1/3 rounded-full shadow-lg`}
            >
              <motion.div
                animate={
                  isHovered || isToggled
                    ? { scale: 2 }
                    : { scale: 1, borderWidth: 4 }
                }
                transition={{ duration: 0.2 }}
                className={`${size} overflow-hidden -z-10 absolute top-0 left-0 bg-red-500 border-red-500 rounded-full`}
              >
                <motion.img
                  animate={
                    isHovered || isToggled
                      ? { y: 40, scale: 1.4 / 2 }
                      : { y: 0, scale: 1 }
                  }
                  src={photo ? photo : "/images/def_M.jpg"}
                  alt={person}
                  className="size-full object-cover rounded-full"
                />
              </motion.div>
              <motion.p
                className="absolute font-bold z-20 wrap-break-word top-36 mt-2"
                animate={
                  isHovered || isToggled
                    ? {
                        x: "-10%",
                        top: longName ? "-34%" : "-30%",
                        width: "120%",
                      }
                    : { width: "100%" }
                }
              >
                {person}
              </motion.p>
              <motion.div
                className={
                  monding != ""
                    ? longName
                      ? "absolute -translate-x-2 flex flex-col bottom-[72%] w-40"
                      : "absolute -translate-x-2 flex flex-col bottom-[75%] w-40"
                    : ""
                }
                animate={
                  isHovered || isToggled ? { opacity: 100 } : { opacity: 0 }
                }
              >
                <p className="text-xs">
                  Tubu: <span>{tubu}</span>
                </p>
                {monding && (
                  <p className="text-xs">
                    Monding: <span>{monding}</span>
                  </p>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
export default Person;
