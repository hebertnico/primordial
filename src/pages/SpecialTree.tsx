import { useEffect, useState } from "react";
import Person from "../components/Person";
import position from "../data/position.json" with { type: "json" };

import { AnimatePresence, motion, scale } from "motion/react";
import { useNodeStore } from "../store/nodeStore";
import { getChildren, getSpouses } from "../utils/treeHelpers";
import { useNavigate, useParams } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";

function SpecialTree({ isDesktop = false }) {
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string>("");
  const [expandId, setExpandId] = useState<string>("");
  const [secondPlace, setSecondPlace] = useState(true);

  const navigate = useNavigate();

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
      setSecondPlace(true);
      setLoading(false);
    }
    if (fam1.length == 7 && fam2.length == 2) {
      setPosA(position.children[11]?.position);
      setPosB(position.children[10]?.position);
      setSecondPlace(false);
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative m-auto overflow-x-hidden overflow-y-hidden">
      <motion.div //back button
        className="absolute flex items-center justify-center left-5 top-5 bg-my-cream size-15 cursor-pointer rounded-full shadow-2xl/80 z-50"
        onClick={() => {
          setActiveId("");
          navigate(-1);
        }}
        whileTap={{ scale: 0.8 }}
      >
        <CircleArrowLeft size={45} color="var(--color-my-black)" />
      </motion.div>
      <AnimatePresence mode="sync">
        {famHead && ( //head
          <motion.div
            layoutId={head}
            key={famHead.id}
            onLayoutAnimationComplete={() => setExpandId(head)}
            className={`absolute flex place-content-center left-[50vw] sm:top-[50vh] w-47 h-32 sm:w-40 sm:h-40 -translate-1/2 ${secondPlace ? "top-[34vh] sm:left-[40vw]" : "top-[61vh] sm:left-[60vw]"}`}
            style={{
              zIndex: famHead.id === activeId ? 40 : 20,
            }}
            initial={{ opacity: 0 }}
            animate={
              famHead.id === activeId
                ? isDesktop
                  ? {
                      opacity: 1,
                      height: "50vh",
                      width: "50vh",
                    }
                  : {
                      top: "50vh",
                      left: "50vw",
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
              expanded={expandId}
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
              key={spouse[0]?.id}
              className={`absolute flex place-content-center left-[50vw] sm:top-[50vh] size-38 -translate-1/2 ${secondPlace ? "top-[20vh]  sm:left-[24vw]" : "top-[48vh] sm:left-[44vw]"}`}
              style={{
                zIndex: spouse[0].id === activeId ? 40 : 10,
              }}
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
                        top: "50vh",
                        left: "50vw",
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
              className={`absolute flex place-content-center left-[50vw] sm:top-[50vh] size-38 -translate-1/2 ${secondPlace ? "top-[46vh] sm:left-[55vw] " : "top-[74vh] sm:left-[75vw]"}`}
              style={{
                zIndex: spouse[1].id === activeId ? 40 : 10,
              }}
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
                        top: "50vh",
                        left: "50vw",
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
        <div
          className={`absolute sm:top-0 ${secondPlace ? "top-[8vh]" : "top-[8vh]"}`}
          key="fam1group"
        >
          {!loading && //fam1
            fam1?.map((person: any) => (
              <motion.div
                layoutId={person.id}
                onLayoutAnimationComplete={() => setExpandId(head)}
                // ref={(el) => {
                //   zRef.current[index] = el;
                // }}
                key={person.id}
                className={`${posA[person.sibOrder - 1]} absolute flex place-content-center`}
                style={{ zIndex: person.id === activeId ? 40 : 10 }}
                initial={{ opacity: 0 }}
                animate={
                  person.id === activeId
                    ? isDesktop
                      ? {
                          opacity: 1,
                          height: "50vh",
                          width: "50vh",
                        }
                      : {
                          top: "40vh",
                          left: "50vw",
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
        </div>
        <div
          className={`absolute sm:top-0 ${secondPlace ? "top-[62vh] sm:left-[60vw]" : "top-[85vh] sm:left-[80vw]"}`}
          key="fam2group"
        >
          {!loading && //fam2
            fam2?.map((person: any) => (
              <motion.div
                layoutId={person.id}
                onLayoutAnimationComplete={() => setExpandId(head)}
                // ref={(el) => {
                //   zRef.current[index] = el;
                // }}
                key={person.id}
                className={`${posB[person.sibOrder - 1]} absolute flex place-content-center`}
                style={{ zIndex: person.id === activeId ? 40 : 10 }}
                initial={{ opacity: 0 }}
                animate={
                  person.id === activeId
                    ? isDesktop
                      ? {
                          opacity: 1,
                          height: "50vh",
                          width: "50vh",
                        }
                      : {
                          top: secondPlace ? "-10vh" : "-40vh",
                          left: "50vw",
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
        </div>
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
