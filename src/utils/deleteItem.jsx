import { db } from "../../firebaseConfig";
import {
  collection,
  deleteDoc,
  getDocs,
  where,
  doc,
  query,
} from "firebase/firestore";

const deleteItem = async (itemId) => {
  console.log(itemId);
  const itemRef = collection(db, "item");

  const currentItem = await getDocs(query(itemRef, where("id", "==", itemId)));

  console.log(currentItem.docs[0].id);

  if (!currentItem.empty) {
    const itemDbId = currentItem.docs[0].id;
    await deleteDoc(doc(itemRef, itemDbId));
    return true;
  }

  return false;
};

export default deleteItem;
