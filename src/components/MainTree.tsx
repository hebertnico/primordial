import { useEffect, useState } from "react";
import Person from "./Person";
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

function MainTree() {
  const [rg1, setRG1] = useState<Record<string, any>>({});
  const [rg2, setRG2] = useState<Record<string, any>>({});
  const [famHead, setFamHead] = useState<Record<string, any>>({});
  const [spouse, setSpouse] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  // const [headKey, setHeadKey] = useState("");

  // let { head = "" } = useParams();
  const [posA, setPosA] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const headSnapshot = await getDoc(doc(db, "person", "RSRP"));
        // console.log(headSnapshot.data());
        setFamHead({
          id: "RSRP",
          toggled: false,
          ...headSnapshot.data(),
        });
        // setHeadKey(headSnapshot.id);

        // if (headSnapshot.data()?.spouse != null) {
        // console.log(["def"].push(headSnapshot.data()?.spouse));
        const spouseSnapshot = await getDocs(
          query(
            collection(db, "person"),
            where(documentId(), "in", ["SSs", "SNs"]),
          ),
        );
        const bufferSpouses: any = [];
        spouseSnapshot.forEach((doc) => {
          // console.log(doc.data());
          bufferSpouses.push({ id: doc.id, toggled: false, ...doc.data() });
        });
        setSpouse(bufferSpouses);
        // console.log(spouseSnapshot.docs[0]?.data());
        // }

        const childSnapshot1 = await getDocs(
          query(
            collection(db, "person"),
            where("parentId", "==", "SSs"),
            orderBy("sibOrder", "asc"),
          ),
        );
        const bufferChildren: any = [];
        childSnapshot1.forEach((doc) => {
          bufferChildren.push({ id: doc.id, toggled: false, ...doc.data() });
        });
        setRG1(bufferChildren);

        const childSnapshot2 = await getDocs(
          query(
            collection(db, "person"),
            where("parentId", "==", "SNs"),
            orderBy("sibOrder", "asc"),
          ),
        );
        const bufferChildren2: any = [];

        childSnapshot2.forEach((doc) => {
          bufferChildren2.push({ id: doc.id, toggled: false, ...doc.data() });
        });
        setRG2(bufferChildren2);
      } catch (error) {
        console.log(error);
      }
    }
    load();
  }, []);

  useEffect(() => {
    console.log(famHead, spouse, rg1, rg2);
    if (rg1.length > 0) {
      setLoading(false);
      setPosA(position.children[rg1.length - 1]?.position);
    }
  }, [rg2]);

  return (
    <div className="h-screen relative mx-auto overflow-x-hidden overflow-y-hidden">
      {/* <AnimatePresence mode="popLayout"> */}
      {/* <div className="absolute flex items-center justify-center left-50 bottom-0 bg-yellow-300 w-1 h-100" /> */}
      {/* <motion.div //back button
        className="absolute flex items-center justify-center left-5 top-5 bg-red-500 size-15 cursor-pointer rounded-full"
        onClick={() => navigate(-1)}
        whileTap={{ scale: 0.8 }}
      >
        <CircleArrowLeft size={45} />
      </motion.div> */}
      {famHead && ( //head
        <motion.div
          layout
          // key={headKey}
          className="absolute top-[50vh] left-[50vw] max-w-100 sm:left-50 sm:size-60 -translate-1/2"
          style={
            famHead.toggled
              ? { zIndex: 50, width: "40vw", height: "40vw" }
              : { zIndex: 20, width: "40vw", height: "30vw" }
          }
          animate={{}}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
          whileHover={{ zIndex: 50 }}
          onClick={() => setFamHead({ ...famHead, toggled: !famHead.toggled })}
        >
          <Person key={famHead.id} person={famHead.name} sex={famHead.sex} />
        </motion.div>
      )}
      {spouse && ( //spouse
        <motion.div
          className="absolute top-[37vh] left-[50vw] sm:right-50 size-32 sm:size-60 -translate-1/2"
          style={{ zIndex: spouse[1]?.toggled ? 50 : 10 }}
          animate={{}}
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ zIndex: 50 }}
          onClick={() =>
            setSpouse((prev) =>
              prev.map((s: any, i: any) =>
                i === 1 ? { ...s, toggled: !s.toggled } : s,
              ),
            )
          }
        >
          <Person
            key={spouse[1]?.id}
            person={spouse[1]?.name}
            sex={spouse[1]?.sex}
          />
        </motion.div>
      )}
      <AnimatePresence mode="popLayout">
        {!loading &&
          rg1?.map((person: any, i: any) => (
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
                setRG1((prev) =>
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
                hasFam={person.spouse ? true : false}
              />
            </motion.div>
          ))}
      </AnimatePresence>
      {/* </AnimatePresence> */}
    </div>
  );
}

export default MainTree;
