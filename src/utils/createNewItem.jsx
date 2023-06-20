import React from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/database";
import { v4 as uuid } from "uuid";
import addImage from "./addImage";

const createNewItem = async ({ formInfo, imageFile }) => {
  const itemRef = collection(db, "item");
  const id = uuid();
  let url = "";

  if (imageFile) {
    url = addImage(imageFile, id);
  }

  try {
    await addDoc(itemRef, {
      name: formInfo.name,
      description: formInfo.description,
      price: formInfo.price,
      discount: formInfo.discount,
      imageUrl: url,
      onSale: formInfo.onSale,
      clearance: formInfo.clearance,
      id: id,
      timeCreated: serverTimestamp(),
    });
    return true;
  } catch (error) {
    return false;
  }
};

export default createNewItem;
