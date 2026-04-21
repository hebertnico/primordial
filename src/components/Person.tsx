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
  const longName = person.length > 20;
  const [distance, setDistance] = useState([0, 0]);
  console.log(longName, person.length, person);
  classname = classname + " absolute -translate-x-1/2 cursor-pointer ";

  const ref = useRef<HTMLDivElement>(null);

  const handleImageLoaded = () => {
    // useLayoutEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    setTimeout(() => {
      const rect = element.getBoundingClientRect();
      console.log(person, "Initial Position:", rect.top, rect.left);
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
        <motion.div //circle card
          ref={ref}
          className="relative flex size-40 max-w-[90vw] overflow-hidden flex-col items-center justify-between rounded-full cursor-pointer border-red-500 bg-red-500 p-4 shadow-md md:w-48 lg:w-60 xl:w-72 2xl:w-80 [--activeSize:4] md:[--activeSize:3]"
          // initial={{ opacity: 0, ...initial }}
          animate={{
            offsetDistance: "100%",
            opacity: 1,
            ...animate,
            ...(isHovered || isToggled
              ? {
                  x: distance[0] * 0.15,
                  y: distance[1] * 0.6,
                  zIndex: 50,
                  scale: "var(--activeSize)",
                }
              : { x: 0, y: 0, zIndex: 10, scale: 1, borderWidth: 4 }),
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * -10,
          }}
          initial={{ offsetDistance: "0%" }}
          style={{
            offsetPath: `path("M 9 11 C 14 7 12 3 8 3 C 4 3 1 3 2 7 C 3 11 5 14 9 11"
              )`,
            offsetRotate: "0deg",
            offsetPosition: "center",
          }}
          onClick={() => {
            onClick;
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
          exit={exit}
        >
          <motion.div //name, tubu, monding container
            className="flex flex-col items-center text-center"
          >
            <motion.h2 className="mb-1 wrap-break-word w-30 text-sm font-semibold text-gray-800 md:text-base lg:text-lg xl:text-xl">
              John Doe Asdfghrt
            </motion.h2>
            <motion.p className="mb-1 text-xs text-gray-600 md:text-sm lg:text-base">
              Born: January 1, 1990
            </motion.p>
            <motion.p className="text-xs text-gray-700 md:text-sm lg:text-base">
              Software Engineer
            </motion.p>
          </motion.div>
          {/* <motion.div
                animate={
                  isHovered || isToggled
                    ? {
                        scale: "var(--activeSize)",
                      }
                    : { scale: 1, borderWidth: 4 }
                }
                transition={{ duration: 0.2 }}
                className={`${size} overflow-hidden -z-10 absolute top-0 left-0 bg-red-500 border-red-500 rounded-full`}
              > */}
          <div className="absolute bottom-5 left-1/2 flex h-20 w-20 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-gray-200 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-28 xl:w-28 2xl:h-32 2xl:w-32">
            <motion.img
              animate={
                isHovered || isToggled
                  ? { y: "var(--yActive)", scale: "var(--imgScale)" }
                  : { y: 0, scale: 1 }
              }
              src={photo ? photo : "/images/def_M.jpg"}
              alt={person}
              className="size-full object-cover rounded-full [--imgScale:0.675] [--yActive:4.6vw]"
              onLoad={handleImageLoaded}
            />
          </div>
          {/* </motion.div> */}
          {/* <motion.p
                className="absolute font-bold wrap-break-word top-[20vw] mt-2 text-xs md:text-lg [--activeFontSize:6vw] md:[--activeFontSize:4vw] [--longSize:4.4vw] md:[--longSize:3.8vw] [--activeTop:-100%] md:[--activeTop:-80%] [--activeWidth:270%] md:[--activeWidth:200%] [--activeLongTop:-120%] md:[--activeLongTop:-80%] [--activeLongWidth:48.5vw] md:[--activeLongWidth:41.8vw]"
                animate={
                  isHovered || isToggled
                    ? {
                        opacity: [0, 1],
                        x: "-32%",
                        top: longName
                          ? "var(--activeLongTop)"
                          : "var(--activeTop)",
                        width: longName
                          ? "var(--activeLongWidth)"
                          : "var(--activeWidth)",
                        fontSize: longName
                          ? "var(--longSize)"
                          : "var(--activeFontSize)",
                      }
                    : { width: "145%", x: "-15%" }
                }
              >
                {person}
              </motion.p> */}
          {/* <motion.div
                className={
                  monding != ""
                    ? longName
                      ? "absolute -translate-x-9 flex flex-col bottom-[105%] w-40"
                      : "absolute -translate-x-9 flex flex-col bottom-[105%] w-40"
                    : "absolute -translate-x-9 w-40 bottom-[120%]"
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
              </motion.div> */}
          {/* </motion.div>
          </motion.div> */}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
export default Person;
