import {
  ChevronDown,
  ChevronsDown,
  Circle,
  CircleChevronDown,
  Pencil,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Person({
  id = "",
  person = "",
  sex = "",
  tubu = "",
  monding = "",
  photo = "",
  childnum = null,
  expanded = "",
  isActive = false,
  hasFam = 0,
  niain = false,
}) {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const longName = person.length > 20;
  const [distance, setDistance] = useState([0, 0]);

  tubu = (tubu ?? "") === "" ? "dd Mmm YYYY" : tubu;
  // console.log(longName, person.length, person);
  // classname = classname + " absolute -translate-x-1/2 cursor-pointer ";

  const ref = useRef<HTMLDivElement>(null);

  const measure = () => {
    if (!ref.current) return;
    const element = ref.current;
    setTimeout(() => {
      const rect = element.getBoundingClientRect();
      // console.log(person, "Initial Position:", rect.top, rect.left);
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      setIsDesktop(cx >= 470);

      const ex = rect.left + rect.width / 2;
      const ey = rect.top + rect.height / 2;

      setDistance([cx - ex, cy - ey]);
    }, 30);
  };

  // const handleImageLoaded = () => {
  useLayoutEffect(() => {
    measure();
    // };
  }, [expanded]);

  return (
    // <AnimatePresence initial={true}>
    <motion.div //magnetic center container
      // layoutId={id}
      ref={ref}
      // onLayoutAnimationComplete={() => measure()}
      className="relative w-full h-full [--x-factor:0.6] [--y-factor:0.6] sm:[--x-factor:0.2] sm:[--y-factor:0.8] "
      // initial={{
      //   x: distance[0] - 100,
      //   y: -distance[1],
      // }}
      // initial={{ opacity: 0 }}
      animate={{
        // ...animate,
        ...(isHovered || isActive
          ? {
              // x: distance[0] * 1,
              // y: distance[1] * 0.6,
              x: `calc(${distance[0]}px * var(--x-factor))`,
              y: `calc(${distance[1]}px * var(--y-factor))`,
              height: ref.current?.clientWidth,
            }
          : { x: 0, y: 0, height: "100%" }),
      }}
      // exit={{
      //   x: isActive ? 0 : distance[0] - 100,
      //   y: isActive ? 0 : -distance[1],
      // }}
      transition={{ duration: 0.6 }}
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
        animate={isDesktop ? { offsetDistance: "100%" } : {}}
        style={{
          offsetPath: `path("M 9 11 C 14 7 12 3 8 3 C 4 3 1 3 2 7 C 3 11 5 14 9 11"
              )`,
          offsetRotate: "0deg",
          offsetPosition: "center",
        }}
        className="absolute translate-1/2 size-full flex flex-col gap-2"
      >
        {childnum && (
          <motion.div //child number
            // animate={{ scale: isActive ? 1.5 : 1 }}
            // transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute flex flex-col justify-center items-center text-center size-[20%] bg-my-cream rounded-full"
          >
            <p className="text-my-black font-bold text-sm">{childnum}</p>
          </motion.div>
        )}
        <motion.div //circular card, scale up container
          animate={
            isHovered || isActive
              ? {
                  scale: "var(--activeSize)",
                }
              : {
                  scale: 1,
                  borderWidth: 3,
                  overflow: "hidden",
                }
          }
          transition={{ duration: 0.4 }}
          className="relative size-full flex flex-col z-20 items-center bg-my-red border-my-red rounded-full shadow-2xl/80 [--activeSize:2] sm:[--activeSize:1.7]"
        >
          <motion.div //img container
            className="absolute left-1/2 flex size-full rounded-full bg-my-black -translate-x-1/2 items-center justify-center overflow-hidden [--imgScale:1.5] sm:[--imgScale:1.2] [--yActive:-40%]"
            animate={
              isHovered || isActive
                ? {
                    y: "var(--yActive)",
                    scale: "calc(var(--imgScale)/var(--activeSize))",
                    // borderRadius: "100%",
                  }
                : { scale: 1 }
            }
          >
            <img
              src={
                photo
                  ? photo
                  : sex === "F"
                    ? "/images/def_F.webp"
                    : "/images/def_M.webp"
              }
              alt={person}
              className="size-full object-cover mask-luminance mask-b-from-white mask-b-from-50% mask-b-to-black"
              style={{ maskMode: isHovered || isActive ? "unset" : "" }}
              // onLoad={handleImageLoaded}
            />
          </motion.div>
          <motion.div //text container
            className={"absolute flex flex-col text-center items-center"}
            style={{ gap: longName ? 1 : 2 }}
            animate={
              isHovered || isActive
                ? { top: longName ? "50%" : "50%" }
                : { top: longName ? "60%" : "70%" }
            }
          >
            <motion.h2 //name
              className="font-bold wrap-break-word [--activeFontSize:70%] sm:[--activeFontSize:50%] [--longSize:65%] sm:[--longSize:65%] [--activeTop:-100%] md:[--activeTop:-80%] [--activeWidth:78%] md:[--activeWidth:200%] [--activeLongTop:-120%] md:[--activeLongTop:-80%] [--activeLongWidth:75%] md:[--activeLongWidth:41.8vw]"
              animate={
                isHovered || isActive
                  ? {
                      width: longName ? "75%" : "var(--activeWidth)",
                      fontSize: longName
                        ? "var(--longSize)"
                        : "var(--activeFontSize)",
                    }
                  : {
                      width: longName ? "60%" : "70%",
                      fontSize: longName ? "60%" : "65%",
                    }
              }
            >
              {person}
            </motion.h2>
            <motion.div //tubu, monding container
              className={"flex flex-col text-center w-40 text-[50%]"}
              animate={
                isHovered || isActive ? { opacity: 100 } : { opacity: 0 }
              }
            >
              <p>
                Tubu: <span>{tubu}</span>
              </p>
              {monding && (
                <p className=" text-[90%]">
                  Monding: <span>{monding}</span>
                </p>
              )}
              {niain && <p>*{sex === "M" ? "anak" : "boru"} ni ain</p>}
            </motion.div>
          </motion.div>
        </motion.div>

        {(isHovered || isActive) && (
          <div className="absolute flex justify-center gap-3 -bottom-full sm:-bottom-20 sm:z-20 left-[50%] -translate-x-1/2 cursor-pointer">
            {hasFam > 0 && (
              <motion.div //navigate button
                className="flex flex-col justify-center items-center text-center size-20 sm:size-12 bg-my-white rounded-full"
                onClick={() =>
                  hasFam > 1
                    ? navigate(`/tree2/${id}`)
                    : navigate(`/tree/${id}`)
                }
                whileTap={{ scale: 0.8 }}
              >
                <Circle
                  color="var(--color-my-black)"
                  className="size-12 sm:size-8"
                >
                  <ChevronsDown
                    color="var(--color-my-black)"
                    size={16}
                    x={4}
                    y={4}
                  />
                  {/* </CircleChevronDown> */}
                </Circle>
              </motion.div>
            )}
            <motion.div //edit button
              className=" flex flex-col justify-center items-center text-center size-20 sm:size-12 bg-my-white rounded-full"
              onClick={() => navigate(`/edit/${id}`)}
              whileTap={{ scale: 0.8 }}
            >
              <Pencil
                color="var(--color-my-black)"
                className="size-12 sm:size-8"
              />
            </motion.div>
          </div>
        )}
      </motion.div>
    </motion.div>
    // </AnimatePresence>
  );
}
export default Person;
