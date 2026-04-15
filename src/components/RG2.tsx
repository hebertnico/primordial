import { useEffect, useState, type ComponentProps } from "react";
import Person from "./Person";
import Gen1 from "./Gen1";

type RG2Props = ComponentProps<typeof Person> & {
  rg2act: boolean;
  rg1act: boolean;
  onSendData: (data: boolean) => void;
};
function RG2({ onSendData, rg1act, rg2act, ...props }: RG2Props) {
  const [gen1, setGen1] = useState("none");
  const [activeFam, setActiveFam] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const gen1Names = [
    "sondang",
    "nuraya",
    "togi",
    "mangihut",
    "ojak",
    "tulus",
    "rosintauli",
    "lamtiur",
    "kristina",
  ];

  const handleGen1Click = (name: string) => {
    if (gen1 === name) {
      setGen1("none");
      setActiveFam([true, true, true, true, true, true, true, true, true]);
      onSendData(false);
      history.replaceState({ page: "rg2" }, "", "/rg2");
    } else {
      setGen1(name);
      const newActiveFam = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ];
      newActiveFam[gen1Names.indexOf(name)] = true;
      setActiveFam(newActiveFam);
      onSendData(true);
      history.pushState({ page: "rg2", person: name }, "", `/rg2/${name}`);
    }
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setGen1("none");
      setActiveFam([true, true, true, true, true, true, true, true, true]);
      onSendData(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <>
      <Person
        {...props}
        person="SnP"
        classname="absolute top-22 left-185"
        size="size-[18vh]"
        animate={{
          ...(rg2act ? { top: 150, left: 120 } : {}),
          ...(gen1 === "sondang" ? { scale: 1.4, top: "50vh", left: 550 } : {}),
        }}
        onClick={() => handleGen1Click("sondang")}
        isVisible={activeFam[gen1Names.indexOf("sondang")] && !rg1act}
      />
      <Person
        {...props}
        person="NrP"
        classname="absolute top-22 left-220"
        size="size-[18vh]"
        animate={{
          ...(rg2act ? { top: 100, left: 350 } : {}),
          ...(gen1 === "nuraya" ? { scale: 1.4, top: "160px", left: 550 } : {}),
        }}
        onClick={() => handleGen1Click("nuraya")}
        isVisible={activeFam[gen1Names.indexOf("nuraya")] && !rg1act}
      />
      <Person
        {...props}
        person="TgP"
        classname="absolute top-24 left-253"
        size="size-[18vh]"
        animate={{
          ...(rg2act ? { top: 100, left: 950 } : {}),
          ...(gen1 === "togi" ? { scale: 1.4, top: "160px", left: 550 } : {}),
        }}
        onClick={() => handleGen1Click("togi")}
        isVisible={activeFam[gen1Names.indexOf("togi")] && !rg1act}
      />
      <Person
        {...props}
        person="MnP"
        classname="absolute top-32 left-286"
        size="size-[18vh]"
        animate={{
          ...(rg2act ? { top: 150, left: 1180 } : {}),
          ...(gen1 === "mangihut"
            ? { scale: 1.4, top: "160px", left: 550 }
            : {}),
        }}
        onClick={() => handleGen1Click("mangihut")}
        isVisible={activeFam[gen1Names.indexOf("mangihut")] && !rg1act}
      />
      <Person
        {...props}
        person="OP"
        classname="absolute top-[50vh] left-300"
        size="size-[18vh]"
        animate={{
          ...(rg2act ? { top: 330, left: 1060 } : {}),
          ...(gen1 === "ojak" ? { scale: 1.4, top: "160px", left: 550 } : {}),
        }}
        onClick={() => handleGen1Click("ojak")}
        isVisible={activeFam[gen1Names.indexOf("ojak")] && !rg1act}
      />
      <Person
        {...props}
        person="TuP"
        classname="absolute top-105 left-286"
        size="size-[18vh]"
        animate={{
          ...(rg2act ? { top: 440, left: 875 } : {}),
          ...(gen1 === "tulus" ? { scale: 1.4, top: "160px", left: 550 } : {}),
        }}
        onClick={() => handleGen1Click("tulus")}
        isVisible={activeFam[gen1Names.indexOf("tulus")] && !rg1act}
      />
      <Person
        {...props}
        person="RsP"
        classname="absolute top-115 left-253"
        size="size-[18vh]"
        animate={{
          ...(rg2act ? { top: 468, left: 650 } : {}),
          ...(gen1 === "rosintauli"
            ? { scale: 1.4, top: "160px", left: 550 }
            : {}),
        }}
        onClick={() => handleGen1Click("rosintauli")}
        isVisible={activeFam[gen1Names.indexOf("rosintauli")] && !rg1act}
      />
      <Person
        {...props}
        person="LmP"
        classname="absolute top-117 left-220"
        size="size-[18vh]"
        animate={{
          ...(rg2act ? { top: 440, left: 425 } : {}),
          ...(gen1 === "lamtiur"
            ? { scale: 1.4, top: "160px", left: 550 }
            : {}),
        }}
        onClick={() => handleGen1Click("lamtiur")}
        isVisible={activeFam[gen1Names.indexOf("lamtiur")] && !rg1act}
      />
      <Person
        {...props}
        person="KMP"
        classname="absolute top-117 left-185"
        size="size-[18vh]"
        animate={{
          ...(rg2act ? { top: 330, left: 240 } : {}),
          ...(gen1 === "kristina"
            ? { scale: 1.4, top: "160px", left: 550 }
            : {}),
        }}
        onClick={() => handleGen1Click("kristina")}
        isVisible={activeFam[gen1Names.indexOf("kristina")] && !rg1act}
      />
      <Gen1 isVisible={activeFam[gen1Names.indexOf(gen1)]} g1={gen1} />
    </>
  );
}

export default RG2;
