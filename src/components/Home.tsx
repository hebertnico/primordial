import Person from "./Person";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingElement from "./Floating Element";
import Attempt from "./Attempt";

function Home() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("xx");

  useEffect(() => {
    async function load() {
      const snapshot = await getDocs(collection(db, "person"));
      // snapshot.forEach((doc) => {
      //   console.log(doc.data());
      // });
      setPhoto(snapshot.docs[0]?.data().image || "");
      setName(snapshot.docs[0]?.data().name || "xx");
    }
    load();
  }, []);

  return (
    <>
      <div className="h-screen relative mx-auto overflow-x-hidden overflow-y-hidden">
        <Person
          person={name}
          classname="left-[50%] top-[50%]"
          photo={photo}
          onClick={() => navigate("/form")}
        />
        <Person
          person="lpg1"
          classname="left-[50%] top-[20%]"
          photo={photo}
          onClick={() => navigate("/LPg1")}
        />
        <div
          className="absolute left-[15%] top-10 bg-blue-500 size-24 cursor-pointer"
          onClick={() => navigate("/LPg1")}
        />
        <Attempt />
      </div>
    </>
  );
}

export default Home;
