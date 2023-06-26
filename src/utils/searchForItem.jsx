import { query } from "firebase/database";
import { db } from "../../firebaseConfig";
import { collection, getDocs, where } from "firebase/firestore";

export const searchForItem = async (name) => {
  const itemRef = collection(db, "item");

  const itemDoc = await getDocs(query(itemRef, where("name", "==", name)));

  if (!itemDoc.empty) {
    return itemDoc.docs[0].data();
  }

  return true;
};
