import { collection, getDocs, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { query } from "firebase/database";

export const validateName = async (name) => {
  const itemRef = collection(db, "item");

  const itemDoc = await getDocs(query(itemRef, where("name", "==", name)));

  if (!itemDoc.empty) {
    return false;
  }

  return true;
};
