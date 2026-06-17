import { useEffect, useState } from "react";
import Person from "../components/Person";
import position from "../data/position.json" with { type: "json" };

import { AnimatePresence, motion, scale } from "motion/react";
import { useNodeStore } from "../store/nodeStore";
import { getChildren, getSpouses } from "../utils/treeHelpers";
import { useNavigate, useParams } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";

function SpecialTree() {
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
            key={famHead.id}
            onLayoutAnimationComplete={() => setExpandId(head)}
            className="absolute left-[50vw] w-47 h-32 sm:top-[46vh] sm:w-40 sm:h-40 -translate-1/2"
            style={{
              zIndex: famHead.id === activeId ? 40 : 20,
              top: secondPlace ? "33vh" : "61vh",
            }}
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
              isActive={famHead.id === activeId ? true : false}
            />
          </motion.div>
        )}
        {spouse && ( //spouse
          <div>
            <motion.div
              key={spouse[0]?.id}
              className="absolute left-[50vw] sm:top-[46vh] sm:left-[27vw] size-38 -translate-1/2"
              style={{
                zIndex: spouse[0].id === activeId ? 40 : 10,
                top: secondPlace ? "20vh" : "48vh",
              }}
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
              className="absolute left-[50vw] size-38 sm:left-[73vw] -translate-1/2"
              style={{
                zIndex: spouse[1].id === activeId ? 40 : 10,
                top: secondPlace ? "46vh" : "74vh",
              }}
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
        <div
          className="absolute"
          style={{
            top: secondPlace ? "8vh" : "8vh",
          }}
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
        </div>
        <div
          className="absolute"
          style={{
            top: secondPlace ? "62vh" : "85vh",
          }}
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
