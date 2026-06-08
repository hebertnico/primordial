import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";

export async function loadTree() {
  console.log("Fetching tree from db ...");
  const snapshot = await getDocs(collection(db, "person"));

  const result: Record<string, any> = {};

  snapshot.forEach((doc) => {
    result[doc.id] = {
      id: doc.id,
      ...doc.data(),
      tubu:
        doc.data().tubu &&
        new Date(doc.data().tubu.seconds * 1000).toISOString(),
      monding:
        doc.data().monding &&
        new Date(doc.data().monding.seconds * 1000).toISOString(),
    };
  });

  return result;
}
