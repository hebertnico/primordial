import { useEffect, useState } from "react";
import Person from "./Person";
import { useParams } from "react-router-dom";
import position from "../data/position.json" with { type: "json" };
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { AnimatePresence, motion } from "motion/react";

function Tree() {
  const [children, setChildren] = useState<Record<string, any>>({});
  const [famHead, setFamHead] = useState<Record<string, any>>({});
  const [spouse, setSpouse] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  let { head = "" } = useParams();
  const [posA, setPosA] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const headSnapshot = await getDoc(doc(db, "person", head));
        // console.log(headSnapshot.data()?.spouse);
        setFamHead({
          id: headSnapshot.id,
          toggled: false,
          ...headSnapshot.data(),
        });

        if (headSnapshot.data()?.spouse != null) {
          // console.log(["def"].push(headSnapshot.data()?.spouse));
          const spouseSnapshot = await getDocs(
            query(
              collection(db, "person"),
              where(documentId(), "in", headSnapshot.data()?.spouse),
            ),
          );
          const bufferSpouses: any = [];
          spouseSnapshot.forEach((doc) => {
            // console.log(doc.data());
            bufferSpouses.push({ id: doc.id, toggled: false, ...doc.data() });
          });
          setSpouse(bufferSpouses);
          // console.log(spouseSnapshot.docs[0]?.data());
        }

        const childSnapshot = await getDocs(
          query(
            collection(db, "person"),
            where("parentId", "==", head),
            orderBy("sibOrder", "asc"),
          ),
        );
        const bufferChildren: any = [];
        childSnapshot.forEach((doc) => {
          bufferChildren.push({ id: doc.id, toggled: false, ...doc.data() });
        });
        setChildren(bufferChildren);
      } catch (error) {
        console.log(error);
      }
    }
    load();
  }, [head]);

  useEffect(() => {
    // console.log(children);
    if (children.length > 0) {
      setLoading(false);
      setPosA(position.children[children.length - 1]?.position);
    }
  }, [children]);

  return (
    <div className="h-screen relative mx-auto overflow-x-hidden overflow-y-hidden">
      {/* <AnimatePresence mode="popLayout"> */}
      {famHead && (
        <motion.div
          className="famhead absolute top-[50vh] left-[27vw] sm:left-[37vw] size-[40vw] sm:size-[20vw] -translate-1/2"
          style={{ zIndex: famHead.toggled ? 60 : 20 }}
          animate={{}}
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ zIndex: 50 }}
          onClick={() => setFamHead({ ...famHead, toggled: !famHead.toggled })}>
          <Person key={famHead.id} person={famHead.name} sex={famHead.sex} />
        </motion.div>
      )}
      {spouse && (
        <motion.div
          className="absolute top-[50vh] sm:left-[63vw] left-[73vw] size-[40vw] sm:size-[20vw] -translate-1/2"
          style={{ zIndex: spouse[0]?.toggled ? 60 : 20 }}
          animate={{}}
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ zIndex: 50 }}
          onClick={() =>
            setSpouse((prev) =>
              prev.map((s: any, i: any) =>
                i === 0 ? { ...s, toggled: !s.toggled } : s,
              ),
            )
          }>
          <Person
            key={spouse[0]?.id}
            person={spouse[0]?.name}
            sex={spouse[0]?.sex}
          />
        </motion.div>
      )}
      <AnimatePresence mode="popLayout">
        {!loading &&
          children?.map((person: any, i: any) => (
            <motion.div
              // ref={(el) => {
              //   zRef.current[index] = el;
              // }}
              key={person.id}
              className={`${posA[person.sibOrder - 1]} absolute -translate-1/2`}
              style={{ zIndex: person.toggled ? 50 : 10 }}
              // initial={{ x: "50vw", y: "50vh" }}
              animate={{}}
              transition={{ duration: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ zIndex: 50 }}
              onClick={() =>
                setChildren((prev) =>
                  prev.map((c: any, idx: any) =>
                    idx === i ? { ...c, toggled: !c.toggled } : c,
                  ),
                )
              }>
              <Person
                id={person.id}
                person={person.name}
                childnum={person.sibOrder}
                sex={person.sex}
                hasFam={person.spouse ? true : false}
              />
            </motion.div>
          ))}
      </AnimatePresence>
      {/* </AnimatePresence> */}
    </div>
  );
}

export default Tree;
