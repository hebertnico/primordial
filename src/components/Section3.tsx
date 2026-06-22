import { ChevronsDown, Circle, Home, Pencil } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function Section3() {
  const [isActive, setIsActive] = useState(false);
  return (
    <section className="relative flex flex-col items-center h-[120vh] sm:h-[180vh] py-10 px-8 bg-my-cream text-my-black gap-5">
      <h1 className="font-bold text-2xl">Panduan penggunaan</h1>
      <div className="flex flex-col items-center h-[75vh] sm:mb-[60vh] gap-10">
        <motion.div //magnetic center container
          className="relative size-40"
          animate={{ y: isActive ? 200 : 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsActive(!isActive)}
          // exit={exit}
        >
          <motion.div //floating effect container
            className="size-full flex flex-col gap-2"
          >
            <motion.div //circular card, scale up container
              animate={
                isActive
                  ? {
                      scale: 2,
                    }
                  : {
                      scale: 1,
                      borderWidth: 3,
                      overflow: "hidden",
                    }
              }
              transition={{ duration: 0.4 }}
              className="relative size-full flex flex-col z-20 items-center bg-my-red border-my-red rounded-full shadow-2xl/80"
            >
              <motion.div //img container
                className="absolute left-1/2 flex size-full rounded-full bg-my-black -translate-x-1/2 items-center justify-center overflow-hidden [--yActive:-40%]"
                animate={
                  isActive
                    ? {
                        y: "var(--yActive)",
                        scale: 0.75,
                        // borderRadius: "100%",
                      }
                    : { scale: 1 }
                }
              >
                <img
                  src={"/images/def_M.webp"}
                  alt="example"
                  className="size-full object-cover mask-luminance mask-b-from-white mask-b-from-50% mask-b-to-black"
                  style={{ maskMode: isActive ? "unset" : "" }}
                />
              </motion.div>
              <motion.div //text container
                className="absolute flex flex-col text-center items-center gap-2 text-white"
                animate={isActive ? { top: "50%" } : { top: "70%" }}
              >
                <motion.h2 //name
                  className="font-bold wrap-break-word"
                  animate={
                    isActive
                      ? {
                          width: "78%",
                          fontSize: "70%",
                        }
                      : {
                          width: "70%",
                          fontSize: "65%",
                        }
                  }
                >
                  Butet Manurung
                </motion.h2>
                <motion.div //tubu, monding container
                  className={"flex flex-col text-center w-40 text-[50%]"}
                  animate={isActive ? { opacity: 100 } : { opacity: 0 }}
                >
                  <p>Tubu: dd MMM yyyy</p>
                  <p className=" text-[90%]">Monding: dd MMM yyyy</p>
                </motion.div>
              </motion.div>
            </motion.div>

            {isActive && (
              <div
                className="absolute flex justify-center gap-3 top-[150%] sm:z-20 left-[50%] -translate-x-1/2 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col w-45 sm:flex-row sm:w-[45vw] items-end sm:items-center sm:justify-end gap-5">
                  <motion.div //navigate button
                    className="flex flex-col justify-center items-center text-center size-20 sm:size-12 bg-my-white rounded-full"
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
                  <h2 className="text-right text-[23px] sm:order-first">
                    Klik tombol ini untuk melihat keturunan
                  </h2>
                </div>
                <div className="w-1 bg-my-black"></div>
                <div className="flex flex-col w-45 sm:flex-row sm:w-[45vw] items-start sm:items-center gap-5">
                  <motion.div //edit button
                    className=" flex flex-col justify-center items-center text-center size-20 sm:size-12 bg-my-white rounded-full"
                    whileTap={{ scale: 0.8 }}
                  >
                    <Pencil
                      color="var(--color-my-black)"
                      className="size-12 sm:size-8"
                    />
                  </motion.div>
                  <h2 className="text-left text-[23px]">
                    Klik tombol ini untuk mengganti data dan foto
                  </h2>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
        <motion.h2 className="text-xl">
          Klik foto untuk melihat detail
        </motion.h2>
      </div>

      <h1 className="font-bold text-xl">Menu navigasi</h1>
      <nav className="w-[98vw] bg-my-cream/80 backdrop-blur-md shadow-md">
        <div className="mx-auto px-2">
          <div className="flex justify-between items-center h-10">
            {/* Desktop Nav */}
            <div className="flex items-center space-x-2">
              <div className="flex flex-col justify-center items-center text-center">
                <Home color="var(--color-my-black)" size={20} />
              </div>
            </div>
            <div className="flex items-center space-x-2 text-my-black">
              <h2 className="text-sm font-bold text-brand-accent hover:text-brand-black transition-colors">
                Tarombo
              </h2>
              <h2 className="text-sm font-bold hover:text-brand-accent transition-colors">
                Tambah
              </h2>
            </div>
          </div>
        </div>
      </nav>
      <h1>Klik logo rumah untuk ke halaman utama</h1>
      <h1>Klik "Tarombo" untuk ke halaman tarombo utama</h1>
      <h1>
        Jika profil anda belum ada di tarombo, daftarkan diri anda dengan klik
        "Tambah"
      </h1>
    </section>
  );
}
