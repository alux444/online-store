import { collection, getDocs, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { query } from "firebase/database";

export const checkExisting = async (email) => {
  const userRef = collection(db, "user");

  const userDocs = await getDocs(query(userRef, where("email", "==", email)));

  if (!userDocs.empty) {
    return true;
  }

  return false;
};
