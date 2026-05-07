import { useEffect, useState } from "react";
import Person from "../components/Person";
import { useNavigate, useParams } from "react-router-dom";
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
import { AnimatePresence, motion, scale } from "motion/react";
import { CircleArrowLeft } from "lucide-react";

function Tree() {
  const [children, setChildren] = useState<Record<string, any>>({});
  const [famHead, setFamHead] = useState<Record<string, any>>({});
  const [spouse, setSpouse] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  // const [headKey, setHeadKey] = useState("");

  let { head = "" } = useParams();
  const [posA, setPosA] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const headSnapshot = await getDoc(doc(db, "person", head));
        // console.log(headSnapshot.data()?.spouse);
        setFamHead({
          id: head,
          toggled: false,
          ...headSnapshot.data(),
        });
        // setHeadKey(headSnapshot.id);

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
            bufferSpouses[bufferSpouses.length - 1].tubu = doc
              .data()
              .tubu?.toDate()
              .toLocaleDateString("id-ID", { dateStyle: "medium" });
            bufferSpouses[bufferSpouses.length - 1].monding = doc
              .data()
              .monding?.toDate()
              .toLocaleDateString("id-ID", { dateStyle: "medium" });
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
          bufferChildren[bufferChildren.length - 1].tubu = doc
            .data()
            .tubu?.toDate()
            .toLocaleDateString("id-ID", { dateStyle: "medium" });
          bufferChildren[bufferChildren.length - 1].monding = doc
            .data()
            .monding?.toDate()
            .toLocaleDateString("id-ID", { dateStyle: "medium" });
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
      {/* <div className="absolute flex items-center justify-center left-50 bottom-0 bg-yellow-300 w-1 h-100" /> */}
      <motion.div //back button
        className="absolute flex items-center justify-center left-5 top-5 bg-red-500 size-15 cursor-pointer rounded-full"
        onClick={() => navigate(-1)}
        whileTap={{ scale: 0.8 }}
      >
        <CircleArrowLeft size={45} />
      </motion.div>
      {famHead && ( //head
        <motion.div
          layout
          key={head}
          className="absolute top-[50vh] left-[27vw] sm:left-50 size-38 sm:size-60 -translate-1/2"
          style={{ zIndex: famHead.toggled ? 40 : 20 }}
          animate={{}}
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ zIndex: 50 }}
          onClick={() => setFamHead({ ...famHead, toggled: !famHead.toggled })}
        >
          <Person
            person={famHead.name}
            sex={famHead.sex}
            photo={famHead.image}
            tubu={famHead.tubu?.toDate().toLocaleDateString("id-ID", {
              dateStyle: "medium",
            })}
            monding={famHead.monding
              ?.toDate()
              .toLocaleDateString("id-ID", { dateStyle: "medium" })}
          />
        </motion.div>
      )}
      {spouse && ( //spouse
        <motion.div
          key={spouse[0]?.id}
          className="absolute top-[50vh] left-[73vw] sm:right-50 size-38 sm:size-60 -translate-1/2"
          style={{ zIndex: spouse[0]?.toggled ? 40 : 20 }}
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
          }
        >
          <Person
            person={spouse[0]?.name}
            sex={spouse[0]?.sex}
            photo={spouse[0]?.image}
            tubu={spouse[0]?.tubu}
            monding={spouse[0]?.monding}
          />
        </motion.div>
      )}
      <AnimatePresence mode="popLayout">
        {!loading &&
          children?.map((person: any, i: any) => (
            <motion.div
              layout
              // ref={(el) => {
              //   zRef.current[index] = el;
              // }}
              key={person.id}
              className={`${posA[person.sibOrder - 1]} absolute`}
              style={{ zIndex: person.toggled ? 50 : 10 }}
              // initial={{ x: "50vw", y: "50vh" }}
              animate={{}}
              transition={{ duration: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ zIndex: 50 }}
              onClick={() => {
                setChildren((prev) =>
                  prev.map((c: any, idx: any) =>
                    idx === i
                      ? { ...c, toggled: !c.toggled }
                      : { ...c, toggled: false },
                  ),
                );
                // setHeadKey(person.id);
              }}
            >
              <Person
                id={person.id}
                person={person.name}
                childnum={person.sibOrder}
                sex={person.sex}
                photo={person.image}
                tubu={person.tubu}
                monding={person.monding}
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
