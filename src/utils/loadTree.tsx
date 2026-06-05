import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";

export async function loadTree() {
  const snapshot = await getDocs(collection(db, "person"));

  const result: Record<string, any> = {};

  snapshot.forEach((doc) => {
    result[doc.id] = {
      id: doc.id,
      ...doc.data(),
    };
  });

  return result;
}
