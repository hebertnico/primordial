import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const LB = [
  "Horas ma di hita saluhutna.",
  "Di hamu ompung, tulang nantulang, amangboru namboru, amangtua/uda inangtua/uda, lae dohot ito, anggi dohot akang",
  "Sude na di hita pomparan ni Ompunta Raja Guna",
  "On pe tarombo nang tarbahen sian halongangan tu sistim panuratan pinompar halak batak on.",
  "Hubereng panuratan partuturan ni on songon na pomparan raja di Inggris (alai ninna hita halak batak on sude gellengni raja)",
  "Antong huhut mangisi tingki na marlas, gait-gait hubahen web ni on. Anggiat marlapatan.",
];
const LI = [
  "Salam untuk kita semuanya.",
  "Kepada kakek nenek, om tante, saudara-saudara sepantaran, adik dan kakak",
  "Kepada kita semua keluarga besar Ompung Raja Guna",
  "Berikut pohon keluarga yang dibuat dari kekaguman pada sistem pencatatan keturunan orang Batak.",
  "Kulihat pencatatan silsilah ini seperti keluarga kerajaan di Inggris (tapi ya katanya kita orang Batak semua keturunan raja)",
  "Maka sambil mengisi waktu luang, iseng-iseng saya buat web ini. Semoga bermanfaat.",
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
  const endLine = len <= 60 ? 0.7 - len / 250 : 0.82 - len / 250;
  // const endLine = len <= 30 ? (0.22 * len) / 10 : (0.5 * len) / 100;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", `start ${endLine}`],
  });
  const wordsB = line.split(" ");
  const wordsI = LI[idx].split(" ");

  return (
    <div className="mb-45">
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
function Section2() {
  return (
    <section className="relative flex flex-col h-[230vh] py-20 px-8  bg-my-cream text-my-black gap-1">
      {LB.map((line, idx) => {
        const sentenceLength = line.length;
        return (
          <Sentence key={idx} line={line} idx={idx} len={sentenceLength} />
        );
      })}
    </section>
  );
}

export default Section2;
