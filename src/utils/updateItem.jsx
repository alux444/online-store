import { collection, getDocs, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { query } from "firebase/database";

const updateItem = async (id, updatedFields) => {
  const itemRef = collection(db, "item");

  const itemDoc = await getDocs(query(itemRef, where("id", "==", id)));

  if (!itemDoc.empty) {
    updateDoc(itemDoc.docs[0].ref, updatedFields);
    return true;
  }

  return false;
};

export default updateItem;
