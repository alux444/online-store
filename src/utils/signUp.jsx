import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const signUp = async (form) => {
  const userRef = collection(db, "user");

  try {
    await addDoc(userRef, form);
    return true;
  } catch (error) {
    return false;
  }
};
