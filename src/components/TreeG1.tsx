import { useEffect, useState } from "react";
import Person from "./Person";
import { Outlet, useParams } from "react-router-dom";
import position from "../data/position.json" with { type: "json" };

function TreeG1() {
  const [members, setMembers] = useState<Record<string, any>>({});

  let { head } = useParams();
  const [posA, setPosA] = useState<string[]>([]);
  const [offspring, setOffspring] = useState(0);

  console.log(offspring);

  useEffect(() => {
    import(`../data/members/${head}.json`)
      .then((module) => {
        setMembers(module.default);
      })
      .catch((error) => {
        console.error("Error loading members json data:", error);
        setMembers({});
        setPosA([]);
      });
  }, [head]);

  useEffect(() => {
    setPosA(
      members.G2 ? position.children[members.G2.length - 1].position : [],
    );
  }, [members]);

  return (
    <>
      <div className="h-screen relative mx-auto overflow-x-hidden overflow-y-hidden">
        {members.G1 && (
          <Person
            key={members.G1.id}
            person={members.G1.name}
            size="lg:size-[10vw] md:size-[15vw] size-[20vw]"
            classname="top-[42vh] md:top-[35vh] left-[30%] md:left-[40%]"
          />
        )}
        {members.SG1 && (
          <Person
            key={members.SG1.id}
            person={members.SG1.name}
            size="lg:size-[10vw] md:size-[15vw] size-[20vw]"
            classname="top-[42vh] md:top-[35vh] left-[70%] md:left-[60%]"
          />
        )}
        {members.G2 &&
          members.G2.map((person: any) => (
            <Person
              key={person.id}
              person={person.name}
              size="lg:size-[10vw] md:size-[15vw] size-[20vw]"
              classname={`${posA[members.G2.indexOf(person)]}`}
              onClick={() => setOffspring(members.G2.indexOf(person) + 1)}
            />
          ))}
        {offspring > 0 && <Outlet context={members.G2[offspring - 1]} />}
      </div>
    </>
  );
}

export default TreeG1;
