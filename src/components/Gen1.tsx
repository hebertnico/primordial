import { useEffect, useState } from "react";
import Person from "./Person";
import Gen2 from "./Gen2";

function Gen1({
  isVisible = false,
  g1 = "",
  onGen2Click = (data: boolean) => {},
}) {
  const [members, setMembers] = useState({
    pasangan: [],
    anak: [],
    posP: [],
    posA: [],
    fam: [],
  });
  const [gen2, setGen2] = useState("none");
  const [famGen2, setFamGen2] = useState({
    pasangan: [],
    anak: [],
    posP: [],
    posA: [],
    fam: [],
  });
  const [gen2Visible, setGen2Visible] = useState(false);

  const handleGen2Click = (name: string, fam: any) => {
    if (gen2 === name) {
      setGen2("none");
      setFamGen2({ pasangan: [], anak: [], posP: [], posA: [], fam: [] });
      onGen2Click(false);
      setGen2Visible(false);
      history.replaceState({ page: "rg1", person: g1 }, "", `/rg1/${g1}`);
    } else {
      onGen2Click(true);
      setGen2Visible(true);
      setGen2(name);
      setFamGen2(fam);
      history.pushState(
        { page: "rg1", person: g1, gen2: name },
        "",
        `/rg1/${g1}/${name}`,
      );
    }
  };

  useEffect(() => {
    import(`../data/members/${g1}.json`)
      .then((module) => setMembers(module.default))
      .catch((error) => {
        // console.error("Error loading members json data:", error);
        setMembers({ pasangan: [], anak: [], posP: [], posA: [], fam: [] });
      });
  }, [g1]);

  if (!members) {
    return null; // or a loading indicator
  }

  return (
    <>
      {/* pasangan */}
      <Person
        person={members.pasangan[0]}
        isVisible={isVisible && !gen2Visible}
        // animate={rg1act ? { top: 200, left: 1000 } : {}}
      ></Person>
      {members.pasangan.length > 1 && (
        <Person
          person={members.pasangan[1]}
          isVisible={isVisible && !gen2Visible}
        ></Person>
      )}

      {/* anak */}
      {members.anak &&
        members.anak.map((person) => (
          <Person
            key={person}
            person={person}
            isVisible={isVisible && (!gen2Visible || gen2 === person)}

            // animate={rg1act ? { top: 200, left: 1000 } : {}}
          ></Person>
        ))}
      <Gen2 g2={gen2} isVisible={gen2Visible} members={famGen2} />
    </>
  );
}

export default Gen1;
