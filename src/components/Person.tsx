import { ChevronsDown, Circle, Pencil } from "lucide-react";
import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingCircle from "./LoadingCircle";

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
  isDesktop = false,
}) {
  const navigate = useNavigate();
  const [distance, setDistance] = useState([0, 0]);
  const longName = person.length > 20;
  const [loading, setLoading] = useState(true);

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

      const ex = rect.left + rect.width / 2;
      const ey = rect.top + rect.height / 2;

      setDistance([cx - ex, cy - ey]);
    }, 30);
  };

  // const handleImageLoaded = () => {
  useLayoutEffect(() => {
    if (isDesktop) {
      measure();
    }
  }, [expanded]);

  return (
    // <AnimatePresence initial={true}>
    <motion.div //magnetic center container
      // layoutId={id}
      ref={ref}
      // onLayoutAnimationComplete={() => measure()}
      className="relative w-full h-full"
      // initial={{
      //   x: distance[0] - 100,
      //   y: -distance[1],
      // }}
      // initial={{ opacity: 0 }}
      animate={{
        // ...animate,
        ...(isActive
          ? isDesktop
            ? {
                // x: distance[0] * 1,
                // y: distance[1] * 0.6,
                x: `calc(${distance[0]}px * 0.8)`,
                y: `calc(${distance[1]}px * 0.8)`,
              }
            : {
                // height: "40vw",
                // width: "40vw",
                x: 0,
                y: 0,
              }
          : {
              x: 0,
              y: 0,
              // height: "100%",
              // width: "100%",
            }),
      }}
      // exit={{
      //   x: isActive ? 0 : distance[0] - 100,
      //   y: isActive ? 0 : -distance[1],
      // }}
      transition={{ duration: 0.4 }}
      // onHoverStart={() => {
      //   setIsHovered(true);
      // }}
      // onHoverEnd={() => {
      //   setIsHovered(false);
      // }}
      whileHover={{ scale: isActive ? 1 : 1.4 }}
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
            className="absolute flex flex-col justify-center items-center text-center size-[20%] bg-my-cream rounded-full"
            style={
              isActive
                ? {
                    left: isDesktop ? "-6%" : "-50%",
                    top: isDesktop ? "8%" : "-30%",
                    fontSize: isDesktop ? "150%" : "80%",
                    scale: isDesktop ? 1 : 2,
                  }
                : {
                    fontSize: "70%",
                  }
            }
          >
            <p className="text-my-black font-bold ">{childnum}</p>
          </motion.div>
        )}
        <motion.div //circular card, scale up container
          animate={
            isActive
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
          className="relative size-full flex flex-col z-20 items-center bg-my-red border-my-red rounded-full shadow-2xl/80 [--activeSize:2] sm:[--activeSize:1]"
        >
          <motion.div //img container
            className="absolute left-1/2 flex size-full rounded-full bg-my-black -translate-x-1/2 items-center justify-center overflow-hidden [--imgScale:1.5] sm:[--imgScale:1.2] [--yActive:-40%]"
            animate={
              isActive
                ? {
                    y: "var(--yActive)",
                    scale: isDesktop
                      ? 0.8
                      : "calc(var(--imgScale)/var(--activeSize))",
                    // borderRadius: "100%",
                  }
                : { scale: 1 }
            }
          >
            {loading && (
              <div className="absolute z-50">
                <LoadingCircle />
              </div>
            )}
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
              style={{ maskMode: isActive ? "unset" : "" }}
              onLoad={() => setLoading(false)}
            />
          </motion.div>
          <motion.div //text container
            className={
              "absolute flex flex-col text-center items-center [--top:50%] sm:[--top:55%]"
            }
            style={{ gap: longName ? 1 : 2 }}
            animate={
              isActive
                ? { top: "var(--top)" }
                : { top: longName ? "60%" : "70%" }
            }
          >
            <motion.h2 //name
              className="font-bold wrap-break-word [--activeFontSize:70%] sm:[--activeFontSize:100%] [--longSize:65%] sm:[--longSize:100%] [--activeTop:-100%] md:[--activeTop:-80%] [--activeWidth:78%] md:[--activeWidth:200%] [--activeLongTop:-120%] md:[--activeLongTop:-80%] [--activeLongWidth:75%] md:[--activeLongWidth:41.8vw]"
              animate={
                isActive
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
              className={
                "flex flex-col text-center w-40 text-[50%] sm:text-[75%]"
              }
              animate={isActive ? { opacity: 100 } : { opacity: 0 }}
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

        {isActive && (
          <div className="absolute flex justify-center gap-3 -bottom-full sm:-bottom-5 sm:z-20 left-[50%] -translate-x-1/2 cursor-pointer">
            {hasFam > 0 && (
              <motion.div //navigate button
                className="flex flex-col justify-center items-center text-center size-20 sm:size-12 bg-my-white rounded-full"
                onClick={(e) => {
                  hasFam > 1
                    ? navigate(`/tree2/${id}`)
                    : navigate(`/tree/${id}`);
                  e.stopPropagation();
                }}
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
