import { useEffect, useState, type ComponentProps } from "react";
import Person from "./Person";
import Gen1 from "./Gen1";

type RG1Props = ComponentProps<typeof Person> & {
  rg1act: boolean;
  rg2act: boolean;
  onSendData: (data: boolean) => void;
};
function RG1({ onSendData, rg1act, rg2act, ...props }: RG1Props) {
  const [gen1, setGen1] = useState("none");
  const [gen2Act, setGen2Act] = useState(false);
  const [activeFam, setActiveFam] = useState([
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
    "naudur",
    "kadirun",
    "lemeria",
    "safina",
    "toise",
    "rapina",
    "lisnawati",
    "norita",
  ];
  const handleGen2Click = (data: boolean) => {
    setGen2Act(data);
  };

  const handleGen1Click = (name: string) => {
    if (gen1 === name) {
      setGen1("none");
      setActiveFam([true, true, true, true, true, true, true, true]);
      onSendData(false);
      history.replaceState({ page: "rg1" }, "", "/rg1");
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
      ];
      newActiveFam[gen1Names.indexOf(name)] = true;
      setActiveFam(newActiveFam);
      onSendData(true);
      history.pushState({ page: "rg1", person: name }, "", `/rg1/${name}`);
    }
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // const state = event.state as { page?: string; person?: string } | null;
      setGen1("none");
      setActiveFam([true, true, true, true, true, true, true, true]);
      onSendData(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <>
      <Person
        {...props}
        person="NP"
        classname="absolute top-22 left-130"
        size="size-[18vh]"
        animate={{
          ...(rg1act ? { top: 200, left: 1000 } : {}),
          ...(gen1 === "naudur" ? { scale: 1.4, top: "160px", left: 550 } : {}),
        }}
        onClick={() => handleGen1Click("naudur")}
        isVisible={activeFam[gen1Names.indexOf("naudur")] && !rg2act}
      />

      <Person
        {...props}
        person="KP"
        classname="absolute top-22 left-92"
        size="size-[18vh]"
        animate={{
          ...(rg1act ? { top: 100, left: 850 } : {}),
          ...(gen1 === "kadirun" ? { scale: 1.4, top: "50vh", left: 750 } : {}),
        }}
        onClick={() => handleGen1Click("kadirun")}
        isVisible={activeFam[gen1Names.indexOf("kadirun")] && !rg2act}
      />

      <Person
        {...props}
        person="LP"
        classname="absolute top-28 left-54"
        size="size-[18vh]"
        animate={{
          ...(rg1act ? { top: 100, left: 430 } : {}),
          ...(gen1 === "lemeria" ? { scale: 1.4, top: "50vh", left: 520 } : {}),
        }}
        onClick={() => handleGen1Click("lemeria")}
        isVisible={activeFam[gen1Names.indexOf("lemeria")] && !rg2act}
      />

      <Person
        {...props}
        person="SP"
        classname="absolute top-42 left-20"
        size="size-[18vh]"
        animate={{
          ...(rg1act ? { top: 200, left: 280 } : {}),
          ...(gen1 === "safina" ? { scale: 1.4, top: "50vh", left: 550 } : {}),
        }}
        onClick={() => handleGen1Click("safina")}
        isVisible={
          activeFam[gen1Names.indexOf("safina")] && !rg2act && !gen2Act
        }
      />

      <Person
        {...props}
        person="TP"
        classname="absolute top-95 left-20"
        size="size-[18vh]"
        animate={{
          ...(rg1act ? { top: 370, left: 280 } : {}),
          ...(gen1 === "toise" ? { scale: 1.4, top: "50vh", left: 550 } : {}),
        }}
        onClick={() => handleGen1Click("toise")}
        isVisible={activeFam[gen1Names.indexOf("toise")] && !rg2act}
      />

      <Person
        {...props}
        person="RP"
        classname="absolute top-110 left-54"
        size="size-[18vh]"
        animate={{
          ...(rg1act ? { top: 451, left: 430 } : {}),
          ...(gen1 === "rapina" ? { scale: 1.4, top: "50vh", left: 550 } : {}),
        }}
        onClick={() => handleGen1Click("rapina")}
        isVisible={activeFam[gen1Names.indexOf("rapina")] && !rg2act}
      />

      <Person
        {...props}
        person="LP"
        classname="absolute top-115 left-92"
        size="size-[18vh]"
        animate={{
          ...(rg1act ? { top: 451, left: 850 } : {}),
          ...(gen1 === "lisnawati"
            ? { scale: 1.4, top: "50vh", left: 550 }
            : {}),
        }}
        onClick={() => handleGen1Click("lisnawati")}
        isVisible={activeFam[gen1Names.indexOf("lisnawati")] && !rg2act}
      />

      <Person
        {...props}
        person="NP"
        classname="absolute top-115 left-130"
        size="size-[18vh]"
        animate={{
          ...(rg1act ? { top: 370, left: 1000 } : {}),
          ...(gen1 === "norita" ? { scale: 1.4, top: "160px", left: 550 } : {}),
        }}
        onClick={() => handleGen1Click("norita")}
        isVisible={activeFam[gen1Names.indexOf("norita")] && !rg2act}
      />

      <Gen1
        isVisible={activeFam[gen1Names.indexOf(gen1)]}
        g1={gen1}
        onGen2Click={handleGen2Click}
      />
    </>
  );
}

export default RG1;
