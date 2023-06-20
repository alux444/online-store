import React from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/database";
import { v4 as uuid } from "uuid";

const createNewItem = async ({ formInfo }) => {
  const itemRef = collection(db, "item");

  try {
    await addDoc(itemRef, {
      name: formInfo.name,
      description: formInfo.description,
      price: formInfo.price,
      discount: formInfo.discount,
      imageUrl: formInfo.imageUrl,
      onSale: formInfo.onSale,
      clearance: formInfo.clearance,
      id: uuid(),
      timeCreated: serverTimestamp(),
    });
    return true;
  } catch (error) {
    return false;
  }
};

export default createNewItem;
