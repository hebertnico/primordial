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
  const [members, setMembers] = useState<Record<string, any>>({});
  const [famHead, setFamHead] = useState({});
  const [spouse, setSpouse] = useState([]);
  const [loading, setLoading] = useState(true);

  let { head = "" } = useParams();
  const [posA, setPosA] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const headSnapshot = await getDoc(doc(db, "person", head));
        console.log(headSnapshot.data());
        setFamHead({ id: headSnapshot.id, ...headSnapshot.data() });

        if (headSnapshot.data()?.spouse != null) {
          const spouseSnapshot = await getDocs(
            query(
              collection(db, "person"),
              where(documentId(), "in", [
                "def",
                ...headSnapshot.data()?.spouse,
              ]),
            ),
          );
          const bufferSpouses: any = [];
          spouseSnapshot.forEach((doc) => {
            bufferSpouses.push({ id: doc.id, ...doc.data() });
          });
          setSpouse(bufferSpouses);
          console.log(spouseSnapshot.docs[0]?.data());
        }

        const childSnapshot = await getDocs(
          query(
            collection(db, "person"),
            where("parentId", "==", head),
            orderBy("sibOrder", "asc"),
          ),
        );
        const bufferMembers: any = [];
        childSnapshot.forEach((doc) => {
          bufferMembers.push({ id: doc.id, ...doc.data() });
        });
        setMembers(bufferMembers);
      } catch (error) {
        console.log(error);
      }
    }
    load();
  }, [head]);

  useEffect(() => {
    console.log(members);
    if (members.length > 0) {
      setLoading(false);
      setPosA(position.children[members.length - 1]?.position);
    }
  }, [members]);

  return (
    <div className="h-screen relative mx-auto overflow-x-hidden overflow-y-hidden">
      {/* {members.G1 && (
          <Person
          key={members.G1.id}
            person={members.G1.name}
            size="lg:size-[10vw] md:size-[15vw] size-[20vw]"
            classname="top-[42vh] md:top-[35vh] left-[30%] md:left-[40%]"
            />
            )}
            {members.SG1 && (
              <Person
              key={members.SG1.id}
              person={members.SG1.name}
              size="lg:size-[10vw] md:size-[15vw] size-[20vw]"
              classname="top-[42vh] md:top-[35vh] left-[70%] md:left-[60%]"
              />
              )} */}
      <AnimatePresence mode="popLayout">
        {!loading &&
          members?.map((person: any) => (
            <motion.div
              // ref={(el) => {
              //   zRef.current[index] = el;
              // }}
              key={person.id}
              className={`${posA[person.sibOrder - 1]} absolute size-[32vw] sm:size-30 -translate-1/2`}
              style={{ zIndex: 10 }}
              // initial={{ x: "50vw", y: "50vh" }}
              animate={{}}
              transition={{ duration: 1 }}
              // onClick={() => navigate(`/tree/${person.id}`)}
              exit={{ opacity: 0 }}
              // onMouseEnter={(e) => {
              //   e.currentTarget.style.zIndex = "50";
              //   // console.log(e.currentTarget.style.zIndex);
              // }}
              // onClick={() => {
              //   handleZ(index, true);
              // }}
              // onMouseLeave={() => {
              //   handleZ(index);
              // }}
              data-toggled="false"
            >
              <Person
                id={person.id}
                person={person.name}
                childnum={person.sibOrder}
                size="lg:size-[10vw] md:size-[15vw] size-[20vw]"
                classname={`${posA[members.indexOf(person)]}`}
              />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

export default Tree;
