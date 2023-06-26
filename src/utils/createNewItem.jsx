import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import addImage from "./addImage";

const createNewItem = async (formInfo, imageFile, itemAdd) => {
  const itemRef = collection(db, "item");
  const id = uuid();
  const time = serverTimestamp();
  let url = "";

  if (imageFile) {
    url = await addImage(imageFile, id);
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
      stock: formInfo.stock,
      category: formInfo.category,
      id: id,
      timeCreated: time,
    });
    const newItem = {
      name: formInfo.name,
      description: formInfo.description,
      price: formInfo.price,
      discount: formInfo.discount,
      imageUrl: url,
      onSale: formInfo.onSale,
      clearance: formInfo.clearance,
      stock: formInfo.stock,
      category: formInfo.category,
      id: id,
      timeCreated: time,
    };
    itemAdd(newItem);

    return true;
  } catch (error) {
    return false;
  }
};

export default createNewItem;
