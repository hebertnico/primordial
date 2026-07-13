import { useEffect, useState } from "react";
import Person from "../components/Person";
import position from "../data/position.json" with { type: "json" };

import { AnimatePresence, motion } from "motion/react";
import { useNodeStore } from "../store/nodeStore";
import { getChildren, getSpouses } from "../utils/treeHelpers";

function MainTree({ isDesktop = false }) {
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string>("");
  const [expandId, setExpandId] = useState<string>("");

  const nodes = useNodeStore((s) => s.nodes);
  const childrenMap = useNodeStore((s) => s.childrenMap);

  const famHead = nodes["RSRP"];
  const spouse = getSpouses(nodes, "RSRP");
  const rg1 = getChildren(nodes, childrenMap, "SSs");
  const rg2 = getChildren(nodes, childrenMap, "SNs");

  const [posA, setPosA] = useState<string[]>([]);
  const [posB, setPosB] = useState<string[]>([]);

  useEffect(() => {
    if (rg1.length > 0 && rg2.length > 0) {
      setPosA(position.children[8]?.position);
      setPosB(position.children[9]?.position);
      setLoading(false);
    }
  }, []);

  return (
    <div className="h-screen relative m-auto overflow-hidden">
      {/* <AnimatePresence mode="popLayout"> */}
      {/* <div className="absolute flex items-center justify-center left-50 bottom-0 bg-yellow-300 w-1 h-100" /> */}

      <AnimatePresence mode="sync">
        {famHead && ( //head
          <motion.div
            key={famHead.id}
            className="absolute flex place-content-center top-[50vh] left-[50vw] w-47 h-32 sm:w-[40vh] sm:h-[40vh] -translate-1/2"
            style={{ zIndex: famHead.id === activeId ? 40 : 20 }}
            initial={{ opacity: 0 }}
            animate={
              famHead.id === activeId
                ? isDesktop
                  ? {
                      opacity: 1,
                      scale: 1.25,
                    }
                  : {
                      // top: "50vh",
                      // left: "50vw",
                      height: "40vw",
                      width: "40vw",
                      opacity: 1,
                    }
                : {
                    opacity: 1,
                  }
            }
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
              isDesktop={isDesktop}
              isActive={famHead.id === activeId ? true : false}
            />
          </motion.div>
        )}
        {spouse && ( //spouse
          <div>
            <motion.div
              layout
              key={spouse[0]?.id}
              className="absolute flex place-content-center top-[36vh] left-[50vw] sm:top-[50vh] sm:left-[27vw] size-[40vw] sm:size-[35vh] -translate-1/2"
              style={
                spouse[0].id === activeId ? { zIndex: 40 } : { zIndex: 10 }
              }
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={
                spouse[0].id === activeId
                  ? isDesktop
                    ? {
                        opacity: 1,
                        height: "50vh",
                        width: "50vh",
                      }
                    : {
                        // top: "50vh",
                        // left: "50vw",
                        y: "14vh",
                        // height: "40vw",
                        // width: "40vw",
                        opacity: 1,
                      }
                  : {
                      opacity: 1,
                    }
              }
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
                isDesktop={isDesktop}
                isActive={spouse[0].id === activeId ? true : false}
              />
            </motion.div>
            <motion.div
              key={spouse[1]?.id}
              className="absolute flex place-content-center top-[64vh] left-[50vw] size-[40vw] sm:top-[50vh] sm:left-[73vw] sm:size-[35vh] -translate-1/2"
              style={{ zIndex: spouse[1].id === activeId ? 40 : 10 }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={
                spouse[1].id === activeId
                  ? isDesktop
                    ? {
                        opacity: 1,
                        height: "50vh",
                        width: "50vh",
                      }
                    : {
                        // top: "50vh",
                        // left: "50vw",
                        // height: "40vw",
                        // width: "40vw",
                        y: "-14vh",
                        opacity: 1,
                      }
                  : {
                      opacity: 1,
                    }
              }
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
                isDesktop={isDesktop}
                isActive={spouse[1].id === activeId ? true : false}
              />
            </motion.div>
          </div>
        )}
        {!loading && //rg1
          rg1?.map((person: any) => (
            <motion.div
              layoutId={person.id}
              onLayoutAnimationComplete={() => setExpandId("RSRP")}
              // ref={(el) => {
              //   zRef.current[index] = el;
              // }}
              key={person.id}
              className={`${posA[person.sibOrder - 1]} absolute flex place-content-center`}
              style={
                person.id === activeId
                  ? {
                      zIndex: 40,
                      width: "42vw",
                      height: "42vw",
                      top: "50vh",
                      left: "50vw",
                    }
                  : {
                      zIndex: 10,
                      top: "var(--childTop)",
                      left: "var(--childLeft)",
                    }
              }
              initial={{
                opacity: 0,
                // top: "var(--childTop)",
                // left: "var(--childLeft)",
              }}
              animate={
                person.id === activeId
                  ? isDesktop
                    ? {
                        opacity: 1,
                        height: "50vh",
                        width: "50vh",
                        top: "var(--childTop)",
                        left: "var(--childLeft)",
                      }
                    : {
                        // top: "50vh",
                        // left: "50vw",
                        // height: "40vw",
                        // width: "40vw",
                        // scale: 1.2,
                        opacity: 1,
                      }
                  : {
                      opacity: 1,
                      // top: "var(--childTop)",
                      // left: "var(--childLeft)",
                    }
              }
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
                isDesktop={isDesktop}
                isActive={person.id === activeId ? true : false}
              />
            </motion.div>
          ))}
        {!loading && //rg2
          rg2?.map((person: any) => (
            <motion.div
              layoutId={person.id}
              onLayoutAnimationComplete={() => setExpandId("RSRP")}
              // ref={(el) => {
              //   zRef.current[index] = el;
              // }}
              key={person.id}
              className={`${posB[person.sibOrder - 1]} absolute flex place-content-center`}
              style={
                person.id === activeId
                  ? {
                      zIndex: 40,
                      width: "42vw",
                      height: "42vw",
                      top: "50vh",
                      left: "50vw",
                    }
                  : {
                      zIndex: 10,
                      top: "var(--childTop)",
                      left: "var(--childLeft)",
                    }
              }
              initial={{
                opacity: 0,
                // top: "var(--childTop)",
                // left: "var(--childLeft)",
              }}
              animate={
                person.id === activeId
                  ? isDesktop
                    ? {
                        opacity: 1,
                        height: "50vh",
                        width: "50vh",
                        top: "var(--childTop)",
                        left: "var(--childLeft)",
                      }
                    : {
                        // top: "50vh",
                        // left: "50vw",
                        // height: "40vw",
                        // width: "40vw",
                        opacity: 1,
                      }
                  : {
                      opacity: 1,
                      // top: "var(--childTop)",
                      // left: "var(--childLeft)",
                    }
              }
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
                isDesktop={isDesktop}
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

export default MainTree;
