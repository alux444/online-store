import React from "react";
import { db } from "../../firebaseConfig";
import { collection, deleteDoc, getDocs, where } from "firebase/firestore";
import { query } from "firebase/database";

const deleteItem = async ({ itemId }) => {
  const itemRef = collection(db, "item");

  const currentItem = await getDocs(query(itemRef, where("id", "==", itemId)));

  if (!currentItem.empty) {
    const itemDbId = currentItem.docs[0].id;
    await deleteDoc(itemRef, itemDbId);
    return true;
  }

  return false;
};

export default deleteItem;
