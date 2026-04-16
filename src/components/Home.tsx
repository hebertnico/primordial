import Person from "./Person";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    async function load() {
      const snapshot = await getDocs(collection(db, "person"));
      snapshot.forEach((doc) => {
        console.log(doc.data());
      });
      setPhoto(snapshot.docs[0]?.data().photo || "");
    }
    load();
  }, []);

  return (
    <>
      <div className="h-screen relative mx-auto overflow-x-hidden overflow-y-hidden">
        <Person
          person="xx"
          classname="left-[50%] top-[50%]"
          photo={photo}
          onClick={() => navigate("/upload")}
        />
      </div>
    </>
  );
}

export default Home;
