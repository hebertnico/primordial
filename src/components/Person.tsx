import { AnimatePresence, hover, motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

function Person({
  person = "",
  tubu = "dd Mmm YYYY",
  monding = "",
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
  const longName = person.length > 22;
  const [distance, setDistance] = useState([0, 0]);
  // console.log(longName, person.length, person);
  // classname = classname + " absolute -translate-x-1/2 cursor-pointer ";

  const ref = useRef<HTMLDivElement>(null);

  const handleImageLoaded = () => {
    // useLayoutEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    setTimeout(() => {
      const rect = element.getBoundingClientRect();
      // console.log(person, "Initial Position:", rect.top, rect.left);
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      const ex = rect.left + rect.width / 2;
      const ey = rect.top + rect.height / 2;

      setDistance([cx - ex, cy - ey]);
    }, 30);
  };
  // }, []);

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
        <motion.div //magnetic center container
          ref={ref}
          className="relative size-full max-w-[90vw] [--x-factor:1] [--y-factor:0.6] sm:[--x-factor:0.2] sm:[--y-factor:0.6] "
          // initial={{ opacity: 0, ...initial }}
          animate={{
            opacity: 1,
            // ...animate,
            ...(isHovered || isToggled
              ? {
                  // x: distance[0] * 1,
                  // y: distance[1] * 0.6,
                  x: `calc(${distance[0]}px * var(--x-factor))`,
                  y: `calc(${distance[1]}px * var(--y-factor))`,
                }
              : { x: 0, y: 0 }),
          }}
          // transition={transition}
          // onClick={onClick}
          onClick={() => {
            // onClick;
            setIsToggled(!isToggled);
          }}
          onHoverStart={() => {
            setIsHovered(true);
          }}
          onHoverEnd={() => {
            setIsHovered(false);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          // exit={exit}
        >
          <motion.div //floating effect container
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
            className="absolute translate-1/2 size-full [--activeSize:2] md:[--activeSize:3]"
          >
            {/* <motion.div
              // animate={{ scale: isToggled ? 1.5 : 1 }}
              // transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`flex flex-col items-center gap-1`}
            > */}
            <motion.div //circular card, scale up container
              animate={
                isHovered || isToggled
                  ? {
                      scale: "var(--activeSize)",
                    }
                  : { scale: 1, borderWidth: 0, overflow: "hidden" }
              }
              transition={{ duration: 0.2 }}
              className="size-full relative flex flex-col items-center bg-red-500 border-red-500 rounded-full shadow-md"
            >
              <motion.div //text container
                className={"absolute flex flex-col text-center items-center"}
                style={{ gap: longName ? 1 : 2 }}
                animate={
                  isHovered || isToggled
                    ? { y: longName ? 74 : 80 }
                    : { y: longName ? 10 : 15 }
                }
              >
                <motion.h2 //name
                  className="font-bold wrap-break-word mt-2 [--activeFontSize:80%] md:[--activeFontSize:4vw] [--longSize:65%] md:[--longSize:3.8vw] [--activeTop:-100%] md:[--activeTop:-80%] [--activeWidth:90%] md:[--activeWidth:200%] [--activeLongTop:-120%] md:[--activeLongTop:-80%] [--activeLongWidth:75%] md:[--activeLongWidth:41.8vw]"
                  animate={
                    isHovered || isToggled
                      ? {
                          width: longName ? "75%" : "var(--activeWidth)",
                          fontSize: longName
                            ? "var(--longSize)"
                            : "var(--activeFontSize)",
                        }
                      : { width: "70%", fontSize: longName ? "60%" : "75%" }
                  }
                >
                  {person}
                </motion.h2>
                <motion.div //tubu, monding container
                  className={
                    "flex flex-col text-center w-40 text-[55%] text-white"
                  }
                  animate={
                    isHovered || isToggled ? { opacity: 100 } : { opacity: 0 }
                  }
                >
                  <p>
                    Tubu: <span>{tubu}</span>
                  </p>
                  {monding && (
                    <p className=" text-[98%]">
                      Monding: <span>{monding}</span>
                    </p>
                  )}
                </motion.div>
              </motion.div>
              <motion.div //img container
                className="absolute left-1/2 flex size-[80%] -translate-x-1/2 items-center justify-center rounded-full [--imgScale:0.8] [--yActive:-30%]"
                animate={
                  isHovered || isToggled
                    ? { y: "var(--yActive)", scale: "var(--imgScale)" }
                    : { y: "40%", scale: 1 }
                }
              >
                <img
                  src={photo ? photo : "/images/def_M.jpg"}
                  alt={person}
                  className="size-full object-cover rounded-full"
                  onLoad={handleImageLoaded}
                />
              </motion.div>
            </motion.div>
            {/* </motion.div> */}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
export default Person;
