import { useEffect, useState } from "react";
import Person from "../components/Person";
import position from "../data/position.json" with { type: "json" };

import { AnimatePresence, motion, scale } from "motion/react";
import { useNodeStore } from "../store/nodeStore";
import { getChildren, getSpouses } from "../utils/treeHelpers";
import { useParams } from "react-router-dom";

function SpecialTree() {
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string>("");
  const [expandId, setExpandId] = useState<string>("");

  let { head = "" } = useParams();
  const nodes = useNodeStore((s) => s.nodes);
  const childrenMap = useNodeStore((s) => s.childrenMap);

  const famHead = nodes[head];
  const spouse = getSpouses(nodes, head);
  const fam1 = getChildren(nodes, childrenMap, spouse[0].id);
  const fam2 = getChildren(nodes, childrenMap, spouse[1].id);

  const [posA, setPosA] = useState<string[]>([]);
  const [posB, setPosB] = useState<string[]>([]);

  useEffect(() => {
    if (fam1.length == 2 && fam2.length == 7) {
      setPosA(position.children[10]?.position);
      setPosB(position.children[11]?.position);
      setLoading(false);
    }
    if (fam1.length == 7 && fam2.length == 2) {
      setPosA(position.children[11]?.position);
      setPosB(position.children[10]?.position);
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative m-auto overflow-x-hidden overflow-y-hidden">
      {/* <AnimatePresence mode="popLayout"> */}
      {/* <div className="absolute flex items-center justify-center left-50 bottom-0 bg-yellow-300 w-1 h-100" /> */}

      <AnimatePresence mode="sync">
        {famHead && ( //head
          <motion.div
            key={famHead.id}
            className="absolute top-[50vh] left-[50vw] w-47 h-32 sm:top-[46vh] sm:w-40 sm:h-40 -translate-1/2"
            style={{ zIndex: famHead.id === activeId ? 40 : 20 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            exit={{ opacity: 0 }}
            whileHover={{ zIndex: 40 }}
            onClick={() =>
              famHead.id === activeId
                ? setActiveId("")
                : setActiveId(famHead.id)
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
              key={spouse[0]?.id}
              className="absolute top-[36vh] left-[50vw] sm:top-[46vh] sm:left-[27vw] w-40 h-38 sm:w-38 sm:h-38 -translate-1/2"
              style={{ zIndex: spouse[0].id === activeId ? 40 : 10 }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
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
            <motion.div
              key={spouse[1]?.id}
              className="absolute bottom-[37vh] left-[50vw] w-40 h-38 sm:bottom-[54vh] sm:left-[73vw] sm:w-38 sm:h-38 -translate-x-1/2 translate-y-1/2"
              style={{ zIndex: spouse[1].id === activeId ? 40 : 10 }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
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
          </div>
        )}
        {!loading && //fam1
          fam1?.map((person: any) => (
            <motion.div
              layoutId={person.id}
              onLayoutAnimationComplete={() => setExpandId("RSRP")}
              // ref={(el) => {
              //   zRef.current[index] = el;
              // }}
              key={person.id}
              className={`${posA[person.sibOrder - 1]} absolute`}
              style={{ zIndex: person.id === activeId ? 40 : 10 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              exit={{ opacity: 0 }}
              whileHover={{ zIndex: 40 }}
              onClick={() =>
                person.id === activeId
                  ? setActiveId("")
                  : setActiveId(person.id)
              }
            >
              <Person
                id={person.id}
                expanded={expandId}
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
                  person.monding
                    ? new Date(person.monding).toLocaleDateString("id-ID", {
                        dateStyle: "medium",
                      })
                    : ""
                }
                hasFam={person.spouse?.length}
                isActive={person.id === activeId ? true : false}
              />
            </motion.div>
          ))}
        {!loading && //fam2
          fam2?.map((person: any) => (
            <motion.div
              layoutId={person.id}
              onLayoutAnimationComplete={() => setExpandId("RSRP")}
              // ref={(el) => {
              //   zRef.current[index] = el;
              // }}
              key={person.id}
              className={`${posB[person.sibOrder - 1]} absolute`}
              style={{ zIndex: person.id === activeId ? 40 : 10 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              exit={{ opacity: 0 }}
              whileHover={{ zIndex: 40 }}
              onClick={() =>
                person.id === activeId
                  ? setActiveId("")
                  : setActiveId(person.id)
              }
            >
              <Person
                id={person.id}
                expanded={expandId}
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
                  person.monding
                    ? new Date(person.monding).toLocaleDateString("id-ID", {
                        dateStyle: "medium",
                      })
                    : ""
                }
                hasFam={person.spouse?.length}
                isActive={person.id === activeId ? true : false}
              />
            </motion.div>
          ))}
      </AnimatePresence>

      <AnimatePresence>
        {activeId !== "" && (
          <motion.div
            className="fixed h-screen w-screen bg-my-black/75 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setActiveId("")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default SpecialTree;
