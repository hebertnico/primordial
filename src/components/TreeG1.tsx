import { useEffect, useRef, useState } from "react";
import Person from "./Person";
import { Outlet, useParams } from "react-router-dom";
import position from "../data/position.json" with { type: "json" };

function TreeG1() {
  const [members, setMembers] = useState<Record<string, any>>({});

  let { head } = useParams();
  const [posA, setPosA] = useState<string[]>([]);
  const [offspring, setOffspring] = useState(0);

  const zRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleZ = (index = 0, toggle = false) => {
    if (!zRef.current[index]) return;
    if (toggle)
      zRef.current[index].setAttribute(
        "data-toggled",
        zRef.current[index].getAttribute("data-toggled") === "false"
          ? "true"
          : "false",
      );
    else
      zRef.current[index].style.zIndex =
        zRef.current[index].getAttribute("data-toggled") === "true"
          ? "50"
          : "10";
    // zRef.current[index]?.style.zIndex === "10" ? "50" : "10";
    // console.log(zRef.current[index].style.zIndex);
  };

  // console.log(offspring);

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
          <div
            // ref={zRef}
            className="absolute top-[50vh] left-[27vw] sm:left-[37vw] size-[40vw] sm:size-[20vw] -translate-1/2"
            style={{ zIndex: 10 }}
            // onClick={handleZ}
          >
            <Person
              key={members.G1.id}
              person={members.G1.name}
              // size="lg:size-[10vw] md:size-[20vw] size-[20vw]"
              // classname="top-[42vh] md:top-[35vh] left-[30%] md:left-[40%]"
            />
          </div>
        )}
        {members.SG1 && (
          <div className="absolute top-[50vh] sm:left-[63vw] left-[73vw] size-[40vw] sm:size-[20vw] -translate-1/2">
            <Person
              key={members.SG1.id}
              person={members.SG1.name}
              // size="lg:size-[10vw] md:size-[20vw] size-[20vw]"
              // classname="top-[42vh] md:top-[35vh] left-[70%] md:left-[60%]"
            />
          </div>
        )}
        {members.G2 &&
          members.G2.map((person: any, index: any) => {
            return (
              <div
                ref={(el) => {
                  zRef.current[index] = el;
                }}
                key={person.id}
                className={`${posA[members.G2.indexOf(person)]} absolute size-[32vw] sm:size-30 -translate-1/2`}
                style={{ zIndex: 10 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.zIndex = "50";
                  // console.log(e.currentTarget.style.zIndex);
                }}
                onClick={() => {
                  handleZ(index, true);
                }}
                onMouseLeave={() => {
                  handleZ(index);
                }}
                data-toggled="false">
                <Person
                  person={person.name}
                  childnum={index + 1}
                  // size="lg:size-[10vw] md:size-[20vw] size-[20vw]"
                  // classname={`${posA[members.G2.indexOf(person)]}`}
                  // onClick={() => setOffspring(members.G2.indexOf(person) + 1)}
                />
              </div>
            );
          })}
        {offspring > 0 && <Outlet context={members.G2[offspring - 1]} />}
      </div>
    </>
  );
}

export default TreeG1;
