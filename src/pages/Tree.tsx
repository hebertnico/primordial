import { useEffect, useState } from "react";
import Person from "../components/Person";
import { useNavigate, useParams } from "react-router-dom";
import position from "../data/position.json" with { type: "json" };
import { AnimatePresence, motion, scale } from "motion/react";
import { CircleArrowLeft } from "lucide-react";
import { useNodeStore } from "../store/nodeStore";
import { getChildren, getNode, getSpouses } from "../utils/treeHelpers";

function Tree() {
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string>("");
  const [expandId, setExpandId] = useState<string>("");

  let { head = "" } = useParams();
  const [posA, setPosA] = useState<string[]>([]);

  const navigate = useNavigate();

  const nodes = useNodeStore((s) => s.nodes);
  const childrenMap = useNodeStore((s) => s.childrenMap);

  const famHead = nodes[head];
  const spouse = getSpouses(nodes, head);
  const children = getChildren(nodes, childrenMap, head);

  useEffect(() => {
    if (children.length > 0) {
      setPosA(position.children[children.length - 1]?.position);
      setLoading(false);
    }
    setActiveId("");
  }, [head]);

  return (
    <div className="min-h-screen relative mx-auto overflow-x-hidden overflow-y-hidden">
      {/* <div className="absolute flex items-center justify-center left-50 bottom-0 bg-yellow-300 w-1 h-100" /> */}
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
            onLayoutAnimationComplete={() => setExpandId(head)}
            key={famHead.id}
            className="absolute top-[50vh] left-[27vw] sm:left-[40vw] sm:top-[46vh] size-38 sm:size-40 -translate-1/2"
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
          <motion.div
            key={spouse[0]?.id}
            className="absolute top-[50vh] left-[73vw] sm:left-[60vw] sm:top-[46vh] size-38 sm:size-40 -translate-1/2"
            style={{ zIndex: spouse[0].id === activeId ? 40 : 20 }}
            initial={{ opacity: 0 }}
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
        )}
        {/* <AnimatePresence mode="sync"> */}
        {!loading &&
          children?.map((person: any) => (
            <motion.div
              layoutId={person.id}
              onLayoutAnimationComplete={() => setExpandId(head)}
              // ref={(el) => {
              //   zRef.current[index] = el;
              // }}
              key={person.id}
              className={`${posA[person.sibOrder - 1]} absolute`}
              style={{ zIndex: person.id === activeId ? 40 : 10 }}
              // initial={{ x: "50vw", y: "50vh" }}
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
                niain={person.niain ?? false}
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
                hasFam={person.spouse ? true : false}
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

export default Tree;
