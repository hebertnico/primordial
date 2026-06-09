import { useEffect, useState } from "react";
import Person from "../components/Person";
import position from "../data/position.json" with { type: "json" };

import { AnimatePresence, motion, scale } from "motion/react";
import { useNodeStore } from "../store/nodeStore";
import { getChildren, getSpouses } from "../utils/treeHelpers";

let posA: string[] = [];
let posB: string[] = [];
function MainTree() {
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string>("");

  const nodes = useNodeStore((s) => s.nodes);
  const childrenMap = useNodeStore((s) => s.childrenMap);

  const famHead = nodes["RSRP"];
  const spouse = getSpouses(nodes, "RSRP");
  const rg1 = getChildren(nodes, childrenMap, "SSs");
  const rg2 = getChildren(nodes, childrenMap, "SNs");

  // let { head = "" } = useParams();
  // const [posA, setPosA] = useState<string[]>([]);
  // const [posB, setPosB] = useState<string[]>([]);

  // const dtb = new Date(famHead.tubu ?? "");

  useEffect(() => {
    if (rg1.length > 0 && rg2.length > 0) {
      // setPosA(position.children[8]?.position);
      // setPosB(position.children[9]?.position);
      posA = position.children[8]?.position;
      posB = position.children[9]?.position;
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative m-auto overflow-x-hidden overflow-y-hidden">
      {/* <AnimatePresence mode="popLayout"> */}
      {/* <div className="absolute flex items-center justify-center left-50 bottom-0 bg-yellow-300 w-1 h-100" /> */}

      {/* <AnimatePresence mode="popLayout"> */}
      {famHead && ( //head
        <motion.div
          key={famHead.id}
          className="absolute top-[50vh] left-[50vw] w-[40vw] h-[30vw] max-w-100 sm:left-50 sm:size-60 -translate-1/2"
          style={{ zIndex: famHead.id === activeId ? 40 : 10 }}
          animate={{}}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
          whileHover={{ zIndex: 40 }}
          onClick={() =>
            famHead.id === activeId ? setActiveId("") : setActiveId(famHead.id)
          }
        >
          <Person
            id={famHead.id}
            person={famHead.name}
            sex={famHead.sex}
            photo={famHead.image ?? ""}
            tubu={
              famHead.tubu
                ? new Date(famHead.tubu).toLocaleDateString("id-ID", {
                    dateStyle: "medium",
                  })
                : ""
            }
            monding={
              famHead.monding
                ? new Date(famHead.monding).toLocaleDateString("id-ID", {
                    dateStyle: "medium",
                  })
                : ""
            }
            isActive={famHead.id === activeId ? true : false}
          />
        </motion.div>
      )}
      {spouse && ( //spouse
        <div>
          <motion.div
            key={spouse[1]?.id}
            className="absolute top-[37vh] left-[50vw] sm:right-50 size-32 sm:size-60 -translate-1/2"
            style={{ zIndex: spouse[1].id === activeId ? 40 : 10 }}
            animate={{}}
            initial={{ x: 0, y: 0 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ zIndex: 40 }}
            onClick={() =>
              spouse[1].id === activeId
                ? setActiveId("")
                : setActiveId(spouse[1].id)
            }
          >
            <Person
              id={spouse[1]?.id}
              person={spouse[1]?.name}
              sex={spouse[1]?.sex}
              photo={spouse[1]?.image ?? ""}
              tubu={
                spouse[1].tubu
                  ? new Date(spouse[1].tubu).toLocaleDateString("id-ID", {
                      dateStyle: "medium",
                    })
                  : ""
              }
              monding={
                spouse[1].monding
                  ? new Date(spouse[1].monding).toLocaleDateString("id-ID", {
                      dateStyle: "medium",
                    })
                  : ""
              }
              isActive={spouse[1].id === activeId ? true : false}
            />
          </motion.div>
          <motion.div
            key={spouse[0]?.id}
            className="absolute bottom-[37vh] left-[50vw] sm:right-50 size-32 sm:size-60 -translate-x-1/2 translate-y-1/2"
            style={{ zIndex: spouse[0].id === activeId ? 40 : 10 }}
            // initial={{x:0, y:0}}
            animate={{}}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ zIndex: 40 }}
            onClick={() =>
              spouse[0].id === activeId
                ? setActiveId("")
                : setActiveId(spouse[0].id)
            }
          >
            <Person
              id={spouse[0]?.id}
              person={spouse[0]?.name}
              sex={spouse[0]?.sex}
              photo={spouse[0]?.image ?? ""}
              tubu={
                spouse[0].tubu
                  ? new Date(spouse[0].tubu).toLocaleDateString("id-ID", {
                      dateStyle: "medium",
                    })
                  : ""
              }
              monding={
                spouse[0].monding
                  ? new Date(spouse[0].monding).toLocaleDateString("id-ID", {
                      dateStyle: "medium",
                    })
                  : ""
              }
              isActive={spouse[0].id === activeId ? true : false}
            />
          </motion.div>
        </div>
      )}
      {!loading && //rg1
        rg1?.map((person: any) => (
          <motion.div
            layout
            // ref={(el) => {
            //   zRef.current[index] = el;
            // }}
            key={person.id}
            className={`${posA[person.sibOrder - 1]} absolute`}
            style={{ zIndex: person.id === activeId ? 40 : 10 }}
            // initial={{ x: 0, y: 0 }}
            animate={{}}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ zIndex: 40 }}
            onClick={() =>
              person.id === activeId ? setActiveId("") : setActiveId(person.id)
            }
          >
            <Person
              id={person.id}
              person={person.name}
              childnum={person.sibOrder}
              sex={person.sex}
              photo={person.image}
              tubu={
                person.tubu
                  ? new Date(person.tubu).toLocaleDateString("id-ID", {
                      dateStyle: "medium",
                    })
                  : ""
              }
              monding={
                person.tubu
                  ? new Date(person.monding).toLocaleDateString("id-ID", {
                      dateStyle: "medium",
                    })
                  : ""
              }
              hasFam={person.spouse ? true : false}
              isActive={person.id === activeId ? true : false}
            />
          </motion.div>
        ))}
      {!loading && //rg2
        rg2?.map((person: any) => (
          <motion.div
            layout
            // ref={(el) => {
            //   zRef.current[index] = el;
            // }}
            key={person.id}
            className={`${posB[person.sibOrder - 1]} absolute`}
            style={{ zIndex: person.id === activeId ? 40 : 10 }}
            // initial={{ x: "50vw", y: "50vh" }}
            animate={{}}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ zIndex: 40 }}
            onClick={() =>
              person.id === activeId ? setActiveId("") : setActiveId(person.id)
            }
          >
            <Person
              id={person.id}
              person={person.name}
              childnum={person.sibOrder}
              sex={person.sex}
              photo={person.image}
              tubu={new Date(person.tubu ?? "").toLocaleDateString("id-ID", {
                dateStyle: "medium",
              })}
              monding={new Date(person.monding ?? "").toLocaleDateString(
                "id-ID",
                {
                  dateStyle: "medium",
                },
              )}
              hasFam={person.spouse ? true : false}
              isActive={person.id === activeId ? true : false}
            />
          </motion.div>
        ))}

      {activeId !== "" && (
        <motion.div
          className="fixed h-screen w-screen bg-my-black/75 z-30"
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          onClick={() => setActiveId("")}
        />
      )}
    </div>
  );
}

export default MainTree;
