// import { useEffect, useState } from "react";
import Person from "./Person";

interface Members {
  pasangan: any[];
  anak: any[];
  posP: string[];
  posA: string[];
}

function Gen2({ isVisible = false, g2 = "", members = {} as Members }) {
  //   useEffect(() => {
  //     import(`../data/members/${g2}.json`)
  //       .then((module) => setMembers(module.default))
  //       .catch((error) => {
  //         // console.error("Error loading members json data:", error);
  //         setMembers({ pasangan: [], anak: [], posP: [], posA: [] });
  //       });
  //   }, [g2]);

  if (!members) {
    return null; // or a loading indicator
  }

  return (
    <>
      {/* pasangan */}
      <Person
        person={members.pasangan[0]}
        isVisible={isVisible}
        // transition={{ duration: 1, ease: "easeInOut" }}
        // animate={rg1act ? { top: 200, left: 1000 } : {}}
      ></Person>
      {members.pasangan.length > 1 && (
        <Person
          person={members.pasangan[1]}
          isVisible={isVisible}
          // transition={{ duration: 1, ease: "easeInOut" }}
        ></Person>
      )}

      {/* anak */}
      {members.anak &&
        members.anak.map((person) => (
          <Person
            key={person}
            person={person}
            isVisible={isVisible}
            // animate={rg1act ? { top: 200, left: 1000 } : {}}
          ></Person>
        ))}
    </>
  );
}

export default Gen2;
