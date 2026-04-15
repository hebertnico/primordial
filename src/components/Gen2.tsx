import { useEffect, useState } from "react";
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
        classname={`absolute ${members.posP[0]} scale-140`}
        size="size-[18vh]"
        isVisible={isVisible}
        animate={{ x: 0 }}
        initial={{ x: -90 }}
        exit={{ opacity: 0, x: -90 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        // animate={rg1act ? { top: 200, left: 1000 } : {}}
      ></Person>
      {members.pasangan.length > 1 && (
        <Person
          person={members.pasangan[1]}
          classname={`absolute ${members.posP[1]} scale-140`}
          size="size-[18vh]"
          isVisible={isVisible}
          animate={{ x: 0 }}
          initial={{ x: 90 }}
          exit={{ opacity: 0, x: 90 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        ></Person>
      )}

      {/* anak */}
      {members.anak &&
        members.anak.map((person) => (
          <Person
            key={person}
            person={person}
            classname={`absolute ${members.posA[members.anak.indexOf(person)]}`}
            size="size-[22vh]"
            isVisible={isVisible}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            // animate={rg1act ? { top: 200, left: 1000 } : {}}
          ></Person>
        ))}
    </>
  );
}

export default Gen2;
