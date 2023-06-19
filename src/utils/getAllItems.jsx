import React from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

const getAllItems = async () => {
  const data = [];
  const itemRef = collection(db, "item");

  const itemDocs = await getDocs(query(itemRef));

  itemDocs.docs.map((item) => {
    data.push(item.data());
  });

  return data;
};

export default getAllItems;
