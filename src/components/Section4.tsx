import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const LB = [
  "Sititi ma sigompa",
  "Golang-golang pangarahutna",
  "Boti ma tarombo na tarpatupa",
  "Pangido maap anggo adong hasalaan panuratanna",
];
const LI = [
  "Pahat penyadap getah kemenyan",
  "Gelang-gelang besi jadi pengikatnya",
  "Demikianlah pohon keluarga yang tersedia",
  "Mohon maaf jika ada kesalahan penulisannya",
];

const Letter = ({
  char,
  progress,
  range,
}: {
  char: string;
  progress: any;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

const Word = ({
  word,
  progress,
  range,
}: {
  word: string;
  progress: any;
  range: [number, number];
}) => {
  const characters = word.split("");
  const amount = range[1] - range[0];
  const step = amount / characters.length;

  return (
    <span className="relative inline-block mr-3">
      {characters.map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;
        return (
          <Letter
            key={i}
            char={char}
            progress={progress}
            range={[start, end]}
          />
        );
      })}
    </span>
  );
};

const Sentence = ({
  line,
  idx,
  len,
}: {
  line: string;
  idx: number;
  len: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const endLine = len <= 60 ? 0.8 - len / 250 : 0.82 - len / 250;
  // const endLine = len <= 30 ? (0.22 * len) / 10 : (0.5 * len) / 100;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", `start ${endLine}`],
  });
  const wordsB = line.split(" ");
  const wordsI = LI[idx].split(" ");

  return (
    <div className="mt-15">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <div className="flex flex-wrap text-2xl font-bold leading-tight justify-center">
          {wordsB.map((word, i) => {
            const start = i / wordsB.length;
            const end = (i + 1) / wordsB.length;
            return (
              <Word
                key={idx * i + i + "B"}
                word={word}
                progress={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </div>
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap text-xl font-bold leading-tight opacity-60 justify-center">
          {wordsI.map((word, i) => {
            const start = i / wordsI.length;
            const end = (i + 1) / wordsI.length;
            return (
              <Word
                key={idx * i + i + "I"}
                word={word}
                progress={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
function Section4() {
  const navigate = useNavigate();

  return (
    <div className="h-min-[60vh]">
      <section className="relative flex flex-col h-[80vh] sm:h-[95vh] pt-5 px-8  bg-my-cream text-my-black gap-1">
        {LB.map((line, idx) => {
          const sentenceLength = line.length;
          return (
            <Sentence key={idx} line={line} idx={idx} len={sentenceLength} />
          );
        })}
      </section>
      <section className="relative flex flex-col items-center h-[45vh] py-20 px-8  bg-my-cream text-my-black gap-5">
        <h1 className="font-bold text-lg">
          Klik di sini untuk mulai berkeliling
        </h1>
        <motion.div //navigate button
          className="flex flex-col min-w-35 min-h-10 p-2 justify-center items-center text-center bg-my-white rounded-full"
          onClick={() => navigate("/RSRP")}
          whileTap={{ scale: 0.8 }}
        >
          Buka Tarombo
        </motion.div>
      </section>
    </div>
  );
}

export default Section4;
